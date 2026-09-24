import { finalCta } from "@/content";
import { CtaButton } from "./CtaButton";
import { Accent, Section } from "./Section";

export function FinalCta() {
  return (
    <Section id="contato" navId="contato" tone="dark" labelledBy="final-title" className="sm:py-28">
      <div className="reveal max-w-3xl">
        <p className="text-base text-white/70 sm:text-lg">{finalCta.kicker}</p>
        <h2 id="final-title" className="text-title mt-6">
          <Accent title={finalCta.title} dark />
        </h2>
        <p className="lead mt-7 text-white/70">{finalCta.lead}</p>
        <div className="mt-10">
          <CtaButton position="final" className="w-full sm:w-auto">
            {finalCta.cta}
          </CtaButton>
        </div>
      </div>
    </Section>
  );
}
