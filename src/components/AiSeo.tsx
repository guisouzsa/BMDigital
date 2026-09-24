import { aiSeo } from "@/content";
import { Section, SectionHeading } from "./Section";

export function AiSeo() {
  return (
    <Section id="seo-ia" navId="seo-ia" tone="white" labelledBy="seo-ia-title">
      <SectionHeading id="seo-ia-title" label={aiSeo.label} title={aiSeo.title} />

      <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-10">
        <div className="reveal space-y-5 lg:col-span-4">
          <p className="lead text-subtle">{aiSeo.before}</p>
          <p className="lead text-ink">{aiSeo.now}</p>
        </div>

        {/* A pergunta, em destaque editorial */}
        <div data-delay="1" className="reveal lg:col-span-7 lg:col-start-6">
          <p className="text-sm text-subtle">{aiSeo.askIntro}</p>
          <blockquote className="mt-4 border-l-2 border-brand pl-6 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-balance">
            “{aiSeo.question}”
          </blockquote>
          <p data-delay="2" className="reveal mt-5 text-lg font-semibold tracking-tight text-brand">{aiSeo.askOutro}</p>
        </div>
      </div>

      <div className="reveal mt-12 grid grid-cols-1 gap-6 border-t border-ink/12 pt-8 sm:mt-16 lg:grid-cols-12 lg:gap-10">
        <p className="lead text-subtle lg:col-span-6">{aiSeo.closing}</p>
        <ul aria-label="Onde as pesquisas acontecem" className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:col-span-5 lg:col-start-8 lg:justify-end">
          {aiSeo.references.map((ref) => (
            <li key={ref} className="label text-subtle">
              {ref}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
