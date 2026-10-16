import type { Metadata } from "next";

// Single source of truth for page-level SEO: titles, descriptions, and the
// search phrases each page targets. Keep titles ≤ ~60 chars (the root layout
// appends " | Matrushakti Yog") and descriptions ≤ ~160 chars, and lead with
// the phrase people actually type into Google.

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://matrushaktiyog.com";
export const BRAND = "Matrushakti Yog";
export const LOGO_URL = `${siteUrl}/images/logo-bk.png`;
export const DEFAULT_SHARE_IMAGE = "/images/logo-bk.png";
export const INSTAGRAM_URL = "https://www.instagram.com/_matrushakti_yog_/";

// Phrases relevant to the whole business — merged into every page's keywords.
const CORE_KEYWORDS = [
  "matrushakti yog",
  "prenatal yoga",
  "postnatal yoga",
  "pregnancy yoga",
  "prenatal yoga rishikesh",
  "online pregnancy yoga classes india",
];

interface PageSeo {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  image?: string;
}

export function pageMetadata({ path, title, description, keywords, image }: PageSeo): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const images = [{ url: image ?? DEFAULT_SHARE_IMAGE, alt: `${BRAND} — ${title}` }];
  const allKeywords = Array.from(new Set([...keywords, ...CORE_KEYWORDS]));
  return {
    title,
    description,
    keywords: allKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: BRAND,
      url,
      title: `${title} | ${BRAND}`,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${BRAND}`,
      description,
      images: images.map((i) => i.url),
    },
  };
}

export const PAGE_SEO = {
  home: {
    path: "/",
    title: "Prenatal & Postnatal Yoga Classes in Rishikesh & Online",
    description:
      "Expert-led prenatal & postnatal yoga online and in Rishikesh — pregnancy yoga for every trimester, Garbh Sanskar, postpartum recovery & teacher training.",
    keywords: [
      "prenatal yoga classes",
      "pregnancy yoga classes online",
      "postnatal yoga classes",
      "postpartum yoga",
      "garbh sanskar classes",
      "yoga during pregnancy",
      "pregnancy yoga near me",
      "best prenatal yoga in india",
      "yoga for pregnant women",
      "prenatal yoga teacher training rishikesh",
    ],
  },
  prenatal: {
    path: "/prenatal",
    title: "Prenatal Yoga Classes Online & in Rishikesh",
    description:
      "Safe pregnancy yoga for every trimester with an RYT-500 prenatal specialist. Ease back pain, build strength & prepare for labour — online or in Rishikesh.",
    keywords: [
      "prenatal yoga classes",
      "prenatal yoga online",
      "pregnancy yoga online",
      "yoga during pregnancy",
      "yoga for first trimester",
      "yoga for second trimester",
      "yoga for third trimester",
      "yoga for normal delivery",
      "pregnancy exercises",
      "pregnancy yoga for back pain",
      "safe yoga poses during pregnancy",
      "breathing exercises for labour",
    ],
  },
  postnatal: {
    path: "/postnatal",
    title: "Postnatal Yoga for Postpartum Recovery",
    description:
      "Postpartum yoga to heal your pelvic floor & core, support diastasis recti recovery and rebuild strength after normal or C-section birth. Online & Rishikesh.",
    keywords: [
      "postnatal yoga classes",
      "postpartum yoga online",
      "postpartum recovery exercises",
      "yoga after delivery",
      "yoga after c-section",
      "diastasis recti exercises",
      "pelvic floor exercises after birth",
      "postpartum belly exercises",
      "baby and me yoga",
      "mom and baby yoga",
      "fourth trimester recovery",
    ],
  },
  courses: {
    path: "/courses",
    title: "Pregnancy, Fertility & Motherhood Yoga Courses",
    description:
      "Fertility yoga, prenatal yoga, Garbh Sanskar, postnatal recovery, pregnancy retreats, meditation & 200-hour prenatal yoga teacher training. Online & Rishikesh.",
    keywords: [
      "pregnancy yoga course",
      "prenatal yoga course online",
      "garbh sanskar course",
      "fertility yoga",
      "postnatal yoga course",
      "prenatal yoga teacher training",
      "meditation classes online",
    ],
  },
  informationSessions: {
    path: "/information-sessions",
    title: "Pregnancy & Postpartum Information Sessions",
    description:
      "Expert-led childbirth education: labour preparation, breastfeeding, newborn care and the fourth trimester. Practical guidance for expecting and new parents.",
    keywords: [
      "childbirth education classes",
      "antenatal classes online",
      "labour preparation class",
      "breastfeeding class",
      "newborn care class",
      "pregnancy workshop",
      "fourth trimester support",
    ],
  },
  about: {
    path: "/about",
    title: "About Us — Prenatal Yoga Experts in Rishikesh",
    description:
      "Safe, expert-led prenatal & postnatal yoga for every stage from preconception to postpartum — rooted in Rishikesh, the yoga capital of the world.",
    keywords: [
      "prenatal yoga teacher rishikesh",
      "himani dwivedi yoga",
      "pregnancy yoga instructor",
      "yoga school rishikesh",
      "women's yoga rishikesh",
    ],
  },
  contact: {
    path: "/contact",
    title: "Contact Us — Book Prenatal & Postnatal Yoga",
    description:
      "Book a prenatal or postnatal yoga class, Garbh Sanskar program or retreat. Visit us in Muni Ki Reti, Rishikesh, call +91 93899 53873, or join online.",
    keywords: [
      "book prenatal yoga class",
      "prenatal yoga near me",
      "pregnancy yoga rishikesh contact",
      "yoga classes muni ki reti",
    ],
  },
  reviews: {
    path: "/reviews",
    title: "Reviews — What Mothers Say About Our Classes",
    description:
      "Real reviews from mothers who joined our prenatal yoga, postnatal recovery, Garbh Sanskar and retreat programs in Rishikesh and online.",
    keywords: [
      "prenatal yoga reviews",
      "pregnancy yoga testimonials",
      "matrushakti yog reviews",
      "best pregnancy yoga rishikesh",
    ],
  },
  blog: {
    path: "/blog",
    title: "Pregnancy, Postpartum & Motherhood Blog",
    description:
      "Practical articles on prenatal yoga, pregnancy wellness, Garbh Sanskar, postpartum recovery and motherhood from the Matrushakti Yog team.",
    keywords: [
      "pregnancy blog",
      "prenatal yoga tips",
      "postpartum recovery tips",
      "garbh sanskar tips",
      "motherhood blog india",
    ],
  },
} satisfies Record<string, PageSeo>;

// Per-course SEO, keyed by Course.slug. Used by /courses/[slug] and /retreat.
export const COURSE_SEO: Record<string, Omit<PageSeo, "path">> = {
  preconception: {
    title: "Fertility Yoga & Preconception Program",
    description:
      "6-week fertility yoga and preconception program — gentle asanas, breathwork and lifestyle guidance to prepare your body and mind to conceive. Online & Rishikesh.",
    keywords: [
      "fertility yoga",
      "yoga for fertility",
      "yoga to conceive",
      "yoga to get pregnant",
      "preconception yoga",
      "preconception care",
      "trying to conceive",
      "yoga for hormonal balance",
    ],
  },
  "prenatal-yoga": {
    title: PAGE_SEO.prenatal.title,
    description: PAGE_SEO.prenatal.description,
    keywords: PAGE_SEO.prenatal.keywords,
  },
  garbhsamskar: {
    title: "Garbh Sanskar Classes Online & in Rishikesh",
    description:
      "A 12-week Garbh Sanskar program blending yoga, mantra, meditation and Ayurvedic guidance to nurture your baby in the womb. Live online & in Rishikesh.",
    keywords: [
      "garbh sanskar",
      "garbh sanskar classes",
      "garbh sanskar classes online",
      "garbh sanskar course",
      "garbhsanskar",
      "garbha sanskar",
      "garbhsamskar",
      "garbh sanskar mantra",
      "garbh sanskar activities",
      "vedic pregnancy",
    ],
  },
  "postnatal-yoga": {
    title: PAGE_SEO.postnatal.title,
    description: PAGE_SEO.postnatal.description,
    keywords: PAGE_SEO.postnatal.keywords,
  },
  "pregnancy-wellness": {
    title: "Pregnancy Wellness Retreat in Rishikesh",
    description:
      "Pregnancy wellness retreat in Rishikesh: prenatal yoga, birth preparation, breastfeeding & newborn-care sessions and restful time in the Himalayan foothills.",
    keywords: [
      "pregnancy retreat",
      "pregnancy retreat india",
      "prenatal retreat rishikesh",
      "pregnancy yoga retreat",
      "babymoon in rishikesh",
      "babymoon retreat india",
      "wellness retreat for pregnant women",
    ],
  },
  "ttc-course": {
    title: "200-Hour Prenatal & Postnatal Yoga Teacher Training",
    description:
      "Become a certified prenatal & postnatal yoga teacher: 200-hour TTC in Rishikesh or online — anatomy, trimester-safe sequencing and postpartum care.",
    keywords: [
      "prenatal yoga teacher training",
      "prenatal yoga teacher training rishikesh",
      "prenatal yoga certification",
      "prenatal yoga certification online",
      "postnatal yoga teacher training",
      "200 hour yoga teacher training rishikesh",
      "yoga ttc rishikesh",
    ],
  },
  meditation: {
    title: "Meditation & Pranayama Classes Online",
    description:
      "Guided meditation, pranayama and yoga nidra classes for calm, better sleep and emotional balance — for mothers and anyone seeking stillness. Online & Rishikesh.",
    keywords: [
      "meditation classes online",
      "pranayama classes",
      "yoga nidra",
      "meditation during pregnancy",
      "meditation for anxiety",
      "meditation classes rishikesh",
    ],
  },
};
