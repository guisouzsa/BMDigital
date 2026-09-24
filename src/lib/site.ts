// Configuração central do site. Todo o projeto importa daqui:
// trocar de domínio no futuro = mudar só NEXT_PUBLIC_SITE_URL (ou o padrão abaixo).

// Link único do WhatsApp: todos os CTAs da página usam esta constante.
export const WHATSAPP_URL =
  "https://wa.me/5585981096763?text=Ol%C3%A1%2C%20Breno!%0AEu%20gostaria%20de%20vender%20mais%20na%20internet";

export const WHATSAPP_PHONE = "+55 85 98109-6763";

export const SITE_NAME = "BM Digital";
export const FOUNDER_NAME = "Breno Moreira";
export const SITE_LOCALE = "pt_BR";
export const SITE_DESCRIPTION =
  "A BM Digital é uma assessoria de growth e vendas, liderada por Breno Moreira, que estrutura produtos, aquisição, posicionamento e operação comercial.";

/** Endereço de produção. Se um dia houver domínio próprio, basta definir NEXT_PUBLIC_SITE_URL. */
const PRODUCTION_URL = "https://bmdigitalon.vercel.app";

/** URL pública do site (sempre sem barra no final): canonical, Open Graph, sitemap, robots e JSON-LD. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL).replace(/\/$/, "");

/**
 * Indexação: liberada em produção. Os links de pré-visualização da Vercel (VERCEL_ENV=preview)
 * saem com noindex, para o Google não indexar cópias do site.
 */
export const IS_INDEXABLE = process.env.VERCEL_ENV !== "preview";

/**
 * Google Search Console: código da verificação por "Tag HTML" (valor do content da meta tag).
 * Não é segredo: fica público no HTML. Pode ser substituído pela variável GOOGLE_SITE_VERIFICATION.
 * Não remova depois de verificado: o Google confere a tag periodicamente.
 */
export const GOOGLE_SITE_VERIFICATION =
  process.env.GOOGLE_SITE_VERIFICATION || "RcW_O4aHMcLCW1AEtRV2zOLrUF1T2pB6rrHyo996-OY";

// Perfis oficiais (Instagram, LinkedIn etc.). TODO: dado real — preencher apenas com perfis confirmados.
export const SAME_AS: string[] = [];
