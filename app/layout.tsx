import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/Header";
import { FloatingWriteReviewButton } from "@/components/WriteReviewButton";
import { courses, getCourseUrl } from "@/lib/courses";
import { COURSE_SEO, LOGO_URL, INSTAGRAM_URL, DEFAULT_SHARE_IMAGE } from "@/lib/seo";
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

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: `${bp}/images/logo.jpeg`,
    apple: `${bp}/images/logo.jpeg`,
    shortcut: `${bp}/images/logo.jpeg`,
  },
  title: {
    default: "Matrushakti Yog | Prenatal & Postnatal Yoga in Rishikesh & Online",
    template: "%s | Matrushakti Yog",
  },
  verification: {
    google: "RqWLJbcd0KAPq0xhWf-jORijQK30lnAJww9tih96ikg",
  },
  description:
    "Expert-led prenatal & postnatal yoga online and in Rishikesh — pregnancy yoga for every trimester, Garbh Sanskar, postpartum recovery & teacher training.",
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
    "garbh sanskar",
    "prenatal yoga rishikesh",
    "pregnancy yoga online india",
    "prenatal yoga teacher training",
    "matrushakti yog",
  ],
  authors: [{ name: "Matrushakti Yog" }],
  creator: "Matrushakti Yog",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Matrushakti Yog",
    title: "Matrushakti Yog | Prenatal & Postnatal Yoga in Rishikesh & Online",
    description:
      "Expert-led prenatal & postnatal yoga, Garbh Sanskar and pregnancy retreats — live online across India and in Rishikesh.",
    images: [{ url: DEFAULT_SHARE_IMAGE, alt: "Matrushakti Yog — Prenatal & Postnatal Yoga" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matrushakti Yog | Prenatal & Postnatal Yoga in Rishikesh & Online",
    description:
      "Expert-led prenatal & postnatal yoga, Garbh Sanskar and pregnancy retreats — online and in Rishikesh.",
    images: [DEFAULT_SHARE_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${siteUrl}/#organization`,
      name: "Matrushakti Yog",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
      image: LOGO_URL,
      description:
        "Prenatal and postnatal yoga studio in Rishikesh offering pregnancy yoga, Garbh Sanskar, postpartum recovery, pregnancy retreats and prenatal yoga teacher training — in person and live online across India.",
      email: "matrushaktiyog@gmail.com",
      telephone: "+91-93899-53873",
      address: {
        "@type": "PostalAddress",
        streetAddress: "14 Bigha, Muni Ki Reti",
        addressLocality: "Rishikesh",
        addressRegion: "Uttarakhand",
        postalCode: "249137",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "City", name: "Rishikesh" },
        { "@type": "Country", name: "India" },
      ],
      knowsAbout: [
        "Prenatal yoga",
        "Postnatal yoga",
        "Garbh Sanskar",
        "Fertility yoga",
        "Postpartum recovery",
        "Prenatal yoga teacher training",
        "Meditation",
      ],
      sameAs: [INSTAGRAM_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Matrushakti Yog",
      description: "Prenatal & postnatal yoga in Rishikesh and online",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-IN",
    },
    ...courses.map((course) => ({
      "@type": "Service",
      "@id": `${siteUrl}/#${course.slug}`,
      name: COURSE_SEO[course.slug]?.title ?? course.title,
      description: course.shortDescription,
      serviceType: course.title,
      areaServed: { "@type": "Country", name: "India" },
      provider: { "@id": `${siteUrl}/#organization` },
      url: `${siteUrl}${getCourseUrl(course.slug)}`,
    })),
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
    <html lang="en-IN" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col w-full">
        <Header />
        <div className="flex-1 pt-[var(--header-height)]">{children}</div>
        <FloatingWriteReviewButton />
      </body>
    </html>
  );
}
