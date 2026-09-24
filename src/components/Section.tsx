import type { ReactNode } from "react";
import type { NavId, Title } from "@/content";

type Tone = "light" | "white" | "dark";

const tones: Record<Tone, string> = {
  light: "bg-surface text-ink",
  white: "bg-white text-ink",
  dark: "grain bg-ink text-white",
};

type SectionProps = {
  id?: string;
  /** Item da navegação que fica ativo enquanto esta seção está na tela. */
  navId?: NavId;
  tone?: Tone;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, navId, tone = "light", labelledBy, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      data-nav={navId}
      data-tone={tone === "dark" ? "dark" : "light"}
      aria-labelledby={labelledBy}
      className={`relative isolate scroll-mt-16 overflow-clip py-16 sm:py-24 ${tones[tone]} ${className}`}
    >
      <div className="container-page relative z-10">{children}</div>
    </section>
  );
}

/** Título com a assinatura da marca: a parte final em azul. */
export function Accent({ title, dark = false }: { title: Title; dark?: boolean }) {
  return (
    <>
      {title.lead} <span className={dark ? "text-brand-bright" : "text-brand"}>{title.accent}</span>
    </>
  );
}

export function Label({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`label flex items-center gap-3 ${dark ? "text-muted" : "text-subtle"}`}>
      <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-brand-bright" : "bg-brand"}`} />
      {children}
    </p>
  );
}

type HeadingProps = {
  id: string;
  label: string;
  title: Title;
  lead?: string;
  dark?: boolean;
  className?: string;
};

export function SectionHeading({ id, label, title, lead, dark = false, className = "" }: HeadingProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <div className="reveal">
        <Label dark={dark}>{label}</Label>
        <h2 id={id} className="text-title mt-6">
          <Accent title={title} dark={dark} />
        </h2>
      </div>
      {lead && (
        <p data-delay="1" className={`reveal lead mt-6 ${dark ? "text-white/70" : "text-subtle"}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
