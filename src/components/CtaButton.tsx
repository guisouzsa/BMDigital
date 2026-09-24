"use client";

import type { ReactNode } from "react";
import { WHATSAPP_URL } from "@/lib/site";
import { trackWhatsAppClick } from "@/lib/tracking";
import { buttonBase } from "@/lib/ui";
import { ArrowRight } from "./icons";

type Props = {
  /** Posição do CTA na página, enviada nos eventos de rastreamento. */
  position: string;
  children: ReactNode;
  className?: string;
};

// O botão não se desloca: no hover só a cor escurece e a seta avança.
// (O magnetismo que movia o botão inteiro deixava o hover instável.)
export function CtaButton({ position, children, className = "" }: Props) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener"
      data-cta={position}
      onClick={() => trackWhatsAppClick(position)}
      className={`${buttonBase} group/cta bg-brand text-white duration-300 ease-(--ease-soft) hover:bg-brand-hover active:bg-brand-active ${className}`}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 ease-(--ease-soft) group-hover/cta:translate-x-1" />
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </a>
  );
}
