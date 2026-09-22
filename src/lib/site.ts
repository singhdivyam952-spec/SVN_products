/** Static fallback for client components */

export const siteConfig = {
  brand: "LION",
  company: "SVN PRODUCT",
  tagline: "Built to Last",
  subtitle: "Wall Hooks and Hangers",
  location: "Ludhiana",
  partner: {
    name: "Shubham Kumar",
    role: "Partner, SVN PRODUCT",
  },
  email: "INFO.SVNPRODUCT@GMAIL.COM",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  description:
    "SVN PRODUCT manufactures and supplies LION brand wall hooks, hangers, and household essentials for wholesalers and retailers across India. Premium quality. Wholesale packing. Built to last.",
  catalogueYear: "2026",
} as const;

export function whatsappUrlFrom(phone: string, email: string, message?: string) {
  if (!phone) {
    return `mailto:${email}`;
  }
  const text = encodeURIComponent(
    message ||
      "Hello SVN PRODUCT, I would like to inquire about wholesale pricing for LION products.",
  );
  return `https://wa.me/${phone}?text=${text}`;
}

export function whatsappUrl(message?: string) {
  return whatsappUrlFrom(siteConfig.whatsapp, siteConfig.email, message);
}
