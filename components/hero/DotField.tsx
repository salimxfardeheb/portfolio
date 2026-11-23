"use client";

import { useEffect, useRef } from "react";

/**
 * Grille de points qui suit la souris derrière le hero (port de design-ref/dot-field-reference.js).
 *
 * - Canvas en absolu dans son parent (qui doit être `relative`) ; la souris est écoutée sur ce parent.
 * - Invisible au repos. Quand la souris bouge, les points apparaissent dans un rayon `size`
 *   avec un effet de loupe (poussés vers l'extérieur), puis s'effacent quand elle s'arrête ou sort.
 * - `prefers-reduced-motion: reduce` ou écran sans souris : rien n'est affiché ni écouté.
 * - La boucle `requestAnimationFrame` ne tourne que pendant l'animation, et s'arrête au démontage.
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

    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const enabled = () => hasMouse.matches && !reducedMotion.matches;

    const R = size;
    const sigma = R * 0.45; // zone de déformation
    const push = R * 0.18; // force de la loupe

    let target: { x: number; y: number } | null = null;
    let current: { x: number; y: number } | null = null;
    let energy = 0;
    let raf = 0;

    function clear() {
      if (!canvas || !ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function tick() {
      raf = 0;
      if (!canvas || !ctx) return;

      // Taille du canvas = taille affichée × devicePixelRatio (suit aussi le redimensionnement).
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Position de repos, comme dans la référence : le centre y part et y revient.
      const home = { x: w * 0.68, y: h * 0.5 };
      if (!current) current = { ...home };
      const goal = target ?? home;
      const prev = { ...current };
      current.x += (goal.x - current.x) * 0.14;
      current.y += (goal.y - current.y) * 0.14;
      const speed = Math.hypot(current.x - prev.x, current.y - prev.y);

      // Visible tant que le curseur (lissé) bouge, s'efface quand il s'arrête ou sort.
      const want = target && speed > 0.3 ? Math.min(1, 0.25 + speed * 0.08) : 0;
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
        raf = requestAnimationFrame(tick);
        return;
      }

      // Effacé et immobile : on arrête la boucle jusqu'au prochain mouvement.
      energy = 0;
      if (speed > 0.3) raf = requestAnimationFrame(tick);
    }

    function start() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
      target = null;
      current = null;
      energy = 0;
      clear();
    }

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !enabled() || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      target = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      start();
    }

    function onLeave() {
      if (!target) return;
      target = null;
      start();
    }

    // L'utilisateur active « réduire les animations » ou débranche la souris en cours de route.
    function onPreferenceChange() {
      if (!enabled()) stop();
    }

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    hasMouse.addEventListener("change", onPreferenceChange);
    reducedMotion.addEventListener("change", onPreferenceChange);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      hasMouse.removeEventListener("change", onPreferenceChange);
      reducedMotion.removeEventListener("change", onPreferenceChange);
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
