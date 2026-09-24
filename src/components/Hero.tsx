import type { CSSProperties } from "react";
import { hero } from "@/content";
import { buttonBase } from "@/lib/ui";
import { CtaButton } from "./CtaButton";
import { Globe } from "./Globe";
import { Accent, Label } from "./Section";
import { ArrowDown } from "./icons";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section
      id="inicio"
      data-nav="inicio"
      data-tone="dark"
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[max(100svh,40rem)] flex-col overflow-hidden bg-ink text-white lg:justify-center"
    >
      <Globe contentId="hero-content" />

      <div id="hero-content" className="container-page pt-28 sm:pt-32 lg:py-24">
        <div className="max-w-2xl lg:max-w-[52%]">
          <div className="intro" style={delay(80)}>
            <Label dark>{hero.label}</Label>
          </div>
          {/* Revelação editorial: o texto é pintado desde o primeiro quadro (não atrasa o LCP). */}
          <h1 id="hero-title" className="intro-title text-display mt-6" style={delay(150)}>
            <Accent title={hero.title} dark />
          </h1>
          <p className="intro lead mt-6 max-w-md text-white/70" style={delay(320)}>
            {hero.lead}
          </p>

          <div className="intro mt-8 flex flex-col gap-3 sm:flex-row" style={delay(440)}>
            <CtaButton position="hero">{hero.cta}</CtaButton>
            <a
              href="#operacao"
              className={`${buttonBase} border border-white/20 text-white hover:border-white/40 hover:bg-white/5`}
            >
              {hero.secondary}
              <ArrowDown className="bob size-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Espaço do globo no mobile, abaixo do texto */}
      <div aria-hidden="true" className="min-h-44 flex-1 lg:hidden" />
    </section>
  );
}
