import { machine } from "@/content";
import { Chain } from "./Chain";
import { Accent, Label, Section } from "./Section";

export function Machine() {
  return (
    <Section navId="operacao" tone="white" labelledBy="maquina-title">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Título fixo enquanto as frases passam (desktop) */}
        <div className="lg:col-span-5">
          <div className="reveal lg:sticky lg:top-28">
            <Label>{machine.label}</Label>
            <h2 id="maquina-title" className="text-title mt-6">
              <Accent title={machine.title} />
            </h2>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="space-y-5 sm:space-y-6">
            {machine.lines.map((line, i) => (
              <li key={line} data-delay={Math.min(i, 3)} className="reveal text-lg leading-snug font-medium tracking-tight text-ink/85 sm:text-xl">
                {line}
              </li>
            ))}
          </ul>
          <p className="reveal lead mt-8 border-t border-ink/12 pt-8 text-subtle">{machine.closing}</p>
        </div>
      </div>

      <div className="mt-14 sm:mt-20">
        <Chain label="Etapas da operação" steps={machine.chain.map((name) => ({ name }))} highlight="Venda" flow />
      </div>
    </Section>
  );
}
