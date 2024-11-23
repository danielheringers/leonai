"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

const NUM_PARTICLES = 20;
const CONNECTION_DISTANCE = 40;

const COLORS = {
  light: [
    "#1a365d", // Deep royal blue
    "#ed8936", // Warm orange
    "#2c7a7b", // Turquoise
    "#553c9a", // Deep purple
    "#c05621", // Bronze
    "#276749", // Forest green
  ],
  dark: [
    "#4299e1", // Bright blue
    "#fbd38d", // Light orange
    "#4fd1c5", // Bright turquoise
    "#9f7aea", // Bright purple
    "#ed8936", // Bright bronze
    "#48bb78", // Bright green
  ],
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export function MiniAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";
    const currentColors = isDark ? COLORS.dark : COLORS.light;

    let particles: Particle[] = [];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    const initParticles = () => {
      particles = Array.from({ length: NUM_PARTICLES }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: currentColors[Math.floor(Math.random() * currentColors.length)],
        size: Math.random() * 2 + 0.5,
      }));
    };

    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    };

    const drawConnections = () => {
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            const alpha = (1 - distance / CONNECTION_DISTANCE) * 0.3;
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(0, 0, 0, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });
    };

    const updateParticles = () => {
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      drawConnections();
      particles.forEach(drawParticle);
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme, systemTheme]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
