import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Página única: o sitemap lista apenas a URL real e indexável do site.
// As âncoras (#operacao, #breno...) não são URLs próprias e não entram aqui.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
