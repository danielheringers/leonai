"use client";

import { motion, useAnimation } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const NUM_PARTICLES = 60;
const CONNECTION_DISTANCE = 120;
const PULSE_DURATION = 2;

// Color palette inspired by the fantasy theme
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
  angle: number;
  angleSpeed: number;
}

export function WelcomeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const controls = useAnimation();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";
    const currentColors = isDark ? COLORS.dark : COLORS.light;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: NUM_PARTICLES }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        color: currentColors[Math.floor(Math.random() * currentColors.length)],
        size: Math.random() * 3 + 1,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.02,
      }));
    };

    const drawParticle = (particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.angle);

      // Create a gradient for each particle
      const gradient = ctx.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        particle.size * 2
      );
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, particle.size * 2, 0, Math.PI * 2);
      ctx.fill();

      // Add a glowing effect
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawConnections = () => {
      particlesRef.current.forEach((particle, i) => {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            const alpha = (1 - distance / CONNECTION_DISTANCE) * 0.3;
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(0, 0, 0, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();

            // Add magical sparkles at connection points
            const midX = (particle.x + other.x) / 2;
            const midY = (particle.y + other.y) / 2;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(midX, midY, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
    };

    const updateParticles = () => {
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.angle += particle.angleSpeed;

        // Bounce off edges with some randomization
        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.vx *= -1;
          particle.vx += (Math.random() - 0.5) * 0.2;
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.vy *= -1;
          particle.vy += (Math.random() - 0.5) * 0.2;
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      drawConnections();
      particlesRef.current.forEach(drawParticle);
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
  }, [mounted, theme, systemTheme]);

  useEffect(() => {
    controls.start((i) => ({
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: PULSE_DURATION,
        repeat: Infinity,
        delay: i * 0.2,
      },
    }));
  }, [controls]);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10 flex flex-col items-center justify-start p-32 h-full text-foreground">
        <motion.h1
          className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Bem-vindo a LeonAI
        </motion.h1>
        <motion.p
          className="text-xl mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Sua plataforma inteligente de assistência
        </motion.p>
      </div>
    </div>
  );
}
