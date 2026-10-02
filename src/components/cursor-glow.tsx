
"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const glow = glowRef.current;
    const dots = dotRefs.map((ref) => ref.current);

    if (!glow || dots.some((dot) => !dot)) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isCoarsePointer) {
      glow.style.opacity = "0";
      dots.forEach((dot) => {
        if (dot) dot.style.opacity = "0";
      });
      return;
    }

    let frame = 0;
    let x = -100;
    let y = -100;
    let active = false;

    const positions = [
      { x: -100, y: -100 },
      { x: -100, y: -100 },
      { x: -100, y: -100 },
    ];

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      active = true;
    };

    const hide = () => {
      active = false;
      glow.style.opacity = "0";
      dots.forEach((dot) => {
        if (dot) dot.style.opacity = "0";
      });
    };

    const animate = () => {
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = active ? "1" : "0";

      positions.forEach((position, index) => {
        const previous = index === 0 ? { x, y } : positions[index - 1];

        position.x += (previous.x - position.x) * 0.22;
        position.y += (previous.y - position.y) * 0.22;

        const dot = dots[index];
        if (!dot) return;

        dot.style.left = `${position.x}px`;
        dot.style.top = `${position.y}px`;
        dot.style.opacity = active ? String(0.85 - index * 0.2) : "0";
      });

      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} aria-hidden="true" className="cursor-orb" />
      {dotRefs.map((ref, index) => (
        <div
          key={index}
          ref={ref}
          aria-hidden="true"
          className={`cursor-trail cursor-trail-${index + 1}`}
        />
      ))}
    </>
  );
}