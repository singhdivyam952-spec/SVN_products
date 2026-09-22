import type { Metadata } from "next";
import { DM_Sans, Great_Vibes, Playfair_Display } from "next/font/google";
import { SiteChrome } from "@/components/SiteChrome";
import { getSite } from "@/lib/get-site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSite();
  return {
    title: {
      default: `${settings.brand} Wall Hooks & Hangers | ${settings.company}`,
      template: `%s | ${settings.company}`,
    },
    description: settings.description,
    openGraph: {
      title: `${settings.brand} by ${settings.company}`,
      description: settings.description,
      locale: "en_IN",
      type: "website",
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="texture-cream min-h-full flex flex-col text-ink">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
