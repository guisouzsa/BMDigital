import type { ReactNode } from "react";
import { pillars } from "@/content";
import { Section, SectionHeading } from "./Section";

type Pillar = (typeof pillars.items)[number];

// Cada pilar tem composição e visual próprios, em vez de três cards iguais.
export function Pillars() {
  const [build, acquisition, sales] = pillars.items;

  return (
    <Section id="pilares" navId="pilares" tone="light" labelledBy="pilares-title">
      <SectionHeading id="pilares-title" label={pillars.label} title={pillars.title} />

      <div className="mt-10 sm:mt-14">
        <PillarRow pillar={build} visual={<PageSketch />} />
        <PillarRow pillar={acquisition} visual={<ChannelList items={acquisition.details} />} reverse />
        <PillarRow pillar={sales} visual={<SalesSteps items={sales.details} />} />
      </div>
    </Section>
  );
}

function PillarRow({ pillar, visual, reverse = false }: { pillar: Pillar; visual: ReactNode; reverse?: boolean }) {
  return (
    <article
      aria-labelledby={`pilar-${pillar.number}`}
      className="group/pillar relative grid grid-cols-1 gap-10 border-t border-ink/12 py-10 sm:py-14 lg:grid-cols-12 lg:gap-10"
    >
      <span
        aria-hidden="true"
        className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-700 ease-(--ease-soft) group-hover/pillar:scale-x-100"
      />
      <div className={`lg:col-span-6 ${reverse ? "slide-right lg:order-2 lg:col-start-7" : "slide-left"}`}>
        <div className="flex items-baseline gap-5">
          <span aria-hidden="true" className="text-[clamp(2.5rem,2rem+2vw,3.75rem)] leading-[0.85] font-semibold tracking-[-0.05em] text-brand tabular-nums transition-transform duration-500 ease-(--ease-soft) group-hover/pillar:translate-x-1">
            {pillar.number}
          </span>
          <p className="label text-subtle">{pillar.pillar}</p>
        </div>
        <h3 id={`pilar-${pillar.number}`} className="mt-5 text-2xl leading-none font-bold tracking-[-0.03em] sm:text-3xl">
          {pillar.name}
        </h3>
        <p className="lead mt-5 text-subtle">{pillar.text}</p>
      </div>
      <div className={`lg:col-span-5 lg:self-center ${reverse ? "slide-left lg:order-1 lg:col-start-1" : "slide-right lg:col-start-8"}`}>{visual}</div>
    </article>
  );
}

/** 01 — Esboço de uma página de vendas, desenhado durante o scroll. */
function PageSketch() {
  return (
    <figure className="draw-scope mx-auto max-w-sm lg:max-w-none">
      <svg
        viewBox="0 0 400 280"
        className="draw-stroke w-full text-ink/35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        role="img"
        aria-label="Esboço de uma landing page: título, texto, botão de compra e blocos de conteúdo"
      >
        <rect pathLength={1} x="1" y="1" width="398" height="278" rx="14" />
        <line pathLength={1} x1="1" y1="30" x2="399" y2="30" />
        <circle pathLength={1} cx="20" cy="16" r="4" />
        <circle pathLength={1} cx="34" cy="16" r="4" />
        <line pathLength={1} x1="32" y1="66" x2="248" y2="66" strokeWidth="6" />
        <line pathLength={1} x1="32" y1="86" x2="196" y2="86" strokeWidth="6" />
        <line pathLength={1} x1="32" y1="114" x2="220" y2="114" />
        <line pathLength={1} x1="32" y1="126" x2="180" y2="126" />
        <rect pathLength={1} x="32" y="146" width="112" height="30" rx="15" className="text-brand" stroke="var(--color-brand)" strokeWidth="1.5" />
        <rect pathLength={1} x="272" y="56" width="96" height="120" rx="10" />
        <rect pathLength={1} x="32" y="204" width="104" height="48" rx="8" />
        <rect pathLength={1} x="148" y="204" width="104" height="48" rx="8" />
        <rect pathLength={1} x="264" y="204" width="104" height="48" rx="8" />
      </svg>
    </figure>
  );
}

/** 02 — Onde a oferta é encontrada: canais em tipografia. */
function ChannelList({ items }: { items: readonly string[] }) {
  return (
    <ul aria-label="Canais de aquisição" className="border-b border-ink/12">
      {items.map((item) => (
        <li key={item} className="reveal border-t border-ink/12 py-3 text-xl leading-none font-semibold tracking-tight sm:text-2xl">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** 03 — Frentes da operação comercial, com o traço crescendo conforme o scroll. */
function SalesSteps({ items }: { items: readonly string[] }) {
  return (
    <ol aria-label="Operação comercial" className="space-y-4">
      {items.map((item, i) => (
        <li key={item} className="reveal">
          <span className="text-base font-semibold tracking-tight sm:text-lg">{item}</span>
          <div aria-hidden="true" className="mt-2 h-px bg-ink/12">
            <div className="mark-x h-px bg-brand" style={{ width: `${40 + i * 20}%` }} />
          </div>
        </li>
      ))}
    </ol>
  );
}
