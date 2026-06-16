"use client";

import { useEffect, useRef } from "react";

// Sparkle particle trail that follows the cursor (desktop only).
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  hue: number;
}

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    let lastX = 0;
    let lastY = 0;

    const spawn = (x: number, y: number, n: number) => {
      for (let i = 0; i < n; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -0.6 - Math.random() * 1.4, // drift upward
          life: 0,
          max: 500 + Math.random() * 500,
          size: 1.5 + Math.random() * 3,
          hue: 210 + Math.random() * 30, // blue range
        });
      }
      // cap
      if (particles.length > 240) particles.splice(0, particles.length - 240);
    };

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);
      if (dist > 6) {
        spawn(e.clientX, e.clientY, 2);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let prev = performance.now();
    const loop = (now: number) => {
      const dt = now - prev;
      prev = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.max) {
          particles.splice(i, 1);
          continue;
        }
        const t = p.life / p.max;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.012; // slight gravity
        const alpha = (1 - t) * 0.9;
        const r = p.size * (1 - t * 0.5);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 65%, ${alpha})`);
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 65%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fill();
        // bright core
        ctx.fillStyle = `hsla(${p.hue}, 95%, 85%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] hidden lg:block"
    />
  );
}
