import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { seo } from "@/content";
import { FOUNDER_NAME, GOOGLE_SITE_VERIFICATION, IS_INDEXABLE, SITE_DESCRIPTION, SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Inter: substituta web da SF Pro Display do guia de marca.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Ícones: gerados por arquivo em src/app (favicon.ico, icon.svg, icon.png, apple-icon.png).
// Imagem social: src/app/opengraph-image.png e twitter-image.png.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Página interna futura: title "Sobre" vira "Sobre | BM Digital"
  title: { default: seo.title, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: FOUNDER_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: "/",
    siteName: SITE_NAME,
    title: seo.title,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: SITE_DESCRIPTION,
  },
  robots: IS_INDEXABLE
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
    : { index: false, follow: false },
  formatDetection: { telephone: false },
  // Google Search Console (verificação por Tag HTML). Não remover após a verificação.
  verification: { google: GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B0B0D",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
