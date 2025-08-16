import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Point {
    x: number;
    y: number;
    scrollX: number;
    scrollY: number;
    timestamp: number;
}

interface MouseState {
    x: number;
    y: number;
    prevX: number;
    prevY: number;
    velocityX: number;
    velocityY: number;
    angle: number;
    smoothAngle: number;
}

interface EyeState {
    leftRotation: number;
    rightRotation: number;
    leftAngularVelocity: number;
    rightAngularVelocity: number;
}

const CursorTrail: React.FC = () => {
    const { theme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointsRef = useRef<Point[]>([]);
    const animationRef = useRef<number>();
    const mouseStateRef = useRef<MouseState>({ x: 0, y: 0, prevX: 0, prevY: 0, velocityX: 0, velocityY: 0, angle: 0, smoothAngle: 0 });
    const eyeStateRef = useRef<EyeState>({ leftRotation: 0, rightRotation: 0, leftAngularVelocity: 0, rightAngularVelocity: 0 });

    // Randomize eye properties once on mount for unique behavior each session
    const eyePropertiesRef = useRef({
        leftSensitivity: 0.85 + Math.random() * 0.3, // 0.85 to 1.15
        rightSensitivity: 0.85 + Math.random() * 0.3, // 0.85 to 1.15
        leftGravityMultiplier: 0.95 + Math.random() * 0.1, // 0.95 to 1.05
        rightGravityMultiplier: 0.95 + Math.random() * 0.1, // 0.95 to 1.05
        leftDampingMultiplier: 0.995 + Math.random() * 0.01, // 0.995 to 1.005
        rightDampingMultiplier: 0.995 + Math.random() * 0.01, // 0.995 to 1.005
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            const mouseState = mouseStateRef.current;

            // Update mouse state for velocity and angle calculation
            mouseState.prevX = mouseState.x;
            mouseState.prevY = mouseState.y;
            mouseState.x = e.clientX;
            mouseState.y = e.clientY;

            mouseState.velocityX = mouseState.x - mouseState.prevX;
            mouseState.velocityY = mouseState.y - mouseState.prevY;

            // Calculate movement angle for eye orientation with heavy smoothing to prevent jitter
            if (mouseState.velocityX !== 0 || mouseState.velocityY !== 0) {
                const newAngle = Math.atan2(mouseState.velocityY, mouseState.velocityX);
                // Heavy smoothing to prevent diagonal jitter
                const angleDiff = newAngle - mouseState.smoothAngle;
                const normalizedDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
                mouseState.smoothAngle += normalizedDiff * 0.05; // Very slow interpolation
                mouseState.angle = newAngle;
            }

            // Only add point if it's different enough from the last point (for performance)
            const lastPoint = pointsRef.current[pointsRef.current.length - 1];
            if (!lastPoint ||
                Math.abs(lastPoint.x - e.clientX) > 2 ||
                Math.abs(lastPoint.y - e.clientY) > 2) {
                pointsRef.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    scrollX: window.scrollX,
                    scrollY: window.scrollY,
                    timestamp: now
                });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // Clear trail when theme changes
    useEffect(() => {
        pointsRef.current = [];
    }, [theme.name]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateAndDrawGooglyEyes = (x: number, y: number, velocityX: number, velocityY: number, smoothAngle: number) => {
            const eyeSize = 12;
            const eyeDistance = 20;
            const eyeHeight = 10;
            const pupilSize = 5;
            const pupilDistance = eyeSize - pupilSize - 1;

            const eyeState = eyeStateRef.current;

            // Fixed eye positions (no rotation of eye placement)
            const leftEyeX = x - eyeDistance / 2;
            const leftEyeY = y - eyeHeight;
            const rightEyeX = x + eyeDistance / 2;
            const rightEyeY = y - eyeHeight;

            // Physics constants
            const gravity = 0.015; // Gravity pulls pupils down (increased for faster settling)
            const damping = 0.98; // Air resistance (increased for faster stopping)
            const mouseForce = 0.0008; // How much mouse movement affects rotation (reduced sensitivity)
            const maxVelocity = 0.25; // Maximum angular velocity to prevent infinite spinning
            const minVelocity = 0.001; // Stop very small movements to prevent jitter

            // Calculate mouse movement force with velocity capping - use randomized properties
            const clampedVelocityX = Math.max(-50, Math.min(50, velocityX)); // Clamp input velocity
            const eyeProps = eyePropertiesRef.current;
            const leftMouseTorque = clampedVelocityX * mouseForce * eyeProps.leftSensitivity;
            const rightMouseTorque = clampedVelocityX * mouseForce * eyeProps.rightSensitivity;

            // Apply rotational physics to left eye with randomized properties
            const leftGravity = gravity * eyeProps.leftGravityMultiplier;
            const leftDamping = damping * eyeProps.leftDampingMultiplier;
            const leftGravityTorque = Math.sin(Math.PI / 2 - eyeState.leftRotation) * leftGravity;
            eyeState.leftAngularVelocity += leftGravityTorque + leftMouseTorque;
            eyeState.leftAngularVelocity *= leftDamping;

            // Cap velocity to prevent infinite spinning
            eyeState.leftAngularVelocity = Math.max(-maxVelocity, Math.min(maxVelocity, eyeState.leftAngularVelocity));

            // Stop very small movements to prevent jitter
            if (Math.abs(eyeState.leftAngularVelocity) < minVelocity) {
                eyeState.leftAngularVelocity = 0;
            }

            eyeState.leftRotation += eyeState.leftAngularVelocity;

            // Apply rotational physics to right eye with randomized properties
            const rightGravity = gravity * eyeProps.rightGravityMultiplier;
            const rightDamping = damping * eyeProps.rightDampingMultiplier;
            const rightGravityTorque = Math.sin(Math.PI / 2 - eyeState.rightRotation) * rightGravity;
            eyeState.rightAngularVelocity += rightGravityTorque + rightMouseTorque;
            eyeState.rightAngularVelocity *= rightDamping;

            // Cap velocity to prevent infinite spinning
            eyeState.rightAngularVelocity = Math.max(-maxVelocity, Math.min(maxVelocity, eyeState.rightAngularVelocity));

            // Stop very small movements to prevent jitter
            if (Math.abs(eyeState.rightAngularVelocity) < minVelocity) {
                eyeState.rightAngularVelocity = 0;
            }

            eyeState.rightRotation += eyeState.rightAngularVelocity;

            // Calculate pupil positions based on eye rotation
            const leftPupilX = Math.cos(eyeState.leftRotation) * pupilDistance;
            const leftPupilY = Math.sin(eyeState.leftRotation) * pupilDistance;
            const rightPupilX = Math.cos(eyeState.rightRotation) * pupilDistance;
            const rightPupilY = Math.sin(eyeState.rightRotation) * pupilDistance;

            // Draw left eye
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(leftEyeX, leftEyeY, eyeSize, 0, Math.PI * 2);
            ctx.fill();

            // Draw right eye
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(rightEyeX, rightEyeY, eyeSize, 0, Math.PI * 2);
            ctx.fill();

            // Draw left pupil
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.arc(leftEyeX + leftPupilX, leftEyeY + leftPupilY, pupilSize, 0, Math.PI * 2);
            ctx.fill();

            // Draw right pupil
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.arc(rightEyeX + rightPupilX, rightEyeY + rightPupilY, pupilSize, 0, Math.PI * 2);
            ctx.fill();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const now = Date.now();
            const maxAge = 1500; // 2 seconds

            // Remove old points in the animation loop for continuous fading
            pointsRef.current = pointsRef.current.filter(
                point => now - point.timestamp < maxAge
            );

            const points = pointsRef.current;
            const mouseState = mouseStateRef.current;

            if (points.length >= 2) {
                // Draw thicker tapering trail
                for (let i = 0; i < points.length - 1; i++) {
                    const currentPoint = points[i];
                    const nextPoint = points[i + 1];

                    // Calculate age-based opacity and width with stronger tapering
                    const age = now - currentPoint.timestamp;
                    const normalizedAge = Math.min(age / maxAge, 1);
                    const opacity = Math.max(0, 1 - normalizedAge);

                    // Thicker trail that tapers more dramatically
                    const baseWidth = 20; // Much thicker base
                    const width = Math.max(1, baseWidth * opacity); // Quadratic tapering for more dramatic effect

                    if (opacity <= 0.01) continue;

                    ctx.beginPath();
                    ctx.strokeStyle = theme.colors.accent.primary;
                    ctx.lineWidth = width;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';

                    // Draw smooth curve between points
                    if (i === 0) {
                        ctx.moveTo(currentPoint.x, currentPoint.y);
                        ctx.lineTo(nextPoint.x, nextPoint.y);
                    } else {
                        // Use quadratic curve for smoothness
                        const prevPoint = points[i - 1];
                        const controlX = currentPoint.x;
                        const controlY = currentPoint.y;

                        ctx.moveTo(
                            (prevPoint.x + currentPoint.x) / 2,
                            (prevPoint.y + currentPoint.y) / 2
                        );
                        ctx.quadraticCurveTo(
                            controlX,
                            controlY,
                            (currentPoint.x + nextPoint.x) / 2,
                            (currentPoint.y + nextPoint.y) / 2
                        );
                    }

                    ctx.stroke();
                }

                // Draw googly eyes at the current cursor position (beginning of trail)
                if (points.length > 0) {
                    const latestPoint = points[points.length - 1];
                    updateAndDrawGooglyEyes(latestPoint.x, latestPoint.y, mouseState.velocityX, mouseState.velocityY, mouseState.smoothAngle);
                }
            } else {
                // Even if no trail, still draw eyes at current mouse position
                updateAndDrawGooglyEyes(mouseState.x, mouseState.y, mouseState.velocityX, mouseState.velocityY, mouseState.smoothAngle);
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
                pointerEvents: 'none',
                userSelect: 'none',
                touchAction: 'none',
                mixBlendMode: 'normal'
            }}
        />
    );
};

export default CursorTrail;