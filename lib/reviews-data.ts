export interface Review {
  id: string;
  name: string;
  city?: string;
  state: string;
  country: string;
  courseSlug:
    | "preconception"
    | "prenatal-yoga"
    | "garbhsamskar"
    | "postnatal-yoga"
    | "pregnancy-wellness"
    | "ttc-course"
    | "meditation";
  courseTitle: string;
  rating: number;
  text: string;
  photo?: string;
  date: string;
  initials: string;
}

// Prenatal/postnatal reviewers are addressed as "Mother"; everyone else
// (preconception, garbhsamskar, wellness, TTC, meditation) is addressed as "Student".
export function reviewerLabel(
  courseSlug: Review["courseSlug"],
): "Mother" | "Student" {
  return courseSlug === "prenatal-yoga" || courseSlug === "postnatal-yoga"
    ? "Mother"
    : "Student";
}

// Combines city + state + country into a single display string, gracefully
// dropping city when it wasn't provided.
export function formatLocation(review: Pick<Review, "city" | "state" | "country">): string {
  return [review.city, review.state, review.country].filter(Boolean).join(", ");
}

export const COURSE_OPTIONS: { slug: Review["courseSlug"]; title: string }[] = [
  { slug: "preconception", title: "Preconception" },
  { slug: "prenatal-yoga", title: "Prenatal" },
  { slug: "garbhsamskar", title: "Garbhsamskar" },
  { slug: "postnatal-yoga", title: "Postnatal" },
  { slug: "pregnancy-wellness", title: "Pregnancy Wellness Retreat" },
  { slug: "ttc-course", title: "TTC Yoga" },
  { slug: "meditation", title: "Meditation" },
];

export const COURSES = [
  { slug: "all", label: "All Reviews", short: "All" },
  { slug: "preconception", label: "Preconception", short: "Preconception" },
  { slug: "prenatal-yoga", label: "Prenatal", short: "Prenatal" },
  { slug: "garbhsamskar", label: "Garbhsamskar", short: "Garbhsamskar" },
  { slug: "postnatal-yoga", label: "Postnatal", short: "Postnatal" },
  {
    slug: "pregnancy-wellness",
    label: "Pregnancy Wellness Retreat",
    short: "Wellness",
  },
  { slug: "ttc-course", label: "TTC Yoga", short: "TTC" },
  { slug: "meditation", label: "Meditation", short: "Meditation" },
];

export const COURSE_META: Record<
  Review["courseSlug"],
  { badge: string; dot: string; title: string }
> = {
  preconception: {
    badge: "bg-gold-50 text-gold-500 border border-gold-100",
    dot: "bg-gold-300",
    title: "Preconception",
  },
  "prenatal-yoga": {
    badge: "bg-sage-100 text-sage-700 border border-sage-200",
    dot: "bg-sage-500",
    title: "Prenatal",
  },
  garbhsamskar: {
    badge: "bg-peach-50 text-peach-400 border border-peach-100",
    dot: "bg-peach-200",
    title: "Garbhsamskar",
  },
  "postnatal-yoga": {
    badge: "bg-warm-sage-100 text-warm-sage-600 border border-warm-sage-200",
    dot: "bg-warm-sage-400",
    title: "Postnatal",
  },
  "pregnancy-wellness": {
    badge: "bg-gold-100 text-gold-600 border border-gold-200",
    dot: "bg-gold-400",
    title: "Pregnancy Wellness Retreat",
  },
  "ttc-course": {
    badge: "bg-peach-100 text-peach-400 border border-peach-300",
    dot: "bg-peach-300",
    title: "TTC Yoga",
  },
  meditation: {
    badge: "bg-sage-50 text-sage-500 border border-sage-100",
    dot: "bg-sage-300",
    title: "Meditation",
  },
};

export const seedReviews: Review[] = [
  //   {
  //     id: "seed-1",
  //     name: "Himakshi Vyas",
  //     city: "Udaipur",
  //     state: "Rajsthan",
  //     courseSlug: "ttc-course",
  //     courseTitle: "Prenatal-Postnatal TTC",
  //     rating: 5,
  //     text: `To Himani Ma'am 🙏
  // I just wanted to take a moment to express my deepest gratitude to you. You have been truly incredible, and in ways you may not even realize, you have helped me grow and heal during a time when I needed it the most.Your guidance, calm presence, and positive energy have brought so much peace and strength into my life. Even without knowing everything I was going through, you made a difference that I will always carry with me.
  // I also humbly seek your blessings for something very important in my life. Your blessings mean a lot to me, and I truly believe in your positive energy.
  // Thank you once again for being such a beautiful soul and an inspiring teacher.
  // With heartfelt gratitude`,
  //     photo:
  //       "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
  //     date: "2026-04-10",
  //     initials: "HV",
  //   },
  // {
  //   id: "seed-2",
  //   name: "Ananya Patel",
  //   city: "Ahmedabad",
  //   state: "Gujarat",
  //   courseSlug: "postnatal-yoga",
  //   courseTitle: "Postnatal Yoga",
  //   rating: 5,
  //   text: "After my C-section I was scared to exercise, but the postnatal sessions were perfectly adapted. Within six weeks my core strength returned and the baby-and-me classes made bonding so joyful. I cannot recommend this enough for new mamas.",
  //   photo: undefined,
  //   date: "2024-10-28",
  //   initials: "AP",
  // },
  // {
  //   id: "seed-3",
  //   name: "Meera Krishnan",
  //   city: "Bengaluru",
  //   state: "Karnataka",
  //   courseSlug: "pregnancy-wellness",
  //   courseTitle: "Pregnancy Wellness",
  //   rating: 5,
  //   text: "The information sessions were an absolute treasure. I went into my birth feeling genuinely prepared — the breathwork techniques they taught me made such a difference during labour. My husband and I both attended and it brought us so close as a couple preparing for parenthood.",
  //   photo:
  //     "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
  //   date: "2024-10-15",
  //   initials: "MK",
  // },
  // {
  //   id: "seed-4",
  //   name: "Sunita Rao",
  //   city: "Hyderabad",
  //   state: "Telangana",
  //   courseSlug: "prenatal-yoga",
  //   courseTitle: "Prenatal Yoga",
  //   rating: 4,
  //   text: "Wonderful classes, very gentle and safe. The instructor always checked in on us individually and offered alternatives if a pose was uncomfortable. The online format worked beautifully — I could join from home in my second trimester when commuting became hard.",
  //   photo: undefined,
  //   date: "2024-09-20",
  //   initials: "SR",
  // },
  // {
  //   id: "seed-5",
  //   name: "Kavitha Nair",
  //   city: "Kochi",
  //   state: "Kerala",
  //   courseSlug: "postnatal-yoga",
  //   courseTitle: "Postnatal Yoga",
  //   rating: 5,
  //   text: "I was struggling with postpartum anxiety and these classes became my sanctuary every week. The breathwork, the community of other new mums, and the non-judgemental space — it genuinely changed my fourth trimester experience. My pelvic floor recovery was so much faster than I expected.",
  //   photo:
  //     "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
  //   date: "2024-09-05",
  //   initials: "KN",
  // },
  // {
  //   id: "seed-6",
  //   name: "Ritu Agarwal",
  //   city: "New Delhi",
  //   state: "Delhi",
  //   courseSlug: "pregnancy-wellness",
  //   courseTitle: "Pregnancy Wellness",
  //   rating: 4,
  //   text: "Extremely informative sessions covering everything from nutrition to breastfeeding and newborn care. The lactation guidance alone was worth the enrolment. I referred three of my friends here immediately after my first session — that is how valuable it was.",
  //   photo: undefined,
  //   date: "2024-08-18",
  //   initials: "RA",
  // },
  // {
  //   id: "seed-7",
  //   name: "Deepika Singh",
  //   city: "Pune",
  //   state: "Maharashtra",
  //   courseSlug: "prenatal-yoga",
  //   courseTitle: "Prenatal Yoga",
  //   rating: 5,
  //   text: "From week 10 to delivery I attended every single class. The pelvic floor awareness I built here made my labour so much smoother — my midwife was genuinely impressed. The instructor has this rare gift of making every mother feel seen and celebrated. Truly sacred.",
  //   photo:
  //     "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
  //   date: "2024-08-02",
  //   initials: "DS",
  // },
  // {
  //   id: "seed-8",
  //   name: "Lakshmi Venkat",
  //   city: "Chennai",
  //   state: "Tamil Nadu",
  //   courseSlug: "postnatal-yoga",
  //   courseTitle: "Postnatal Yoga",
  //   rating: 5,
  //   text: "After twins my body was exhausted and I had diastasis recti. The postnatal programme was so thoughtfully designed — no pressure, just steady rebuilding. Six months later I feel stronger than before my pregnancy. The community of mothers in this group became my closest support circle.",
  //   photo: undefined,
  //   date: "2024-07-14",
  //   initials: "LV",
  // },
  // {
  //   id: "seed-9",
  //   name: "Nisha Joshi",
  //   city: "Jaipur",
  //   state: "Rajasthan",
  //   courseSlug: "prenatal-yoga",
  //   courseTitle: "Prenatal Yoga",
  //   rating: 5,
  //   text: "I was nervous joining yoga for the first time while pregnant but the welcome I received was so warm. Every class left me calmer and more confident. The yoga nidra sessions at the end were magical — I always slept so well afterward. My baby is now 4 months and I truly believe these classes helped both of us.",
  //   photo: undefined,
  //   date: "2024-07-01",
  //   initials: "NJ",
  // },
  // {
  //   id: "seed-10",
  //   name: "Pooja Gupta",
  //   city: "Lucknow",
  //   state: "Uttar Pradesh",
  //   courseSlug: "pregnancy-wellness",
  //   courseTitle: "Pregnancy Wellness",
  //   rating: 5,
  //   text: "The live Q&A sessions with the healthcare professionals were incredibly reassuring. As a first-time mother I had so many questions and every one of them was answered with patience and evidence-based information. I felt genuinely empowered going into my birth journey.",
  //   photo:
  //     "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  //   date: "2024-06-10",
  //   initials: "PG",
  // },
  // {
  //   id: "seed-11",
  //   name: "Swati Kulkarni",
  //   city: "Nashik",
  //   state: "Maharashtra",
  //   courseSlug: "ttc-course",
  //   courseTitle: "Yoga Teacher Training (TTC)",
  //   rating: 5,
  //   text: "The TTC was a life-changing experience. The depth of knowledge — from prenatal anatomy to trauma-informed teaching — was extraordinary. I now run my own prenatal yoga classes with complete confidence. The mentorship and supervised practice hours were invaluable. I could not have asked for a more thorough or compassionate training.",
  //   photo:
  //     "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&q=80",
  //   date: "2024-05-20",
  //   initials: "SK",
  // },
  // {
  //   id: "seed-12",
  //   name: "Arundhati Bose",
  //   city: "Kolkata",
  //   state: "West Bengal",
  //   courseSlug: "ttc-course",
  //   courseTitle: "Yoga Teacher Training (TTC)",
  //   rating: 5,
  //   text: "I had been practising yoga for eight years before joining the TTC, and this programme elevated my understanding completely. The blend of classical philosophy and modern science is masterfully taught. Three months after graduating I launched my own postnatal classes and already have a waiting list. The investment in this training pays back endlessly.",
  //   photo: undefined,
  //   date: "2024-04-08",
  //   initials: "AB",
  // },
];
