import { AiSeo } from "@/components/AiSeo";
import { Commercial } from "@/components/Commercial";
import { Cursor } from "@/components/Cursor";
import { Diagnosis } from "@/components/Diagnosis";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Machine } from "@/components/Machine";
import { Pillars } from "@/components/Pillars";
import { Manifesto, Positioning } from "@/components/Positioning";
import { Problem } from "@/components/Problem";
import { Process } from "@/components/Process";
import { SiteNav } from "@/components/SiteNav";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <JsonLd />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Pular para o conteúdo
      </a>
      <SiteNav />
      <main id="conteudo">
        <Hero />
        <Problem />
        <Machine />
        <Pillars />
        <AiSeo />
        <Commercial />
        <Diagnosis />
        <Process />
        <Positioning />
        <Manifesto />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
      <Cursor />
    </>
  );
}
