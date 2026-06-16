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

    const add = (
      x: number,
      y: number,
      vx: number,
      vy: number,
      size: number,
      max: number
    ) => {
      particles.push({
        x,
        y,
        vx,
        vy,
        life: 0,
        max,
        size,
        hue: 210 + Math.random() * 30, // blue range
      });
      if (particles.length > 260) particles.splice(0, particles.length - 260);
    };

    // Gentle trail: one drifting-up sparkle, a touch longer-lived.
    const onMove = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 12) {
        add(
          e.clientX + (Math.random() - 0.5) * 6,
          e.clientY + (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 1.0,
          -0.6 - Math.random() * 1.2,
          1.5 + Math.random() * 3,
          900 + Math.random() * 700
        );
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    window.addEventListener("mousemove", onMove);

    // Click burst: particles radiate outward.
    const onDown = (e: MouseEvent) => {
      const count = 18;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 2 + Math.random() * 3;
        add(
          e.clientX,
          e.clientY,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          2 + Math.random() * 3,
          600 + Math.random() * 500
        );
      }
    };
    window.addEventListener("mousedown", onDown);

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
      window.removeEventListener("mousedown", onDown);
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
