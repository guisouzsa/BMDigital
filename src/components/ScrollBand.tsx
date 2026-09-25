import { machine } from "@/content";

/**
 * Faixa entre seções: duas linhas de texto grande que deslizam em sentidos opostos
 * acompanhando a rolagem (CSS scroll-driven, sem JavaScript). Puramente decorativa:
 * as etapas já aparecem na seção "A máquina", por isso fica fora da leitura de tela.
 */
export function ScrollBand() {
  const items = [...machine.chain, "Escala"];
  const line = (key: string) =>
    [0, 1, 2].map((n) => (
      <span key={`${key}-${n}`} className="flex shrink-0 items-center">
        {items.map((item) => (
          <span key={item} className="flex items-center">
            {item}
            <span className="mx-[0.4em] inline-block size-[0.14em] rounded-full bg-current opacity-60" />
          </span>
        ))}
      </span>
    ));

  return (
    <div aria-hidden="true" className="grain relative isolate overflow-clip bg-ink py-10 select-none sm:py-14">
      <div className="band-left flex w-max text-[clamp(2.25rem,1.4rem+4vw,4.75rem)] leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-white">
        {line("a")}
      </div>
      <div className="band-right mt-3 flex w-max text-[clamp(2.25rem,1.4rem+4vw,4.75rem)] leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_var(--color-brand-bright)] sm:mt-4">
        {line("b")}
      </div>
    </div>
  );
}
