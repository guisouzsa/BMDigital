"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { diagnosis } from "@/content";
import { CtaButton } from "./CtaButton";
import { Section, SectionHeading } from "./Section";

/** Raio-X da operação: o visitante escolhe uma etapa e vê a pergunta estratégica. Não é formulário. */
export function Diagnosis() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const area = diagnosis.areas[selected];
  const count = diagnosis.areas.length;

  // Navegação por teclado entre as abas (setas, Home, End)
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowDown: selected + 1,
      ArrowRight: selected + 1,
      ArrowUp: selected - 1,
      ArrowLeft: selected - 1,
      Home: 0,
      End: count - 1,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    const next = (moves[e.key] + count) % count;
    setSelected(next);
    tabs.current[next]?.focus();
  };

  return (
    <Section navId="comercial" tone="light" labelledBy="raio-x-title">
      <SectionHeading id="raio-x-title" label={diagnosis.label} title={diagnosis.title} />

      <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="text-sm text-subtle">{diagnosis.hint}</p>
          <div
            role="tablist"
            aria-label="Etapas da operação"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-0"
          >
            {diagnosis.areas.map((a, i) => {
              const isSelected = i === selected;
              return (
                <button
                  key={a.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`raio-x-tab-${a.id}`}
                  aria-selected={isSelected}
                  aria-controls="raio-x-painel"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelected(i)}
                  className={`group flex min-h-11 shrink-0 items-center gap-3 rounded-full border px-4 text-sm font-semibold sm:text-base tracking-tight transition-colors duration-200 lg:min-h-12 lg:rounded-none lg:border-0 lg:border-t lg:px-0 lg:text-lg lg:last:border-b ${
                    isSelected
                      ? "border-ink bg-ink text-white lg:border-ink/12 lg:bg-transparent lg:text-ink"
                      : "border-ink/15 text-subtle hover:text-ink lg:border-ink/12"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`hidden h-px transition-all duration-300 lg:block ${isSelected ? "w-6 bg-brand" : "w-0 bg-transparent"}`}
                  />
                  {a.name}
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id="raio-x-painel"
          aria-labelledby={`raio-x-tab-${area.id}`}
          className="flex min-h-40 flex-col justify-between lg:col-span-7 lg:col-start-6 lg:min-h-56"
        >
          <div key={area.id} className="fade-swap">
            <p className="label text-brand">{area.name}</p>
            <p className="mt-4 text-[clamp(1.5rem,1.2rem+1.3vw,2.25rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-balance">
              {area.question}
            </p>
          </div>
        </div>
      </div>

      <div className="reveal mt-12 flex flex-col gap-6 border-t border-ink/12 pt-8 sm:mt-16 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-2xl text-lg leading-snug font-semibold tracking-tight text-balance sm:text-xl">{diagnosis.closing}</p>
        <CtaButton position="raio-x" className="shrink-0">
          {diagnosis.cta}
        </CtaButton>
      </div>
    </Section>
  );
}
