import { problem } from "@/content";
import { Section, SectionHeading } from "./Section";

export function Problem() {
  return (
    <Section id="operacao" navId="operacao" tone="light" labelledBy="problema-title">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <SectionHeading
          id="problema-title"
          label={problem.label}
          title={problem.title}
          lead={problem.intro}
          className="lg:col-span-5"
        />

        {/* A cadeia e os pontos onde ela quebra */}
        <ol className="lg:col-span-6 lg:col-start-7">
          {problem.breaks.map((item) => (
            <li key={item.cause} className="reveal border-t border-ink/12 py-5 last:border-b">
              <p>
                <span className="block text-[0.9375rem] text-subtle">{item.cause}</span>
                <span className="mt-1 block text-lg leading-snug font-semibold tracking-tight sm:text-xl">{item.effect}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>

      <p className="reveal mt-12 max-w-3xl text-xl leading-snug font-semibold tracking-tight text-balance sm:mt-16 sm:text-2xl">
        {problem.closing}
      </p>
    </Section>
  );
}
