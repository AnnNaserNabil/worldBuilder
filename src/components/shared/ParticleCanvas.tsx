import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  alphaChange: number;
  color: string;
}

interface ParticleCanvasProps {
  particleCount?: number;
  connectionDistance?: number;
  speed?: number;
}

/**
 * ParticleCanvas - Ambient particle system for atmospheric background
 * Renders 80-120 floating particles with subtle connections
 * GPU-accelerated using requestAnimationFrame
 */
export function ParticleCanvas({
  particleCount = 100,
  connectionDistance = 150,
  speed = 0.3,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Color palette matching GAME UI BIBLE §1 tokens (stable reference)
  const colorsRef = useRef([
    'rgba(201, 169, 89,',    // gold
    'rgba(107, 76, 138,',    // mystic
    'rgba(139, 21, 56,',     // blood
    'rgba(156, 163, 175,',   // fog-light
    'rgba(212, 196, 168,',   // bone
  ]);

  const createParticle = useCallback((width: number, height: number): Particle => {
    const colors = colorsRef.current;
    const colorBase = colors[Math.floor(Math.random() * colors.length)];
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      alphaChange: (Math.random() - 0.5) * 0.002,
      color: colorBase,
    };
  }, [speed]);

  const initParticles = useCallback((width: number, height: number) => {
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(width, height)
    );
  }, [particleCount, createParticle]);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const particles = particlesRef.current;

    // Update and draw each particle
    particles.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Update alpha (pulsing effect)
      particle.alpha += particle.alphaChange;
      if (particle.alpha <= 0.1 || particle.alpha >= 0.7) {
        particle.alphaChange *= -1;
      }

      // Boundary wrapping
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;

      // Mouse interaction (subtle repulsion)
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        const force = (100 - distance) / 100;
        particle.vx -= Math.cos(angle) * force * 0.02;
        particle.vy -= Math.sin(angle) * force * 0.02;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${particle.color} ${particle.alpha})`;
      ctx.fill();
    });

    // Draw connections between nearby particles
    ctx.strokeStyle = 'rgba(201, 169, 89, 0.03)';
    ctx.lineWidth = 0.5;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const alpha = (1 - distance / connectionDistance) * 0.15;
          ctx.strokeStyle = `rgba(201, 169, 89, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }, [connectionDistance]);

  // Use a ref to store the animation callback to avoid forward reference
  const animateCallbackRef = useRef<(() => void) | null>(null);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawParticles(ctx, canvas.width, canvas.height);

    if (animateCallbackRef.current) {
      animationFrameRef.current = requestAnimationFrame(animateCallbackRef.current);
    }
  }, [drawParticles]);

  useEffect(() => {
    // Define the callback that will be used for animation loop
    animateCallbackRef.current = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawParticles(ctx, canvas.width, canvas.height);

      if (animateCallbackRef.current) {
        animationFrameRef.current = requestAnimationFrame(animateCallbackRef.current);
      }
    };
  }, [drawParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      
      // Reinitialize particles on resize
      initParticles(rect.width, rect.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Initial setup
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-container"
      style={{
        width: '100%',
        height: '100%',
      }}
      aria-hidden="true"
    />
  );
}
