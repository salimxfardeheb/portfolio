"use client";

import { useEffect, useRef } from "react";

/**
 * Grille de points qui suit la souris derrière le hero (port de design-ref/dot-field-reference.js).
 * - Se place en absolu dans son parent (qui doit être `relative`) et écoute la souris sur ce parent.
 * - Apparaît quand la souris bouge, s'efface quand elle s'arrête ou sort.
 * - Inactif sur les écrans tactiles ; sans lissage si `prefers-reduced-motion`.
 * - La boucle d'animation s'arrête dès que l'effet est invisible.
 */
export function DotField({
  dotColor = "#4CB944",
  size = 220,
  gap = 20,
}: {
  dotColor?: string;
  /** Rayon visible, en px. */
  size?: number;
  /** Pas de la grille, en px. */
  gap?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target: { x: number; y: number } | null = null;
    let current: { x: number; y: number } | null = null;
    let energy = 0;
    let raf = 0;

    const R = size;
    const sigma = R * 0.45; // zone de déformation
    const push = R * 0.18; // force de la loupe

    function tick() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const home = { x: w * 0.68, y: h * 0.5 };
      const goal = target ?? home;
      if (!current) current = { ...home };
      const prev = { ...current };
      const follow = reduce ? 1 : 0.14;
      current.x += (goal.x - current.x) * follow;
      current.y += (goal.y - current.y) * follow;
      const speed = Math.hypot(current.x - prev.x, current.y - prev.y);

      const want = target ? Math.min(1, 0.25 + speed * 0.08) : 0;
      energy += (want - energy) * (want > energy ? 0.12 : 0.03);

      if (energy > 0.005) {
        ctx.fillStyle = dotColor;
        const x0 = Math.max(0, Math.floor((current.x - R - push) / gap)) * gap;
        const y0 = Math.max(0, Math.floor((current.y - R - push) / gap)) * gap;
        const x1 = Math.min(w, current.x + R + push);
        const y1 = Math.min(h, current.y + R + push);
        for (let gx = x0; gx <= x1; gx += gap) {
          for (let gy = y0; gy <= y1; gy += gap) {
            const dx = gx - current.x;
            const dy = gy - current.y;
            const d = Math.hypot(dx, dy) || 0.001;
            if (d > R) continue;
            const g = Math.exp(-(d * d) / (2 * sigma * sigma));
            const off = push * g;
            const alpha = energy * Math.pow(1 - d / R, 1.4);
            if (alpha < 0.01) continue;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(gx + (dx / d) * off, gy + (dy / d) * off, 1.1 + 0.9 * g, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }

      // Plus rien à dessiner : on arrête la boucle jusqu'au prochain mouvement.
      if (!target && energy <= 0.005) {
        energy = 0;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function onMove(event: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      target = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      start();
    }

    function onLeave() {
      target = null;
      start();
    }

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [dotColor, size, gap]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 size-full"
    />
  );
}
