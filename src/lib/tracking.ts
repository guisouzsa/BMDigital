declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Dispara os eventos de clique no WhatsApp. Nunca quebra se as tags não existirem. */
export function trackWhatsAppClick(cta_position: string) {
  try {
    window.dataLayer?.push({ event: "whatsapp_click", cta_position });
    window.fbq?.("track", "Contact");
    window.gtag?.("event", "whatsapp_click", { cta_position });
  } catch {
    // Rastreamento nunca deve impedir a abertura do WhatsApp.
  }
}
