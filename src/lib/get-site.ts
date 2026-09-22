import "server-only";

import { getSettings } from "@/lib/store";
import { siteConfig, whatsappUrlFrom } from "@/lib/site";

export async function getSite() {
  const s = await getSettings();
  return {
    brand: s.brand,
    company: s.company,
    tagline: s.tagline,
    subtitle: s.subtitle,
    location: s.location,
    partner: {
      name: s.partnerName,
      role: s.partnerRole,
    },
    email: s.email,
    whatsapp: s.whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    description: s.description || siteConfig.description,
    catalogueYear: s.catalogueYear,
  };
}

export { whatsappUrlFrom };
