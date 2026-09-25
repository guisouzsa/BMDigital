# BM Digital — Landing page

Landing page da BM Digital, assessoria de growth e vendas. Página única, com todos os CTAs levando ao WhatsApp.

Produção: https://bmdigitalonline.vercel.app

## Stack

Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS 4. Sem bibliotecas de UI ou animação: o globo é Canvas 2D e as animações de scroll são CSS (`animation-timeline`).

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Todos os textos da página | `src/content.ts` |
| Link do WhatsApp, domínio, verificação do Google | `src/lib/site.ts` |
| Cores, tipografia e animações | `src/app/globals.css` |
| SEO (title, description, Open Graph) | `src/app/layout.tsx` |
| Sitemap e robots | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Dados estruturados (JSON-LD) | `src/components/JsonLd.tsx` |
| Favicon, ícones e imagem social | gerados por `node scripts/brand-assets.mjs` |

A pasta `referencias/marca/` guarda o guia de identidade visual e fotos originais. Ela não é publicada no site.

## Variáveis de ambiente

Todas são opcionais (veja `.env.example`):

- `NEXT_PUBLIC_SITE_URL`: domínio do site. Padrão: `https://bmdigitalonline.vercel.app`.
- `GOOGLE_SITE_VERIFICATION`: só para trocar o código do Search Console (o atual já está no código).
- `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`: rastreamento. Cada tag só carrega se a variável existir.

Os links de pré-visualização da Vercel (preview) saem automaticamente com `noindex`.

## Deploy e Google

1. Na Vercel: **Add New → Project → importar `guisouzsa/BMDigital`**. As configurações padrão de Next.js funcionam sem ajuste.
2. Confirme que o domínio do projeto é `bmdigitalonline.vercel.app` (Settings → Domains).
3. No Google Search Console, na propriedade **Prefixo do URL** `https://bmdigitalonline.vercel.app`, clique em **Verificar** (a meta tag já está no site).
4. Em **Sitemaps**, envie `sitemap.xml`.
5. Em **Inspeção de URL**, cole a home e clique em **Solicitar indexação**.
6. Alguns dias depois, pesquise `site:bmdigitalonline.vercel.app` no Google para conferir.
