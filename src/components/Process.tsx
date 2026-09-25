import type { CSSProperties } from "react";
import { process } from "@/content";
import { Section, SectionHeading } from "./Section";

// Do preto ao azul da marca, etapa a etapa.
const tones = ["#121419", "#101a2e", "#0d2247", "#0b2d66", "#0a3f9e", "#0a5cff"];

/**
 * "Como trabalhamos" como cena curta (desktop): seis colunas que sobem em escada,
 * cada uma mais alta que a anterior, até a Escala. Mesma linguagem da cena dos pilares,
 * mais contida (sem palavra de fundo). Mobile: linhas compactas com a mesma progressão de cor.
 */
export function Process() {
  const n = process.steps.length;
  const step = 70 / n;

  return (
    <>
      <Section id="como-funciona" navId="como-funciona" tone="white" labelledBy="processo-title" className="pb-10! sm:pb-14!">
        <SectionHeading id="processo-title" label={process.label} title={process.title} />
      </Section>

      <div data-nav="como-funciona" data-tone="light" data-size="short" className="stage relative bg-white">
        <div className="stage-sticky relative overflow-clip">
          <ol aria-label="Etapas do trabalho" className="grid h-full grid-cols-1 lg:grid-cols-6 lg:items-end">
            {process.steps.map((item, i) => {
              const vars = {
                "--from": `${6 + i * step}%`,
                "--to": `${6 + (i + 1) * step}%`,
                "--content-from": `${10 + i * step}%`,
                "--content-to": `${6 + (i + 1) * step + 4}%`,
                // Altura da coluna (desktop): cresce a cada etapa (38% → 86%, sem passar por baixo do menu)
                "--h": `${38 + i * (48 / (n - 1))}%`,
                backgroundColor: tones[i],
              } as CSSProperties;
              return (
                <li
                  key={item.name}
                  style={vars}
                  className="stage-panel flex flex-col justify-start px-5 py-6 text-white sm:px-8 lg:h-(--h) lg:border-l lg:border-white/10 lg:px-6 lg:py-8 lg:first:border-l-0"
                >
                  <div className="stage-panel-content flex items-baseline gap-4 lg:block">
                    <p aria-hidden="true" className="text-sm font-medium text-white tabular-nums lg:text-base">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <h3 className="text-lg leading-tight font-bold tracking-tight lg:mt-6 lg:text-2xl">{item.name}</h3>
                      <p className="mt-1 text-sm leading-snug text-white lg:mt-2">{item.text}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}
