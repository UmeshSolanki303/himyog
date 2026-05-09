import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://matrushaktiyog.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Matru Shakti Yog | Prenatal & Postnatal Yoga Classes",
    template: "%s | Matru Shakti Yog",
  },
  verification: {
    google: "RqWLJbcd0KAPq0xhWf-jORijQK30lnAJww9tih96ikg",
  },
  description:
    "Nurturing your journey through motherhood with prenatal and postnatal yoga. Safe classes for every trimester, baby-and-me sessions, and expert-led information. Find balance, strength, and peace.",
  keywords: [
    "prenatal yoga",
    "postnatal yoga",
    "pregnancy yoga",
    "postpartum yoga",
    "baby and me yoga",
    "motherhood yoga",
    "prenatal classes",
    "postnatal classes",
    "yoga for pregnancy",
    "fourth trimester yoga",
    "matru shakti yog",
  ],
  authors: [{ name: "Matru Shakti Yog" }],
  creator: "Matru Shakti Yog",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Matru Shakti Yog",
    title: "Matru Shakti Yog | Prenatal & Postnatal Health & Yoga",
    description:
      "Nurturing your journey through motherhood with prenatal and postnatal yoga. Find balance, strength, and peace.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Matru Shakti Yog - Prenatal & Postnatal Yoga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matru Shakti Yog | Prenatal & Postnatal Yoga",
    description:
      "Nurturing your journey through motherhood with prenatal and postnatal yoga.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Matru Shakti Yog",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
      description:
        "Prenatal and postnatal yoga classes. Safe, nurturing classes for pregnancy and the fourth trimester.",
      email: "himanidwivedi369@gmail.com",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Matru Shakti Yog",
      description: "Prenatal & Postnatal Health & Yoga",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#prenatal`,
      name: "Prenatal Yoga Classes",
      description:
        "Safe prenatal yoga for every trimester. Gentle movement, breathwork, and preparation for birth.",
      provider: { "@id": `${siteUrl}/#organization` },
      url: `${siteUrl}/prenatal`,
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#postnatal`,
      name: "Postnatal Yoga Classes",
      description:
        "Postpartum recovery yoga. Pelvic floor and core recovery, baby-and-me sessions.",
      provider: { "@id": `${siteUrl}/#organization` },
      url: `${siteUrl}/postnatal`,
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#information-sessions`,
      name: "Pregnancy & Postpartum Information Sessions",
      description:
        "Expert-led sessions on pregnancy, birth, breastfeeding, and the fourth trimester.",
      provider: { "@id": `${siteUrl}/#organization` },
      url: `${siteUrl}/information-sessions`,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col w-full">
        <Header />
        <div className="flex-1 pt-[var(--header-height)]">{children}</div>
      </body>
    </html>
  );
}
