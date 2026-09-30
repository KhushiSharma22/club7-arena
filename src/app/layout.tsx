import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import SiteHeader from "@/components/site/SiteHeader";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import "./globals.css";

// DISPLAY — condensed, athletic, poster/stadium-signage weight.
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// BODY/UI — clean grotesk, carries anything that needs to be read.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://club7-arena.vercel.app";
const SITE_NAME = "Club 7 Arena";
const SITE_DESCRIPTION =
  "Box cricket, 7-a-side football, pickleball, cricket academy and cafe. Open 24 hours in Sector 89, Faridabad.";
// Real venue photography, not a designed OG card — matches how the
// site itself never fabricates imagery.
const OG_IMAGE = "/venue/night-aerial.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Club 7 Arena — Sector 89, Faridabad",
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Club 7 Arena",
    "box cricket Faridabad",
    "football turf Sector 89",
    "pickleball Faridabad",
    "cricket academy Faridabad",
    "sports venue Sector 89 Faridabad",
  ],
  openGraph: {
    title: "Club 7 Arena — Sector 89, Faridabad",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1600, height: 1067, alt: "Club 7's floodlit turf complex at night" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Club 7 Arena — Sector 89, Faridabad",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/**
 * Structured data for the one real-world fact set the site already
 * makes visible everywhere (name, location, sports, 24-hour opening)
 * — nothing here that isn't already a claim on the page itself. No
 * phone/geo/price: none exist anywhere in the project to encode.
 */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sector 89",
    addressLocality: "Faridabad",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  sport: ["Cricket", "Football", "Pickleball"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-c7-bg-1 text-c7-ink font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        <SiteHeader />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
