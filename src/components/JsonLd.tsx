import { seo } from "@/content";
import { FOUNDER_NAME, SAME_AS, SITE_NAME, SITE_URL, WHATSAPP_PHONE } from "@/lib/site";

// Dados estruturados (WebSite + Organization + Person): ajudam buscadores e IAs a entender
// quem é a BM Digital e a relação com Breno Moreira. Apenas informações verdadeiras.
export function JsonLd() {
  const siteId = `${SITE_URL}/#website`;
  const orgId = `${SITE_URL}/#organization`;
  const personId = `${SITE_URL}/#breno-moreira`;
  const sameAs = SAME_AS.length ? { sameAs: SAME_AS } : {};

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": siteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: seo.description,
        inLanguage: "pt-BR",
        publisher: { "@id": orgId },
      },
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/brand/logo-bm-512.png`,
          width: 512,
          height: 512,
        },
        description: seo.description,
        slogan: seo.tagline,
        founder: { "@id": personId },
        areaServed: { "@type": "Country", name: "Brasil" },
        knowsAbout: [
          "Growth",
          "Estruturação de vendas",
          "Criação de infoprodutos",
          "Tráfego pago",
          "SEO",
          "SEO para inteligências artificiais",
          "Operação comercial",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: WHATSAPP_PHONE,
          availableLanguage: "Portuguese",
        },
        ...sameAs,
      },
      {
        "@type": "Person",
        "@id": personId,
        name: FOUNDER_NAME,
        jobTitle: "Fundador",
        worksFor: { "@id": orgId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
