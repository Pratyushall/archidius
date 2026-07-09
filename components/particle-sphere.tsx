"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  opacity: number;
};

function createParticles() {
  const particleCount = 300;
  const radius = 100;

  return Array.from({ length: particleCount }, (_, i): Particle => {
    const phi = Math.acos(-1 + (2 * i) / particleCount);
    const theta = Math.sqrt(particleCount * Math.PI) * phi;

    return {
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
      opacity: Math.random() * 0.7 + 0.3,
    };
  });
}

export function ParticleSphere() {
  const particles = useMemo(createParticles, []);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      setOffset({
        x: (e.clientX - centerX) * 0.05,
        y: (e.clientY - centerY) * 0.05,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.div
        className="relative h-80 w-80"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          x: offset.x,
          y: offset.y,
        }}
      >
        <div className="gold-glow absolute inset-0 rounded-full blur-3xl" />

        <motion.div
          className="breathe-animation slow-rotate absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="-150 -150 300 300"
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="goldGradient">
                <stop offset="0%" stopColor="#e8d4a0" />
                <stop offset="100%" stopColor="#d4af37" />
              </radialGradient>
            </defs>

            {particles.map((particle, idx) => {
              const scale = 200 / (200 + particle.z);
              const x = particle.x * scale;
              const y = particle.y * scale;

              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill="url(#goldGradient)"
                  opacity={particle.opacity * scale}
                  className="particle-shimmer"
                />
              );
            })}
          </svg>
        </motion.div>

        <div className="absolute inset-0 rounded-full border-2 border-[#d4af37] opacity-20" />
      </motion.div>
    </div>
  );
}
