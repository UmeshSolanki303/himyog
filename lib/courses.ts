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
    slug: "prenatal-yoga",
    title: "Prenatal Yoga",
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
    slug: "postnatal-yoga",
    title: "Postnatal Yoga",
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
    title: "Pregnancy Wellness",
    subtitle: "Expert information for every stage",
    duration: "Monthly sessions",
    format: "Live Online",
    level: "All expectant & new parents",
    badge: "Free intro available",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80",
    shortDescription:
      "Expert-led information sessions on pregnancy, birth, breastfeeding, and the fourth trimester — knowledge to navigate every stage with confidence.",
    description:
      "Our pregnancy wellness information sessions are expert-led conversations covering every stage of your journey — from pregnancy through the fourth trimester. We cover birth preparation, breastfeeding support, newborn care, and emotional wellbeing to give you the knowledge and confidence to navigate this incredible chapter.",
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
    title: "Yoga Teacher Training (TTC)",
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
      "Our 200-hour Yoga Teacher Training Course is designed for practitioners who want to specialise in the transformative field of maternal yoga. You will gain deep theoretical knowledge, hands-on teaching practice, and the confidence to hold safe, nurturing spaces for expecting and new mothers. The programme blends classical yoga philosophy with modern evidence-based prenatal and postnatal science.",
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
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
