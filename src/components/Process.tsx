import { process } from "@/content";
import { Chain } from "./Chain";
import { Section, SectionHeading } from "./Section";

export function Process() {
  return (
    <Section id="como-funciona" navId="como-funciona" tone="white" labelledBy="processo-title">
      <SectionHeading id="processo-title" label={process.label} title={process.title} />
      <div className="mt-10 sm:mt-14">
        <Chain label="Etapas do trabalho" steps={process.steps} numbered highlight="Escala" />
      </div>
    </Section>
  );
}
