import { manifesto, positioning } from "@/content";
import { Section, SectionHeading } from "./Section";

/** "Para quem é". Título à esquerda; à direita, uma coluna única e alinhada. */
export function Positioning() {
  const { statement } = positioning;
  return (
    <Section navId="como-funciona" tone="light" labelledBy="posicionamento-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
        <SectionHeading
          id="posicionamento-title"
          label={positioning.label}
          title={positioning.title}
          className="lg:col-span-5"
        />

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <dl className="border-b border-ink/12">
            {positioning.profiles.map((profile, i) => (
              <div
                key={profile.tag}
                data-delay={i + 1}
                className="reveal grid grid-cols-1 gap-2 border-t border-ink/12 py-6 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <dt className="label pt-1.5 leading-snug text-brand">{profile.tag}</dt>
                <dd className="leading-relaxed text-subtle">{profile.text}</dd>
              </div>
            ))}
          </dl>

          <p data-delay="3" className="reveal mt-10 text-2xl leading-tight font-bold tracking-[-0.03em] text-balance sm:text-[2rem]">
            {statement.lead} <span className="block text-brand">{statement.after}</span>
          </p>
        </div>
      </div>
    </Section>
  );
}

/** Manifesto curto antes do encerramento. */
export function Manifesto() {
  return (
    <Section navId="contato" tone="white" labelledBy="manifesto-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
        <h2 id="manifesto-title" className="reveal text-title lg:col-span-7">
          {manifesto.title}
        </h2>
        <div className="reveal lg:col-span-4 lg:col-start-9 lg:pt-3">
          <p className="text-lg font-semibold tracking-tight text-brand">{manifesto.kicker}</p>
          <p className="lead mt-5 text-subtle">{manifesto.text}</p>
        </div>
      </div>
    </Section>
  );
}
