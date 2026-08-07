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
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
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
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
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
    subtitle: "Ancient wisdom for a conscious pregnancy",
    duration: "12-week program",
    format: "Live Online & In-Person",
    level: "All trimesters",
    badge: "Traditional",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
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
      "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80",
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
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80",
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
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80",
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
      "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=800&q=80",
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
    formUrl: ENROLL_FORM_URL,
    price: "Contact for pricing",
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
