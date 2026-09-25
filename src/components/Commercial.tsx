import { commercial } from "@/content";
import { CtaButton } from "./CtaButton";
import { Accent, Label, Section } from "./Section";

export function Commercial() {
  return (
    <Section id="comercial" navId="comercial" tone="dark" labelledBy="comercial-title">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Texto fixo enquanto a sequência passa (desktop) */}
        <div className="lg:col-span-5">
          <div className="reveal lg:sticky lg:top-28">
            <Label dark>{commercial.label}</Label>
            <h2 id="comercial-title" className="text-title mt-6">
              <Accent title={commercial.title} dark />
            </h2>
            <div className="mt-8 space-y-2">
              {commercial.intro.map((line) => (
                <p key={line} className="lead text-white/70">
                  {line}
                </p>
              ))}
            </div>
            <ul className="mt-10 space-y-2 border-t border-white/12 pt-8">
              {commercial.principles.map((line) => (
                <li key={line} className="text-base font-medium tracking-tight">
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[0.9375rem] leading-relaxed text-white/65">{commercial.structure}</p>
            <div className="mt-8">
              <CtaButton position="comercial">{commercial.cta}</CtaButton>
            </div>
          </div>
        </div>

        {/* A sequência depois do clique, cada etapa marcada ao passar pela tela */}
        <ol aria-label="Etapas depois do clique" className="relative pl-6 lg:col-span-6 lg:col-start-7">
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-white/12" />
          <span aria-hidden="true" className="flow-y absolute top-0 bottom-0 left-0 w-0">
            <span className="absolute -top-[3px] -left-[3px] size-[7px] rounded-full bg-brand-bright shadow-[0_0_0_3px_rgb(10_92_255/0.15)]" />
          </span>
          {commercial.chain.map((step, i) => {
            const last = i === commercial.chain.length - 1;
            return (
              <li key={step} className="reveal border-t border-white/12 py-3 last:border-b sm:py-5">
                <span
                  className={`text-[clamp(1.25rem,1rem+1.4vw,2.5rem)] leading-none font-semibold tracking-[-0.03em] ${
                    last ? "text-brand-bright" : ""
                  }`}
                >
                  {step}
                </span>
                <div aria-hidden="true" className="mt-2 h-px sm:mt-3">
                  <div className={`mark-x h-px ${last ? "bg-brand-bright" : "bg-white/35"}`} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
