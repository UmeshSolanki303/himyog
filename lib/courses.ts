export interface CourseGalleryItem {
  src: string;
  alt: string;
  caption: string;
  description?: string;
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  format: string;
  level: string;
  badge: string;
  image: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  curriculum: string[];
  formUrl: string;
  price: string;
  // Curated mood/theme imagery — not photos of real students. See
  // CourseGallerySection (and /admin/gallery) for real, admin-uploaded
  // photos, which render separately and take priority where they exist.
  gallery?: CourseGalleryItem[];
}

const ENROLL_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfOv0nEZtvy7STdbX3XeIt8RXnDyW7fBjANWpOugaTzv6Pzng/viewform?usp=preview";

export const courses: Course[] = [
  {
    slug: "preconception",
    title: "Preconception",
    subtitle: "Preparing body & mind before conception",
    duration: "6-week program",
    format: "Live Online & In-Person",
    level: "All levels — couples welcome",
    badge: "New",
    image:
      "https://images.pexels.com/photos/6539883/pexels-photo-6539883.jpeg?auto=compress&cs=tinysrgb&w=1200",
    shortDescription:
      "Gentle yoga, breathwork, and lifestyle guidance to help you prepare your body, mind, and hormones before your conception journey begins.",
    description:
      "Our Preconception program supports you in building a strong, balanced foundation before trying to conceive. We combine restorative yoga, fertility-supportive movement, breathwork, and evidence-informed lifestyle guidance to help regulate stress, improve hormonal balance, and prepare your body for pregnancy — whether you are just starting out or have been trying for a while.",
    highlights: [
      "Fertility-supportive asanas and gentle movement sequences",
      "Stress-reduction breathwork and nervous-system regulation",
      "Lifestyle, nutrition, and cycle-awareness guidance",
      "Space to process the emotional journey of trying to conceive",
      "Optional sessions for couples preparing together",
    ],
    curriculum: [
      "Yoga for hormonal balance and reproductive health",
      "Breathwork and meditation for stress and anxiety",
      "Understanding your cycle and fertile window",
      "Nutrition and Ayurvedic guidance for conception",
      "Mind-body practices to release fear and build hope",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1549062572-b4280938a25f?w=600&q=80",
        alt: "Couple sharing a close, warm moment",
        caption: "Preparing together",
        description: "Optional couples sessions make this a shared journey, not a solitary one.",
      },
      {
        src: "https://images.unsplash.com/photo-1617788472008-1e524a74cf25?w=600&q=80",
        alt: "Couple watching the sunset together",
        caption: "Space to process it all",
        description: "Trying to conceive brings up a lot — our sessions make room for the emotional side, not just the physical.",
      },
      {
        src: "https://images.unsplash.com/photo-1500771967326-9b2f6200d1c6?w=600&q=80",
        alt: "Couple laughing together outdoors",
        caption: "Hope held lightly",
        description: "A warm, judgement-free space for wherever you are in the journey — just starting, or further along.",
      },
      {
        src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
        alt: "Gentle fertility-supportive yoga movement",
        caption: "Gentle, fertility-supportive movement",
        description: "Restorative asanas and breathwork to regulate stress and support hormonal balance.",
      },
      {
        src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
        alt: "A calm space for restorative practice",
        caption: "Rest as part of the practice",
        description: "Nervous-system regulation is as much a part of preconception care as any asana.",
      },
      {
        src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
        alt: "A nourishing, colourful bowl of fresh food",
        caption: "Nutrition and Ayurvedic guidance",
        description: "Lifestyle and nutrition guidance woven into the program, grounded in Ayurvedic tradition.",
      },
    ],
    formUrl: ENROLL_FORM_URL,
    price: "Contact for pricing",
  },
  {
    slug: "prenatal-yoga",
    title: "Prenatal",
    subtitle: "Safe movement for every trimester",
    duration: "Weekly classes",
    format: "Live Online & In-Person",
    level: "All levels — beginners welcome",
    badge: "Most Popular",
    image:
      "https://images.pexels.com/photos/7055705/pexels-photo-7055705.jpeg?auto=compress&cs=tinysrgb&w=1200",
    shortDescription:
      "Gentle, adapted yoga to ease discomfort, build strength, and prepare your body and mind for birth — safe for all trimesters.",
    description:
      "Our prenatal yoga classes are designed to support you through each trimester with safe, adapted poses that ease common discomforts, build strength, and prepare your body and mind for birth. Led by certified prenatal yoga instructors, every class is inclusive and welcoming for beginners and experienced practitioners alike.",
    highlights: [
      "Safe for all trimesters with modifications offered",
      "Focus on breathwork, pelvic floor awareness, and relaxation",
      "Gentle strength and flexibility to ease back pain and improve posture",
      "Community of expecting parents in a nurturing environment",
      "Guided preparation for birth with visualisation and breathing techniques",
    ],
    curriculum: [
      "Trimester-specific safe poses and modifications",
      "Pranayama (breathing) for labour and birth",
      "Pelvic floor awareness and gentle strengthening",
      "Partner yoga and bonding practices",
      "Relaxation, yoga nidra, and stress management",
    ],
    formUrl: ENROLL_FORM_URL,
    price: "Contact for pricing",
  },
  {
    slug: "garbhsamskar",
    title: "Garbhsamskar",
    subtitle: "Garbh Sanskar — ancient Vedic wisdom for a conscious pregnancy",
    duration: "12-week program",
    format: "Live Online & In-Person",
    level: "All trimesters",
    badge: "Traditional",
    image:
      "https://images.pexels.com/photos/38491534/pexels-photo-38491534.jpeg?auto=compress&cs=tinysrgb&w=1200",
    shortDescription:
      "A traditional Vedic practice blending yoga, mantra, meditation, and Ayurvedic guidance to nurture your baby's mind, body, and spirit in the womb.",
    description:
      "Garbhsamskar is an ancient Vedic practice for expecting mothers who wish to consciously nurture their baby during pregnancy. Rooted in yogic and Ayurvedic tradition, the program blends gentle asana, mantra chanting, guided meditation, storytelling, and nutritional wisdom to create a calm, sacred, and positive environment for your baby's development — while deepening your own emotional and spiritual wellbeing.",
    highlights: [
      "Mantra chanting and sound therapy for mother and baby",
      "Guided meditation and visualisation practices",
      "Ayurvedic diet and daily-routine (dinacharya) guidance",
      "Storytelling and value-based practices rooted in tradition",
      "A sacred, supportive community of expecting mothers",
    ],
    curriculum: [
      "Foundations of Garbhsamskar philosophy and tradition",
      "Gentle yoga and pranayama through pregnancy",
      "Mantra, bhajan, and sound healing for bonding",
      "Ayurvedic nutrition and lifestyle across trimesters",
      "Meditation, visualisation, and positive affirmations",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1761658883805-e2baf8795b88?w=600&q=80",
        alt: "Women in traditional attire performing a coconut ritual with incense",
        caption: "Rooted in tradition",
        description: "Rituals passed down through generations, held with the same care today.",
      },
      {
        src: "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?w=600&q=80",
        alt: "Hands cupping a lit clay diya",
        caption: "A sacred, quiet light",
        description: "Small rituals that ground the practice — mantra, sound, and intention held together.",
      },
      {
        src: "https://images.unsplash.com/photo-1577083753695-e010191bacb5?w=600&q=80",
        alt: "Diyas and flower petals arranged for a ritual",
        caption: "Ceremony and sound healing",
        description: "Bhajan and sound healing woven into the program, for bonding with your baby.",
      },
      {
        src: "https://images.unsplash.com/photo-1602305362475-17c5fd62d2e3?w=600&q=80",
        alt: "Two clay diyas lit against a dark background",
        caption: "Dinacharya — a sacred daily rhythm",
        description: "Ayurvedic daily-routine guidance to create a calm, positive environment for your baby.",
      },
      {
        src: "https://images.unsplash.com/photo-1624013599822-1faf520c67d1?w=600&q=80",
        alt: "Pregnant woman in a meditative prayer pose",
        caption: "Meditation and visualisation",
        description: "Guided meditation and positive affirmations, held with warmth throughout pregnancy.",
      },
      {
        src: "https://images.unsplash.com/photo-1457342813143-a1ae27448a82?w=600&q=80",
        alt: "Pregnant woman gently cradling her belly",
        caption: "Nurturing body, mind, and spirit",
        description: "A calm, sacred environment for your baby's development, at every stage.",
      },
    ],
    formUrl: ENROLL_FORM_URL,
    price: "Contact for pricing",
  },
  {
    slug: "postnatal-yoga",
    title: "Postnatal",
    subtitle: "Recover and rebuild after birth",
    duration: "Weekly classes",
    format: "Live Online & In-Person",
    level: "All levels",
    badge: "",
    image:
      "https://images.pexels.com/photos/9472300/pexels-photo-9472300.jpeg?auto=compress&cs=tinysrgb&w=1200",
    shortDescription:
      "Pelvic floor and core recovery, baby-and-me sessions, and gentle rebuilding of strength at your own pace after birth.",
    description:
      "Recover gently and rebuild strength with our postnatal yoga program. We focus on pelvic floor health, core recovery, and optional baby-and-me sessions so you can bond while you move. Start when you feel ready — we meet you where you are, whether you had a vaginal birth or a caesarean.",
    highlights: [
      "Pelvic floor and core recovery with evidence-based practices",
      "Baby-and-me classes so you can bring your little one",
      "Adapted for caesarean and vaginal birth recovery",
      "Restore energy and find calm in the fourth trimester",
      "Build strength gradually and safely at your own pace",
    ],
    curriculum: [
      "Pelvic floor rehabilitation and awareness",
      "Core reconnection and diastasis recti recovery",
      "Baby-and-me bonding poses and playful movement",
      "Restorative yoga for postpartum fatigue",
      "Breathwork for stress relief and emotional recovery",
    ],
    formUrl: ENROLL_FORM_URL,
    price: "Contact for pricing",
  },
  {
    slug: "pregnancy-wellness",
    title: "Pregnancy Wellness Retreat",
    subtitle: "Expert-led immersion for every stage",
    duration: "Monthly retreats & sessions",
    format: "Live Online & In-Person",
    level: "All expectant & new parents",
    badge: "Free intro available",
    image:
      "https://images.pexels.com/photos/37709411/pexels-photo-37709411.jpeg?auto=compress&cs=tinysrgb&w=1200",
    shortDescription:
      "Expert-led wellness sessions and retreats on pregnancy, birth, breastfeeding, and the fourth trimester — knowledge and rest to navigate every stage with confidence.",
    description:
      "Our Pregnancy Wellness Retreat brings together expert-led information sessions and restorative retreat experiences covering every stage of your journey — from pregnancy through the fourth trimester. We cover birth preparation, breastfeeding support, newborn care, and emotional wellbeing, paired with restful, nurturing retreat time to give you the knowledge and calm confidence to navigate this incredible chapter.",
    highlights: [
      "Evidence-based information on pregnancy and postpartum health",
      "Birth preparation and pain management techniques",
      "Breastfeeding guidance and practical tips from certified lactation support",
      "Fourth trimester support and newborn care essentials",
      "Live Q&A with qualified healthcare professionals",
    ],
    curriculum: [
      "Pregnancy health, nutrition, and lifestyle",
      "Birth preparation — what to expect and how to prepare",
      "Breastfeeding basics and common troubleshooting",
      "Newborn care essentials and safe sleep",
      "Postpartum mental health, wellbeing, and community support",
    ],
    formUrl: ENROLL_FORM_URL,
    price: "Contact for pricing",
  },
  {
    slug: "ttc-course",
    title: "TTC Yoga",
    subtitle: "Become a certified prenatal & postnatal yoga teacher",
    duration: "200-hour program",
    format: "Live Online & In-Person",
    level: "Intermediate practitioners",
    badge: "Limited Seats",
    image:
      "https://images.pexels.com/photos/34513840/pexels-photo-34513840.jpeg?auto=compress&cs=tinysrgb&w=1200",
    shortDescription:
      "A comprehensive 200-hour Teacher Training Course specialising in prenatal and postnatal yoga — equipping you to guide mothers safely through every stage of their journey.",
    description:
      "Our 200-hour Yoga Teacher Training Course (TTC) is designed for practitioners who want to specialise in the transformative field of maternal yoga. You will gain deep theoretical knowledge, hands-on teaching practice, and the confidence to hold safe, nurturing spaces for expecting and new mothers. The programme blends classical yoga philosophy with modern evidence-based prenatal and postnatal science.",
    highlights: [
      "200-hour Yoga Alliance accredited certification",
      "Prenatal & postnatal anatomy, physiology and contraindications",
      "Trauma-informed and inclusive teaching methodology",
      "Business skills: building your own maternal yoga practice",
      "Mentorship and supervised teaching practice hours",
    ],
    curriculum: [
      "Yoga philosophy, ethics, and the science of teaching",
      "Prenatal anatomy, trimester-by-trimester progressions",
      "Postnatal recovery, pelvic floor, and diastasis recti",
      "Breathwork, meditation, and yoga nidra for mothers",
      "Trauma-informed teaching, inclusivity, and safeguarding",
      "Practicum: supervised class delivery and peer feedback",
    ],
    formUrl: ENROLL_FORM_URL,
    price: "Contact for pricing",
  },
  {
    slug: "meditation",
    title: "Meditation",
    subtitle: "Stillness and mindfulness for every stage of life",
    duration: "Weekly sessions",
    format: "Live Online & In-Person",
    level: "All levels — open to everyone",
    badge: "",
    image:
      "https://images.pexels.com/photos/32089502/pexels-photo-32089502.jpeg?auto=compress&cs=tinysrgb&w=1200",
    shortDescription:
      "Guided meditation and pranayama sessions for calm, clarity, and emotional balance — open to mothers, students, and anyone seeking stillness.",
    description:
      "Our Meditation program offers guided practices in mindfulness, pranayama, and yoga nidra to help you find calm and clarity amid life's demands. Open to expecting and new mothers as well as anyone in our wider community, sessions are designed to reduce stress, improve sleep, and build a sustainable, personal meditation practice.",
    highlights: [
      "Guided mindfulness and breath-awareness meditation",
      "Pranayama techniques for calm and focus",
      "Yoga nidra for deep rest and nervous-system recovery",
      "Practices adaptable for pregnancy, postpartum, or everyday life",
      "A quiet, supportive space open to all",
    ],
    curriculum: [
      "Foundations of mindfulness and breath awareness",
      "Pranayama for stress relief and focus",
      "Yoga nidra and deep relaxation techniques",
      "Building a sustainable home meditation practice",
      "Meditation for emotional balance through life transitions",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=600&q=80",
        alt: "Person meditating on a bench at sunset overlooking hills",
        caption: "Stillness, wherever you find it",
        description: "A personal practice that travels with you — on a bench, a mat, or a quiet corner of home.",
      },
      {
        src: "https://images.unsplash.com/photo-1602192509154-0b900ee1f851?w=600&q=80",
        alt: "Woman meditating cross-legged on a grassy hill",
        caption: "Breath-awareness meditation",
        description: "Guided mindfulness practices to build focus and calm, one session at a time.",
      },
      {
        src: "https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=600&q=80",
        alt: "Person sitting in meditation overlooking mountains",
        caption: "Open to everyone",
        description: "Mothers, students, and anyone seeking stillness — this space is for all of it.",
      },
      {
        src: "https://images.unsplash.com/photo-1461468611824-46457c0e11fd?w=600&q=80",
        alt: "Person meditating by the ocean at sunset",
        caption: "Yoga nidra and deep rest",
        description: "Practices for nervous-system recovery, adaptable for pregnancy, postpartum, or everyday life.",
      },
      {
        src: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=600&q=80",
        alt: "A calm, guided meditation session",
        caption: "Pranayama for calm and focus",
        description: "Breathwork techniques that build a sustainable, personal meditation practice over time.",
      },
      {
        src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
        alt: "A calm space for restorative practice",
        caption: "Emotional balance through transitions",
        description: "A quiet, supportive space held for you through whatever life stage you're navigating.",
      },
    ],
    formUrl: ENROLL_FORM_URL,
    price: "Contact for pricing",
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

// Courses with their own dedicated, richer page (instead of the generic
// /courses/[slug] template) — the single source of truth so every link,
// the sitemap, and the JSON-LD Service URLs all agree on where a course
// actually lives.
const DEDICATED_COURSE_URLS: Record<string, string> = {
  "prenatal-yoga": "/prenatal",
  "postnatal-yoga": "/postnatal",
  "pregnancy-wellness": "/retreat",
};

export function getCourseUrl(slug: string): string {
  return DEDICATED_COURSE_URLS[slug] ?? `/courses/${slug}`;
}

export function hasDedicatedPage(slug: string): boolean {
  return slug in DEDICATED_COURSE_URLS;
}
