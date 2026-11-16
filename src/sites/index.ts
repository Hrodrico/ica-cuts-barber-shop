import type { SiteConfig } from "@/types/site";
import type { SiteContent } from "@/types/content";
import * as barbershop from "./barbershop/config";
import * as barbershopContent from "./barbershop/content";

export type Site = {
  config: SiteConfig;
  content: SiteContent;
};

/** Sitio de IcaCuts (único negocio de este clon; el id "barbershop" se mantiene para facilitar la sincronización con la base). */
export const sites = {
  barbershop: { config: barbershop.config, content: barbershopContent.content },
} satisfies Record<string, Site>;

type SiteId = keyof typeof sites;

const DEFAULT_SITE: SiteId = "barbershop";

function resolveSite(): Site {
  const id = process.env.SITE_ID ?? DEFAULT_SITE;
  if (!(id in sites)) {
    throw new Error(
      `SITE_ID "${id}" no existe. Opciones: ${Object.keys(sites).join(", ")}`,
    );
  }
  return sites[id as SiteId];
}

export const activeSite = resolveSite();
