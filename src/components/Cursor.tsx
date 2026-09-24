"use client";

import { useEffect, useRef } from "react";

type State = "default" | "link" | "button" | "globe";

/**
 * Cursor personalizado (apenas desktop com mouse, sem movimento reduzido).
 * Ponto central acompanha rápido; o anel segue com atraso (inércia).
 * Estados: link, botão (CTAs) e globo. Não intercepta cliques (pointer-events: none).
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current, ring = ringRef.current;
    if (!fine || reduced || !dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    const mouse = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let scale = 1, scaleTarget = 1;
    let state: State = "default";
    let raf = 0, last = 0, visible = false;

    const apply = (next: State) => {
      if (next === state) return;
      state = next;
      ring.dataset.state = next;
      scaleTarget = { default: 1, link: 1.25, button: 1.35, globe: 1.9 }[next];
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 50) : 16;
      last = now;
      // Estado vindo do globo (canvas não tem elemento para o hover)
      if (state !== "link" && state !== "button") apply(root.dataset.cursor === "globe" ? "globe" : "default");

      const kd = 1 - Math.exp(-dt / 40);
      const kr = 1 - Math.exp(-dt / 110);
      dotPos.x += (mouse.x - dotPos.x) * kd;
      dotPos.y += (mouse.y - dotPos.y) * kd;
      ringPos.x += (mouse.x - ringPos.x) * kr;
      ringPos.y += (mouse.y - ringPos.y) * kr;
      scale += (scaleTarget - scale) * (1 - Math.exp(-dt / 120));

      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;

      const moving =
        Math.abs(mouse.x - ringPos.x) + Math.abs(mouse.y - ringPos.y) > 0.3 || Math.abs(scaleTarget - scale) > 0.005;
      raf = moving || root.dataset.cursor === "globe" ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        visible = true;
        dotPos.x = ringPos.x = mouse.x;
        dotPos.y = ringPos.y = mouse.y;
        dot.style.opacity = ring.style.opacity = "1";
      }
      wake();
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.("a, button, [role='tab']");
      if (!el) return apply(root.dataset.cursor === "globe" ? "globe" : "default");
      apply(el.hasAttribute("data-cta") ? "button" : "link");
      wake();
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = ring.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    root.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        data-state="default"
        className="pointer-events-none fixed top-0 left-0 z-[70] size-7 rounded-full border border-brand/55 opacity-0 transition-[opacity,background-color,border-color] duration-300 data-[state=button]:border-brand/30 data-[state=button]:bg-brand/10 data-[state=globe]:border-brand-bright/40 data-[state=globe]:bg-brand/8 data-[state=link]:border-brand/70 max-lg:hidden"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[70] size-1.5 rounded-full bg-brand opacity-0 transition-opacity duration-300 max-lg:hidden"
      />
    </>
  );
}
