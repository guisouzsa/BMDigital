"use client";

import { useEffect, useRef } from "react";

// Globo de pontos em Canvas 2D (sem bibliotecas): continentes gerados por ruído, contorno fino.
// Desktop: reage ao mouse com inércia (rotação + leve parallax) e, com o cursor sobre a esfera,
// mostra um "campo de influência" azul que destaca e conecta os pontos próximos.
// Mobile: apenas rotação lenta. Começa depois do carregamento, pausa fora da tela,
// roda a 30 fps quando está só girando e fica estático com movimento reduzido.

type Vec = [number, number, number];

function hash(x: number, y: number, z: number) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 1440662683);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function noise(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const s = (t: number) => t * t * (3 - 2 * t);
  const u = s(x - xi), v = s(y - yi), w = s(z - zi);
  const l = (a: number, b: number, t: number) => a + (b - a) * t;
  const c = (dx: number, dy: number, dz: number) => hash(xi + dx, yi + dy, zi + dz);
  return l(
    l(l(c(0, 0, 0), c(1, 0, 0), u), l(c(0, 1, 0), c(1, 1, 0), u), v),
    l(l(c(0, 0, 1), c(1, 0, 1), u), l(c(0, 1, 1), c(1, 1, 1), u), v),
    w,
  );
}
const fbm = ([x, y, z]: Vec) =>
  noise(x * 1.6, y * 1.6, z * 1.6) * 0.6 + noise(x * 3.4, y * 3.4, z * 3.4) * 0.3 + noise(x * 7, y * 7, z * 7) * 0.1;

const LAND_STRIDE = 5; // x, y, z, escala, opacidade

/**
 * Pontos na esfera (espiral de Fibonacci).
 * - Terra: densidade e tamanho variam com o ruído (interior dos continentes mais marcado).
 * - Oceano: poucos pontos, muito discretos.
 * - Alguns pontos de terra em azul da marca.
 */
function buildPoints(count: number) {
  const land: number[] = [];
  const ocean: number[] = [];
  const brand: number[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    const p: Vec = [Math.cos(t) * r, y, Math.sin(t) * r];
    const n = fbm([p[0] + 3.1, p[1] + 1.7, p[2] + 5.3]);
    if (n > 0.575) {
      const core = Math.min(1, (n - 0.575) / 0.12); // 0 na costa, 1 no interior
      const jitter = hash(i, 7, 13);
      land.push(p[0], p[1], p[2], 0.7 + core * 0.6 + jitter * 0.3, 0.55 + core * 0.35 + jitter * 0.1);
      if (jitter > 0.94) brand.push(...p);
    } else if (i % 6 === 0) {
      ocean.push(...p);
    }
  }
  return { land: new Float32Array(land), ocean: new Float32Array(ocean), brand: new Float32Array(brand) };
}

/** `contentId`: bloco de texto do hero; no mobile o globo nasce abaixo dele. */
export function Globe({ contentId }: { contentId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const interactive = finePointer && !reduced;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let pts = { land: new Float32Array(0), ocean: new Float32Array(0), brand: new Float32Array(0) };

    let w = 0, h = 0, R = 0, cx = 0, cy = 0;
    let raf = 0, visible = true, last = 0, lastDraw = 0;
    let spin = 0.9; // rotação base
    const baseTilt = 0.42;
    // Mouse na página: alvo; valor atual segue com inércia.
    const target = { yaw: 0, pitch: 0, x: 0, y: 0 };
    const current = { yaw: 0, pitch: 0, x: 0, y: 0 };
    let lastMove = 0;
    // Campo de influência (cursor sobre a esfera).
    const field = { x: 0, y: 0, tx: 0, ty: 0, strength: 0, target: 0 };
    const near: { x: number; y: number; d: number }[] = [];

    // Corpo do planeta pré-renderizado (só muda no resize).
    const bodyLayer = document.createElement("canvas");
    const paintBody = () => {
      const size = Math.ceil((R * 2 + 4) * dpr);
      bodyLayer.width = bodyLayer.height = size;
      const b = bodyLayer.getContext("2d")!;
      b.scale(dpr, dpr);
      const c = R + 2;
      // Luz discreta vinda do alto à esquerda: volume sem brilho.
      const grad = b.createRadialGradient(c - R * 0.4, c - R * 0.5, R * 0.05, c, c, R);
      grad.addColorStop(0, "#1a1d24");
      grad.addColorStop(0.7, "#101217");
      grad.addColorStop(1, "#0c0d10");
      b.beginPath();
      b.arc(c, c, R, 0, Math.PI * 2);
      b.fillStyle = grad;
      b.fill();
      b.strokeStyle = "rgba(91,141,255,0.3)";
      b.lineWidth = 1;
      b.stroke();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if (w >= 1024) {
        // Desktop: composição assimétrica, globo à direita do texto.
        R = Math.min(h * 0.42, w * 0.28);
        cx = w * 0.75;
        cy = h * 0.55;
      } else {
        const content = document.getElementById(contentId);
        const bottom = content ? content.getBoundingClientRect().bottom - rect.top : h * 0.6;
        R = Math.min(w * 0.72, 420);
        cx = w * 0.72;
        cy = Math.min(bottom + 40, h - 140) + R;
      }
      paintBody();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const ox = cx + current.x, oy = cy + current.y;
      ctx.drawImage(bodyLayer, ox - R - 2, oy - R - 2, R * 2 + 4, R * 2 + 4);

      const a = spin + current.yaw;
      const t = baseTilt + current.pitch;
      const ca = Math.cos(a), sa = Math.sin(a), ct = Math.cos(t), st = Math.sin(t);
      const fieldR = R * 0.3;
      const fs = field.strength;

      // Campo de influência: halo azul translúcido, abaixo dos pontos e contido na esfera.
      if (fs > 0.01) {
        const g = ctx.createRadialGradient(field.x, field.y, 0, field.x, field.y, fieldR * 1.4);
        g.addColorStop(0, `rgba(61,126,255,${0.14 * fs})`);
        g.addColorStop(1, "rgba(61,126,255,0)");
        ctx.save();
        ctx.beginPath();
        ctx.arc(ox, oy, R, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = g;
        ctx.fillRect(field.x - fieldR * 1.4, field.y - fieldR * 1.4, fieldR * 2.8, fieldR * 2.8);
        ctx.restore();
      }

      // Oceano: pontos mínimos e discretos.
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < pts.ocean.length; i += 3) {
        const px = pts.ocean[i], py = pts.ocean[i + 1], pz = pts.ocean[i + 2];
        const x1 = px * ca + pz * sa;
        const z1 = -px * sa + pz * ca;
        const z = py * st + z1 * ct;
        if (z <= 0) continue;
        ctx.globalAlpha = z * 0.08;
        ctx.fillRect(ox + x1 * R, oy - (py * ct - z1 * st) * R, 1, 1);
      }

      // Terra: tamanho e opacidade variam por ponto e pela profundidade (borda mais apagada).
      near.length = 0;
      for (let i = 0; i < pts.land.length; i += LAND_STRIDE) {
        const px = pts.land[i], py = pts.land[i + 1], pz = pts.land[i + 2];
        const x1 = px * ca + pz * sa;
        const z1 = -px * sa + pz * ca;
        const z = py * st + z1 * ct;
        if (z <= 0) continue;
        const sx = ox + x1 * R, sy = oy - (py * ct - z1 * st) * R;
        const depth = z * z; // queda mais rápida perto da borda: sensação de curvatura
        let alpha = (0.16 + depth * 0.62) * pts.land[i + 4];
        let size = (0.8 + z * 1) * pts.land[i + 3];
        if (fs > 0.01) {
          const d = Math.hypot(sx - field.x, sy - field.y);
          if (d < fieldR) {
            const boost = (1 - d / fieldR) * fs;
            alpha += boost * 0.45;
            size += boost * 0.9;
            if (boost > 0.3 && near.length < 40) near.push({ x: sx, y: sy, d });
          }
        }
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
      }

      // Pontos em azul da marca.
      ctx.fillStyle = "#5b8dff";
      for (let i = 0; i < pts.brand.length; i += 3) {
        const px = pts.brand[i], py = pts.brand[i + 1], pz = pts.brand[i + 2];
        const x1 = px * ca + pz * sa;
        const z1 = -px * sa + pz * ca;
        const z = py * st + z1 * ct;
        if (z <= 0.15) continue;
        ctx.globalAlpha = 0.35 + z * 0.55;
        const s = 1.4 + z;
        ctx.fillRect(ox + x1 * R - s / 2, oy - (py * ct - z1 * st) * R - s / 2, s, s);
      }

      // Conexões finas entre os pontos mais próximos do cursor.
      if (near.length > 2) {
        near.sort((p, q) => p.d - q.d);
        ctx.strokeStyle = "#5b8dff";
        ctx.lineWidth = 0.6;
        ctx.globalAlpha = 0.35 * fs;
        ctx.beginPath();
        const n = Math.min(near.length, 9);
        for (let i = 1; i < n; i++) {
          ctx.moveTo(near[i - 1].x, near[i - 1].y);
          ctx.lineTo(near[i].x, near[i].y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      const dt = last ? Math.min(now - last, 50) : 16;
      last = now;
      spin += dt * (finePointer ? 0.00005 : 0.00003);

      // Sem movimento do mouse por um tempo: volta ao estado natural.
      if (now - lastMove > 1400) {
        target.yaw = target.pitch = target.x = target.y = 0;
      }
      // Inércia independente da taxa de quadros (movimento com "peso").
      const k = 1 - Math.exp(-dt / 450);
      current.yaw += (target.yaw - current.yaw) * k;
      current.pitch += (target.pitch - current.pitch) * k;
      current.x += (target.x - current.x) * k;
      current.y += (target.y - current.y) * k;
      // O campo segue o cursor com pequeno atraso e aparece/some suavemente.
      const kf = 1 - Math.exp(-dt / 160);
      field.x += (field.tx - field.x) * kf;
      field.y += (field.ty - field.y) * kf;
      field.strength += (field.target - field.strength) * (1 - Math.exp(-dt / 260));

      const settling =
        Math.abs(target.yaw - current.yaw) + Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.05 ||
        field.strength > 0.01;
      // Só girando: 30 fps no desktop, 15 fps no celular (rotação lenta, economiza CPU e bateria)
      if (settling || now - lastDraw > (finePointer ? 33 : 66)) {
        draw();
        lastDraw = now;
      }
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!finePointer) return; // celular: sem loop (ver spinOnCompositor)
      if (!raf && visible && !document.hidden && !reduced) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };

    let overGlobe = false;
    const setOver = (value: boolean) => {
      if (value === overGlobe) return;
      overGlobe = value;
      field.target = value ? 1 : 0;
      // Estado do cursor personalizado
      if (value) document.documentElement.dataset.cursor = "globe";
      else delete document.documentElement.dataset.cursor;
    };

    const onPointer = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      target.yaw = nx * 0.4;
      target.pitch = ny * 0.16;
      target.x = nx * -16;
      target.y = ny * -10;
      lastMove = performance.now();

      const rect = canvas.getBoundingClientRect();
      const lx = e.clientX - rect.left, ly = e.clientY - rect.top;
      const inside = ly >= 0 && ly <= rect.height && Math.hypot(lx - (cx + current.x), ly - (cy + current.y)) < R;
      if (inside && !overGlobe) {
        field.x = lx;
        field.y = ly;
      }
      field.tx = lx;
      field.ty = ly;
      setOver(inside);
    };
    const onLeave = () => setOver(false);

    // No celular o globo é desenhado uma vez e gira devagar com CSS em torno do próprio centro:
    // o movimento roda na GPU e não ocupa o processador.
    const spinOnCompositor = () => {
      if (finePointer || reduced) return;
      canvas.style.transformOrigin = `${cx}px ${cy}px`;
      canvas.classList.add("globe-spin");
    };

    let started = false;
    const boot = () => {
      if (started) return;
      started = true;
      pts = buildPoints(window.innerWidth < 1024 ? 2200 : 6000);
      resize();
      draw();
      canvas.dataset.ready = "true";
      spinOnCompositor();
      start();
    };
    const idle = () =>
      typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(boot, { timeout: 2500 }) : setTimeout(boot, 800);
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });

    const ro = new ResizeObserver(() => {
      if (!started) return;
      resize();
      draw();
      spinOnCompositor();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) setOver(false);
      if (started) start();
    });
    io.observe(canvas);
    const onVisibility = () => started && start();
    document.addEventListener("visibilitychange", onVisibility);
    if (interactive) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("load", idle);
      setOver(false);
    };
  }, [contentId]);

  return (
    <div aria-hidden="true" className="parallax-slow absolute inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-[1.2s] ease-(--ease-soft) data-[ready=true]:opacity-100"
      />
    </div>
  );
}
