"use client";

import { floatLabel } from "@/content";
import { WHATSAPP_URL } from "@/lib/site";
import { trackWhatsAppClick } from "@/lib/tracking";
import { WhatsApp } from "./icons";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener"
      data-cta="flutuante"
      onClick={() => trackWhatsAppClick("flutuante")}
      aria-label={`${floatLabel} (abre em nova aba)`}
      className="float-in group/wa fixed right-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 inline-flex size-12 sm:size-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-black/25 transition-[background-color,scale,box-shadow] duration-300 ease-(--ease-soft) hover:scale-105 hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/25 active:scale-100 active:bg-brand-active sm:right-6 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]"
    >
      <WhatsApp className="size-6 sm:size-6.5" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full mr-3 hidden translate-x-1 rounded-full bg-ink px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-[opacity,translate] duration-300 ease-(--ease-soft) group-hover/wa:translate-x-0 group-hover/wa:opacity-100 lg:block"
      >
        {floatLabel}
      </span>
    </a>
  );
}
