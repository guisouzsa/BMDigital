import type { CSSProperties } from "react";
import { pillars } from "@/content";
import { Section, SectionHeading } from "./Section";

// Tons dos painéis: do preto ao azul da marca, acompanhando a jornada (construção → venda).
const tones = ["bg-[#111318]", "bg-[#0b1f4d]", "bg-brand"];

/**
 * Os três pilares como uma "cena" (desktop): a tela trava e três painéis verticais
 * se revelam de baixo para cima, um após o outro, sobre a palavra "Operação" ao fundo.
 * Mobile, movimento reduzido ou navegador sem suporte: os painéis aparecem empilhados.
 */
export function Pillars() {
  return (
    <>
      <Section id="pilares" navId="pilares" tone="light" labelledBy="pilares-title" className="pb-10! sm:pb-14!">
        <SectionHeading id="pilares-title" label={pillars.label} title={pillars.title} />
      </Section>

      <div data-nav="pilares" data-tone="dark" className="stage relative bg-ink text-white">
        <div className="stage-sticky relative overflow-clip">
          {/* Palavra gigante ao fundo, visível antes de os painéis cobrirem a tela */}
          <p
            aria-hidden="true"
            className="stage-word pointer-events-none absolute inset-x-0 top-1/2 hidden text-center text-[18vw] leading-none font-bold tracking-[-0.06em] text-transparent select-none [-webkit-text-stroke:1px_rgb(255_255_255/0.12)] lg:block"
            style={{ transform: "translateY(-50%)" }}
          >
            Operação
          </p>

          <div className="relative grid h-full grid-cols-1 lg:grid-cols-3">
            {pillars.items.map((item, i) => {
              const step = 22;
              const vars = {
                "--from": `${6 + i * step}%`,
                "--to": `${6 + i * step + step}%`,
                "--content-from": `${14 + i * step}%`,
                "--content-to": `${6 + (i + 1) * step + 6}%`,
              } as CSSProperties;
              return (
                <article
                  key={item.number}
                  aria-labelledby={`pilar-${item.number}`}
                  style={vars}
                  className={`stage-panel flex flex-col justify-end px-5 py-12 sm:px-8 sm:py-16 lg:border-l lg:border-white/10 lg:px-10 lg:py-16 lg:first:border-l-0 ${tones[i]}`}
                >
                  <div className="stage-panel-content">
                    <p aria-hidden="true" className="text-[clamp(3rem,2rem+3vw,5rem)] leading-none font-semibold tracking-[-0.05em] text-white/90 tabular-nums">
                      {item.number}
                    </p>
                    <p className="label mt-8 text-white">{item.pillar}</p>
                    <h3 id={`pilar-${item.number}`} className="mt-3 text-3xl leading-none font-bold tracking-[-0.03em] sm:text-4xl">
                      {item.name}
                    </h3>
                    <p className="mt-5 max-w-sm leading-relaxed text-white">{item.text}</p>
                    <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/15 pt-5 text-sm text-white">
                      {item.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
