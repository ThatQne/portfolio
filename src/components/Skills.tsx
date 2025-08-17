import React, { useEffect, useRef } from 'react';
import * as SimpleIcons from 'react-icons/si';
import * as LucideIcons from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { getBrandColor } from '../config/theme';

interface SkillCapsuleProps {
  name: string;
  icon: string;
  pack?: string;
}

const SkillCapsule: React.FC<SkillCapsuleProps> = ({ name, icon, pack = 'lucide' }) => {
  // Get the icon component from the appropriate icon pack
  let IconComponent;

  if (pack === 'si') {
    IconComponent = (SimpleIcons as any)[icon] || LucideIcons.Code;
  } else {
    IconComponent = (LucideIcons as any)[icon] || LucideIcons.Code;
  }

  // Get the brand color for this technology
  const brandColor = getBrandColor(name);

  return (
    <div className="flex-shrink-0 flex items-center space-x-2 bg-theme-card border border-theme-primary rounded-full px-4 py-2 mx-2 hover:bg-theme-card-hover hover:border-theme-accent transition-all duration-300 hover:scale-105 backdrop-blur-sm skill-capsule">
      <IconComponent 
        size={16} 
        style={{ color: brandColor }}
        className="transition-colors duration-300"
      />
      <span className="text-sm font-medium text-theme-primary whitespace-nowrap">{name}</span>
    </div>
  );
};

interface ConveyorBeltProps {
  skills: SkillCapsuleProps[];
  direction: 'left' | 'right';
  speed?: number;
}

const ConveyorBelt: React.FC<ConveyorBeltProps> = ({ skills, direction, speed = 30 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationId = useRef<number>();
  const translateX = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTranslate = useRef(0);
  const isHovered = useRef(false);
  const lastTime = useRef(0);
  const singleSetWidth = useRef<number>(0);
  const isInitialized = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Initialize at the middle set for seamless scrolling in both directions
    const initializePosition = () => {
      // Force reflow and calculate width
      content.offsetHeight;
      singleSetWidth.current = content.scrollWidth / 5;

      if (singleSetWidth.current > 0) {
        // For left-moving belts, start at 0 to ensure right side is filled
        // For right-moving belts, start at -singleSetWidth to ensure left side is filled
        translateX.current = direction === 'left' ? 0 : -singleSetWidth.current;
        content.style.transform = `translateX(${translateX.current}px)`;
        isInitialized.current = true;
      }
    };

    // Use ResizeObserver to ensure we catch when content is ready
    const resizeObserver = new ResizeObserver(() => {
      if (!isInitialized.current) {
        initializePosition();
      }
    });

    resizeObserver.observe(content);

    // Also try with timeout as fallback
    setTimeout(initializePosition, 100);

    const animate = (currentTime: number) => {
      if (!content || !isInitialized.current) {
        animationId.current = requestAnimationFrame(animate);
        return;
      }

      if (!isDragging.current && !isHovered.current) {
        const deltaTime = currentTime - lastTime.current;
        const moveDistance = (speed * deltaTime) / 1000;

        if (direction === 'left') {
          translateX.current -= moveDistance;
          // When we've scrolled one full set width to the left, reset to start
          if (translateX.current <= -singleSetWidth.current) {
            translateX.current = 0;
          }
        } else {
          translateX.current += moveDistance;
          // When we've scrolled one full set width to the right, reset to start
          if (translateX.current >= 0) {
            translateX.current = -singleSetWidth.current;
          }
        }

        content.style.transform = `translateX(${translateX.current}px)`;
      }

      lastTime.current = currentTime;
      animationId.current = requestAnimationFrame(animate);
    };

    // Start animation
    lastTime.current = performance.now();
    animationId.current = requestAnimationFrame(animate);

    // Hover handlers
    const handleMouseEnter = () => {
      isHovered.current = true;
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, [direction, speed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartTranslate.current = translateX.current;
    container.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !isInitialized.current) return;

    const content = contentRef.current;
    if (!content) return;

    e.preventDefault();
    const deltaX = e.clientX - dragStartX.current;
    const newTranslateX = dragStartTranslate.current + deltaX;

    // Handle infinite scroll boundaries - match the animation logic
    if (newTranslateX > 0) {
      // Dragged too far right, wrap to the left boundary
      translateX.current = newTranslateX - singleSetWidth.current;
      dragStartTranslate.current = translateX.current;
      dragStartX.current = e.clientX;
    } else if (newTranslateX < -singleSetWidth.current) {
      // Dragged too far left, wrap to the right boundary  
      translateX.current = newTranslateX + singleSetWidth.current;
      dragStartTranslate.current = translateX.current;
      dragStartX.current = e.clientX;
    } else {
      translateX.current = newTranslateX;
    }

    content.style.transform = `translateX(${translateX.current}px)`;
  };

  const handleMouseUp = () => {
    const container = containerRef.current;
    if (!container) return;

    isDragging.current = false;
    container.style.cursor = 'grab';
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      handleMouseUp();
    }
  };

  // Five-fold skills for truly seamless infinite scroll
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills, ...skills];

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient overlays for smooth edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, var(--bg-primary) 0%, var(--bg-primary) 30%, transparent 100%)'
        }}
      ></div>
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, var(--bg-primary) 0%, var(--bg-primary) 30%, transparent 100%)'
        }}
      ></div>

      <div
        ref={contentRef}
        className="flex py-4 will-change-transform"
        style={{ transform: `translateX(0px)` }}
      >
        {duplicatedSkills.map((skill, index) => (
          <SkillCapsule
            key={`${skill.name}-${index}`}
            name={skill.name}
            icon={skill.icon}
            pack={skill.pack}
          />
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-20 bg-theme-primary overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-theme-accent mx-auto mb-6"></div>
          <p className="text-lg text-theme-secondary max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="space-y-8">
          {skills.map((skillBelt, index) => (
            <div key={skillBelt.name} className="relative">
              {/* Optional: Add belt label */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-theme-accent opacity-75">
                  {skillBelt.name}
                </h3>
              </div>

              <ConveyorBelt
                key={`${skillBelt.name}-${index}`}
                skills={skillBelt.items}
                direction={index % 2 === 0 ? 'left' : 'right'} // Alternating directions
                speed={skillBelt.speed || 20} // Use speed from portfolio data, fallback to 20
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;