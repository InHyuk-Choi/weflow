"use client";

import { useEffect, useRef } from "react";

// Cursor follower: a soft glow that smoothly trails the mouse + a small ring
// that tracks it precisely. Desktop (fine pointer) only.
export default function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let gx = mx;
    let gy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (ring.current) {
        ring.current.style.transform = `translate(${mx - 16}px, ${my - 16}px)`;
        ring.current.style.opacity = "1";
      }
    };

    const loop = () => {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      if (glow.current) {
        glow.current.style.transform = `translate(${gx - 192}px, ${gy - 192}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-96 w-96 rounded-full bg-brand-400/20 blur-3xl lg:block"
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-8 w-8 rounded-full border-2 border-brand-500/70 opacity-0 transition-opacity duration-300 lg:block"
      />
    </>
  );
}
