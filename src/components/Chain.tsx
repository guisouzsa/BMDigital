import type { CSSProperties } from "react";

type Step = { name: string; text?: string };

type Props = {
  steps: Step[];
  /** Etapa destacada em azul (ex.: "Venda"). */
  highlight?: string;
  dark?: boolean;
  numbered?: boolean;
  /** Mostra um "lead" percorrendo a linha até a venda. */
  flow?: boolean;
  label: string;
};

/**
 * Sequência de etapas ligadas por uma linha que se constrói durante o scroll.
 * Mobile: vertical. Desktop: horizontal, uma coluna por etapa.
 */
export function Chain({ steps, highlight, dark = false, numbered = false, flow = false, label }: Props) {
  const line = dark ? "bg-white/15" : "bg-ink/12";
  const progress = dark ? "bg-brand-bright" : "bg-brand";
  const cols = { 6: "lg:grid-cols-6", 7: "lg:grid-cols-7" }[steps.length] ?? "lg:grid-cols-6";

  return (
    <ol aria-label={label} className={`draw-scope relative grid grid-cols-1 gap-8 ${cols} lg:gap-0`}>
      {/* Trilho + progresso: vertical no mobile, horizontal no desktop */}
      <span aria-hidden="true" className={`absolute top-2 bottom-2 left-[5px] w-px lg:hidden ${line}`} />
      <span aria-hidden="true" className={`draw-y absolute top-2 bottom-2 left-[5px] w-px lg:hidden ${progress}`} />
      <span aria-hidden="true" className={`absolute top-[5px] right-0 left-0 hidden h-px lg:block ${line}`} />
      <span aria-hidden="true" className={`draw-x absolute top-[5px] right-0 left-0 hidden h-px lg:block ${progress}`} />
      {flow && (
        <>
          <span aria-hidden="true" className="flow-y absolute top-2 bottom-2 left-[5px] w-0 lg:hidden">
            <span className={`absolute -top-[3px] -left-[3px] size-[7px] rounded-full ${dark ? "bg-brand-bright" : "bg-brand"} shadow-[0_0_0_3px_rgb(10_92_255/0.15)]`} />
          </span>
          <span aria-hidden="true" className="flow-x absolute top-[5px] right-0 left-0 hidden h-0 lg:block">
            <span className={`absolute -top-[3px] -left-[3px] size-[7px] rounded-full ${dark ? "bg-brand-bright" : "bg-brand"} shadow-[0_0_0_3px_rgb(10_92_255/0.15)]`} />
          </span>
        </>
      )}

      {steps.map((step, i) => {
        const isHighlight = step.name === highlight;
        // Janela de rolagem em que esta etapa fica em foco (acompanha a linha de progresso)
        const slice = 32 / steps.length;
        const focus = {
          "--from": `${24 + i * slice}%`,
          "--to": `${24 + (i + 1) * slice}%`,
          "--dot-on": dark ? "var(--color-brand-bright)" : "var(--color-brand)",
        } as CSSProperties;
        return (
          <li key={step.name} className="reveal relative pl-8 lg:pr-6 lg:pl-0">
            <span
              aria-hidden="true"
              style={focus}
              className={`step-dot absolute top-0 left-0 size-[11px] rounded-full border ${
                isHighlight
                  ? dark
                    ? "border-brand-bright bg-brand-bright"
                    : "border-brand bg-brand"
                  : dark
                    ? "border-white/40 bg-ink"
                    : "border-ink/30 bg-white"
              }`}
            />
            <div className="lg:mt-8">
              {numbered && (
                <p className={`text-xs tabular-nums ${dark ? "text-white/60" : "text-subtle"}`}>{String(i + 1).padStart(2, "0")}</p>
              )}
              <p
                className={`text-base leading-tight font-semibold tracking-tight sm:text-lg ${numbered ? "mt-2" : ""} ${
                  isHighlight ? (dark ? "text-brand-bright" : "text-brand") : ""
                }`}
              >
                {step.name}
              </p>
              {step.text && (
                <p className={`mt-1.5 text-sm leading-snug ${dark ? "text-white/65" : "text-subtle"}`}>{step.text}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
