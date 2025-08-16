import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const { Engine, World, Bodies } = Matter;

export const usePhysics = (elementRef: React.RefObject<HTMLElement | null>) => {
  const engineRef = useRef<Matter.Engine | null>(null);
  // no render canvas; physics-only
  const logoBodyRef = useRef<Matter.Body | null>(null);
  const [isPhysicsActive, setIsPhysicsActive] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>();
  const originalStyleRef = useRef<Partial<CSSStyleDeclaration>>({});

  useEffect(() => {
    if (!elementRef.current || !isPhysicsActive) return;

    const element = elementRef.current;
    let rafId: number | null = null;

    // Save original inline styles to restore later
    originalStyleRef.current = {
      position: element.style.position,
      left: element.style.left,
      top: element.style.top,
      transform: element.style.transform,
      zIndex: element.style.zIndex,
      pointerEvents: element.style.pointerEvents,
      cursor: element.style.cursor,
    };

    // Setup Matter.js
    const engine = Engine.create({ gravity: { x: 0, y: 1, scale: 0.001 } });
    // Ensure bodies don't sleep unexpectedly while interacting
    // @ts-ignore - property exists at runtime
    engine.enableSleeping = false;
    // Increase solver iterations to reduce tunneling at high speed
    engine.positionIterations = 10;
    engine.velocityIterations = 8;
    engine.constraintIterations = 4;

    const rect = element.getBoundingClientRect();

    // Create bounds of the screen
    const bounds = { width: window.innerWidth, height: window.innerHeight };

    // Create invisible walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    let walls = [
      Bodies.rectangle(bounds.width / 2, -200, bounds.width * 2, 400, wallOptions),
      Bodies.rectangle(bounds.width / 2, bounds.height + 200, bounds.width * 2, 400, wallOptions),
      Bodies.rectangle(-200, bounds.height / 2, 400, bounds.height * 2, wallOptions),
      Bodies.rectangle(bounds.width + 200, bounds.height / 2, 400, bounds.height * 2, wallOptions),
    ];

    // Create logo body at current element position and size
    const logoBody = Bodies.rectangle(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      rect.width,
      rect.height,
      {
        restitution: 0.6,
        friction: 0.06,
        frictionAir: 0.02,
        render: { fillStyle: 'transparent', strokeStyle: 'transparent' },
      }
    );

    // Add to world
    World.add(engine.world, [...walls, logoBody]);

    // Position the original element above the canvas and let it follow the body
    element.style.position = 'fixed';
    element.style.zIndex = '1001';
    element.style.pointerEvents = 'auto';
    element.style.transform = 'translate(-50%, -50%)';
    element.style.cursor = 'grab';
    // Set initial screen position to match body to avoid first-frame jump
    element.style.left = `${logoBody.position.x}px`;
    element.style.top = `${logoBody.position.y}px`;

    engineRef.current = engine;
    logoBodyRef.current = logoBody;
    
    // drive the engine manually
    const fixedStepMs = 1000 / 120; // 120 Hz substeps to reduce tunneling
    let accumulator = 0;
    let last = performance.now();

    const syncPosition = () => {
      const now = performance.now();
      accumulator += now - last;
      last = now;
      while (accumulator >= fixedStepMs) {
        Engine.update(engine, fixedStepMs);
        accumulator -= fixedStepMs;
      }
      if (!logoBodyRef.current) return;
      const body = logoBodyRef.current;
      // Safety clamp to keep the body within the viewport if an update overshoots
      const w = window.innerWidth;
      const h = window.innerHeight;
      const b = body.bounds;
      let vx = body.velocity.x;
      let vy = body.velocity.y;
      let px = body.position.x;
      let py = body.position.y;
      const bounce = 0.8;
      if (b.min.x < 0) {
        const dx = 0 - b.min.x;
        px += dx;
        vx = Math.abs(vx) * bounce;
      } else if (b.max.x > w) {
        const dx = w - b.max.x;
        px += dx;
        vx = -Math.abs(vx) * bounce;
      }
      if (b.min.y < 0) {
        const dy = 0 - b.min.y;
        py += dy;
        vy = Math.abs(vy) * bounce;
      } else if (b.max.y > h) {
        const dy = h - b.max.y;
        py += dy;
        vy = -Math.abs(vy) * bounce;
      }
      if (px !== body.position.x || py !== body.position.y) {
        Matter.Body.setPosition(body, { x: px, y: py });
        Matter.Body.setVelocity(body, { x: vx, y: vy });
      }
      element.style.left = `${body.position.x}px`;
      element.style.top = `${body.position.y}px`;
      element.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      rafId = requestAnimationFrame(syncPosition);
    };
    syncPosition();

    // Handle window resize: resize canvas and rebuild walls
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Recreate walls to match new window bounds
      World.remove(engine.world, walls);
      walls = [
        Bodies.rectangle(w / 2, -200, w * 2, 400, wallOptions),
        Bodies.rectangle(w / 2, h + 200, w * 2, 400, wallOptions),
        Bodies.rectangle(-200, h / 2, 400, h * 2, wallOptions),
        Bodies.rectangle(w + 200, h / 2, 400, h * 2, wallOptions),
      ];
      World.add(engine.world, walls);
    };
    window.addEventListener('resize', handleResize);

    // Pointer-driven dragging/throwing to avoid intercepting page scroll
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let vx = 0;
    let vy = 0;
    let avgVx: number[] = [];
    let avgVy: number[] = [];
    let dragDistance = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = performance.now();
      element.style.cursor = 'grabbing';
      if (logoBodyRef.current) {
        Matter.Body.setStatic(logoBodyRef.current, true);
        Matter.Sleeping.set(logoBodyRef.current, false);
      }
      avgVx = [];
      avgVy = [];
      dragDistance = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !logoBodyRef.current) return;
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
      dragDistance += Math.hypot(dx, dy);
      // velocity in px/s (guard dt, larger min to reduce sensitivity)
      const safeDt = Math.max(20, Math.min(80, dt));
      const instVx = (dx / safeDt) * 1000;
      const instVy = (dy / safeDt) * 1000;
      avgVx.push(instVx);
      avgVy.push(instVy);
      if (avgVx.length > 8) avgVx.shift();
      if (avgVy.length > 8) avgVy.shift();
      vx = avgVx.reduce((a, b) => a + b, 0) / avgVx.length;
      vy = avgVy.reduce((a, b) => a + b, 0) / avgVy.length;
      Matter.Body.setPosition(logoBodyRef.current, { x: e.clientX, y: e.clientY });
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!logoBodyRef.current || !isDragging) return;
      isDragging = false;
      element.style.cursor = 'grab';
      Matter.Body.setStatic(logoBodyRef.current, false);
      Matter.Sleeping.set(logoBodyRef.current, false);
      // If it was basically a click, do not throw
      const minThrowDistance = 20; // px
      if (dragDistance < minThrowDistance) {
        Matter.Body.setVelocity(logoBodyRef.current, { x: 0, y: 0 });
        return;
      }
      // Clamp and scale throw speed to feel natural, not excessive
      const maxSpeed = 900; // px/s
      const throwScale = 0.12; // scale down perceived speed significantly
      const speed = Math.hypot(vx, vy);
      const clampScale = speed > maxSpeed ? maxSpeed / speed : 1;
      Matter.Body.setVelocity(logoBodyRef.current, { x: vx * throwScale * clampScale, y: vy * throwScale * clampScale });
    };

    element.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('resize', handleResize);
      element.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (rafId) cancelAnimationFrame(rafId);

      // Restore original element inline styles
      const original = originalStyleRef.current;
      element.style.position = original.position ?? '';
      element.style.left = original.left ?? '';
      element.style.top = original.top ?? '';
      element.style.transform = original.transform ?? '';
      element.style.zIndex = original.zIndex ?? '';
      element.style.pointerEvents = original.pointerEvents ?? '';
      element.style.cursor = original.cursor ?? '';

      // Teardown Matter.js
      if (engine) {
        World.clear(engine.world, false);
        Engine.clear(engine);
      }
      engineRef.current = null;
      logoBodyRef.current = null;
    };
  }, [isPhysicsActive, elementRef]);

  const handleLogoClick = () => {
    // Reset previous timer
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    clickCountRef.current++;

    // Reset after short window
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 500);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      setIsPhysicsActive((prev: boolean) => !prev);
    }
  };

  return { handleLogoClick, isPhysicsActive };
};

export default usePhysics;
