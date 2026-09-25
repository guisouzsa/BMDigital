import { process } from "@/content";
import { Accent, Label } from "./Section";

// Cor do número de cada etapa: do preto ao azul da marca.
const tones = ["#121419", "#101a2e", "#0d2247", "#0b2d66", "#0a3f9e", "#0a5cff"];

/**
 * "Como trabalhamos" como trilho horizontal (desktop): a seção trava e a rolagem vertical
 * desliza o título e as seis etapas da direita para a esquerda, com uma barra de progresso.
 * Diferente da cena dos pilares (painéis que sobem): aqui o movimento é lateral.
 * Mobile, movimento reduzido ou sem suporte: lista vertical comum, sem trava.
 */
export function Process() {
  return (
    <section
      id="como-funciona"
      data-nav="como-funciona"
      data-tone="light"
      data-size="track"
      aria-labelledby="processo-title"
      className="stage relative scroll-mt-16 bg-white text-ink"
    >
      <div className="stage-sticky relative flex flex-col justify-center overflow-clip">
        <div className="hscroll-track flex flex-col lg:flex-row lg:flex-wrap lg:items-stretch">
          {/* Título: no desktop é o primeiro quadro do trilho */}
          <div className="container-page shrink-0 pt-14 pb-8 sm:pt-20 lg:m-0 lg:flex lg:w-[40vw] lg:max-w-none lg:flex-col lg:justify-center lg:py-0 lg:pr-14 lg:pl-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))]">
            <Label>{process.label}</Label>
            <h2 id="processo-title" className="text-title mt-6">
              <Accent title={process.title} />
            </h2>
            <p aria-hidden="true" className="mt-6 hidden text-sm text-subtle lg:block">
              Role para percorrer as etapas →
            </p>
          </div>

          <ol aria-label="Etapas do trabalho" className="flex flex-col pb-14 sm:pb-20 lg:flex-row lg:flex-wrap lg:pb-0">
            {process.steps.map((item, i) => (
              <li
                key={item.name}
                className="flex items-baseline gap-5 border-t border-ink/10 px-4 py-6 sm:px-6 lg:w-[30vw] lg:min-w-[22rem] lg:flex-col lg:justify-center lg:gap-0 lg:border-t-0 lg:border-l lg:px-10 lg:py-0"
              >
                <span
                  aria-hidden="true"
                  className="text-2xl leading-none font-semibold tracking-[-0.04em] tabular-nums lg:text-[clamp(5rem,4rem+3vw,8rem)]"
                  style={{ color: tones[i] }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="lg:mt-10">
                  <h3 className="text-lg leading-tight font-bold tracking-tight lg:text-3xl">{item.name}</h3>
                  <p className="mt-1 text-subtle lg:mt-3 lg:text-lg">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div aria-hidden="true" className="hidden w-[8vw] shrink-0 lg:block" />
        </div>

        {/* Barra de progresso do trilho */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-1 bg-ink/8 lg:block">
          <div className="hscroll-progress h-full bg-brand" />
        </div>
      </div>
    </section>
  );
}
