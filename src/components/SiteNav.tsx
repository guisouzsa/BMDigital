"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { nav, navCta, type NavId } from "@/content";
import { BmSymbol } from "./BmSymbol";
import { CtaButton } from "./CtaButton";
import { Close, Menu } from "./icons";

/**
 * Navegação principal: barra fixa no topo.
 * - Sobre o hero fica transparente; ao rolar ganha fundo e uma linha de separação.
 * - Rolando para baixo fica mais baixa (compacta); rolando para cima volta ao tamanho normal.
 * - Telas largas: links visíveis. Telas menores: menu em tela cheia.
 */
export function SiteNav() {
  const [active, setActive] = useState<NavId>("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ x: 0, w: 0, visible: false });

  // Seção ativa: a que cruza a faixa central da tela.
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-nav]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.getAttribute("data-nav") as NavId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Estado de scroll e direção (com margem para não oscilar em micro-rolagens).
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        // Tom da seção logo abaixo da barra: vidro claro sobre seções claras, escuro sobre escuras
        const under = document.elementsFromPoint(8, 40).find((el) => !el.closest("header"))?.closest("[data-tone]");
        setOnLight(y > 24 && under?.getAttribute("data-tone") === "light");
        document.documentElement.toggleAttribute("data-scrolled", y > 24);
        if (Math.abs(y - lastY) > 8) {
          setCompact(y > lastY && y > 240);
          lastY = y;
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Indicador da seção ativa: uma única linha que desliza até o item atual.
  useLayoutEffect(() => {
    const measure = () => {
      const el = links.current[active];
      setIndicator(el ? { x: el.offsetLeft, w: el.offsetWidth, visible: true } : (prev) => ({ ...prev, visible: false }));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  // Menu: trava a rolagem, fecha com Esc e devolve o foco ao botão.
  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        data-scrolled={scrolled || undefined}
        data-compact={compact || undefined}
        data-light={onLight || undefined}
        className="intro group/nav fixed inset-x-0 top-0 z-40 text-white transition-[background-color,box-shadow,color,backdrop-filter] duration-500 ease-(--ease-soft) data-scrolled:not-data-light:bg-ink/70 data-scrolled:not-data-light:shadow-[0_1px_0_rgb(255_255_255/0.07)] data-scrolled:backdrop-blur-xl data-scrolled:backdrop-saturate-150 data-light:bg-white/75 data-light:text-ink data-light:shadow-[0_1px_0_rgb(11_11_13/0.08)]"
      >
        <div className="container-page flex h-16 items-center justify-between gap-6 transition-[height] duration-300 ease-(--ease-soft) group-data-compact/nav:h-14 lg:h-20 lg:group-data-compact/nav:h-16">
          <a href="#inicio" aria-label="BM Digital, voltar ao início" className="flex min-h-11 items-center">
            <BmSymbol className="h-6 w-auto text-brand lg:h-7" />
          </a>

          <nav aria-label="Seções da página" className="hidden xl:block">
            <ol className="relative flex items-center gap-6 rounded-full border border-white/12 bg-white/[0.04] px-6 transition-colors duration-500 group-data-light/nav:border-ink/10 group-data-light/nav:bg-ink/[0.03]">
              {nav.slice(1).map((item) => {
                const isActive = item.id === active;
                return (
                  <li key={item.id}>
                    <a
                      ref={(el) => {
                        links.current[item.id] = el;
                      }}
                      href={`#${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={`group/link relative inline-flex min-h-11 min-w-11 items-center justify-center text-sm transition-colors duration-300 ${
                        isActive
                          ? "text-white group-data-light/nav:text-ink"
                          : "text-white/80 hover:text-white group-data-light/nav:text-ink/70 group-data-light/nav:hover:text-ink"
                      }`}
                    >
                      {item.label}
                      {/* Hover: linha fina que cresce da esquerda */}
                      {!isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-2 h-px origin-left scale-x-0 bg-white/40 transition-transform duration-300 ease-(--ease-soft) group-hover/link:scale-x-100 group-data-light/nav:bg-ink/30"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
              {/* Indicador da seção ativa: migra suavemente entre os itens */}
              <li
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2 left-0 h-px bg-brand-bright transition-[translate,width,opacity,background-color] duration-500 ease-(--ease-soft) group-data-light/nav:bg-brand"
                style={{ translate: `${indicator.x}px 0`, width: indicator.w, opacity: indicator.visible ? 1 : 0 }}
              />
            </ol>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <CtaButton position="topo" className="min-h-11 px-5 text-sm">
                {navCta}
              </CtaButton>
            </div>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="menu-principal"
              onClick={() => setOpen(true)}
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-full xl:hidden"
            >
              <Menu className="size-6" />
              <span className="sr-only">Abrir menu</span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="menu-principal"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-ink pt-[env(safe-area-inset-top)] pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-white xl:hidden"
        >
          <div className="container-page flex h-16 items-center justify-between">
            <BmSymbol className="h-6 w-auto text-brand" />
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(false)}
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-full"
            >
              <Close className="size-6" />
              <span className="sr-only">Fechar menu</span>
            </button>
          </div>
          <nav aria-label="Seções da página" className="container-page mt-4 flex-1 overflow-y-auto">
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {nav.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={item.id === active ? "location" : undefined}
                    className="flex min-h-14 items-center gap-4 text-2xl font-semibold tracking-tight aria-[current]:text-brand-bright"
                  >
                    <span className="w-6 text-xs font-normal text-white/60 tabular-nums">0{i + 1}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="container-page mt-6">
            <CtaButton position="menu" className="w-full">
              {navCta}
            </CtaButton>
          </div>
        </div>
      )}
    </>
  );
}
