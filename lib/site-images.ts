import { courses } from "./courses";

export interface SiteImageSlot {
  key: string;
  label: string;
  description: string;
  group: string;
}

// The full, canonical list of single-image "slots" an admin can replace
// from /admin/site-images — the public pages below fall back to their
// existing default (stock photo or initials) whenever a slot is empty, so
// nothing ever looks broken while real photos are still being gathered.
export const SITE_IMAGE_SLOTS: SiteImageSlot[] = [
  {
    key: "founder-photo",
    label: "Founder — Himani Dwivedi",
    description: "Shown on the About page and the Contact page.",
    group: "Our Team",
  },
  {
    key: "team-specialty-retreat",
    label: "Retreat Facilitation",
    description: "Specialty card photo in the About page's \"Our Team\" section.",
    group: "Our Team",
  },
  {
    key: "team-specialty-meditation",
    label: "Meditation & Mindfulness",
    description: "Specialty card photo in the About page's \"Our Team\" section.",
    group: "Our Team",
  },
  {
    key: "team-specialty-awareness",
    label: "Prenatal & Postnatal Awareness",
    description: "Specialty card photo in the About page's \"Our Team\" section.",
    group: "Our Team",
  },
  {
    key: "retreat-hero",
    label: "Retreat — Hero Image",
    description: "Large banner image at the top of /retreat.",
    group: "Retreat",
  },
  {
    key: "prenatal-hero",
    label: "Prenatal — Hero Image",
    description: "Banner image at the top of /prenatal.",
    group: "Course Pages",
  },
  {
    key: "postnatal-hero",
    label: "Postnatal — Hero Image",
    description: "Banner image at the top of /postnatal.",
    group: "Course Pages",
  },
  // prenatal-yoga, postnatal-yoga, and pregnancy-wellness have their own
  // dedicated hero slots above (same image also used for their course
  // cards) — see getCourseHeroSlotKey.
  ...courses
    .filter((c) => !["pregnancy-wellness", "prenatal-yoga", "postnatal-yoga"].includes(c.slug))
    .map((c) => ({
      key: `course-hero-${c.slug}`,
      label: `${c.title} — Preview / Hero Image`,
      description: "Used on course cards (homepage + courses list) and the course page banner.",
      group: "Course Pages",
    })),
];

export const SITE_IMAGE_SLOT_KEYS = SITE_IMAGE_SLOTS.map((s) => s.key);

// The courses with their own dedicated page reuse that page's hero slot for
// their course-card preview image too, so editing one photo updates both
// places at once.
const DEDICATED_HERO_SLOTS: Record<string, string> = {
  "prenatal-yoga": "prenatal-hero",
  "postnatal-yoga": "postnatal-hero",
  "pregnancy-wellness": "retreat-hero",
};

export function getCourseHeroSlotKey(slug: string): string {
  return DEDICATED_HERO_SLOTS[slug] ?? `course-hero-${slug}`;
}
