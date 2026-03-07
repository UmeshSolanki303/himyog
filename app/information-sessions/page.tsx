import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContentSection, ContentVideo } from "@/components/ContentSection";
import { GallerySection } from "@/components/GallerySection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Information Sessions",
  description:
    "Expert-led sessions on pregnancy, birth, and postpartum. Tips on labour, breastfeeding, newborn care, and the fourth trimester. Support for every stage.",
  openGraph: {
    title: "Information Sessions | Himmu Yoga",
    description:
      "Expert-led sessions on pregnancy, birth, and postpartum. Tips, guidance, and support for every stage of your journey.",
    url: "/information-sessions",
  },
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1600&q=80";

const INFO_GALLERY_ITEMS = [
  {
    src: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80",
    alt: "Information session",
    caption: "Interactive sessions with expert educators",
    description: "",
  },
  {
    src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80",
    alt: "Pregnancy wellness",
    caption: "Pregnancy wellness and common concerns",
    description:
      "Pregnancy wellness involves a combination of prenatal care, balanced nutrition, regular, moderate exercise, and emotional support to ensure both the mother and baby are healthy. Key wellness practices include taking folic acid (at least 600 mcg daily), avoiding alcohol, smoking, and certain foods (e.g., raw fish, unpasteurized dairy), and limiting caffeine to 200mg or less daily",
  },
  {
    src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80",
    alt: "Newborn care",
    caption: "Breastfeeding and newborn care",
    description:
      "Newborns should be breastfed on demand, roughly 8–12 times in 24 hours, starting immediately after birth with skin-to-skin contact. Key practices include ensuring a deep latch, alternating breasts, and recognizing hunger cues like rooting or hand-to-mouth movements. Essential care includes keeping the baby warm, delaying the first bath, monitoring diapers, and seeking support for feeding difficulties.",
  },
  {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    alt: "Preparing for birth",
    caption: "Preparing for labour and birth",
    description:
      "Preparing for labour and delivery involves physical conditioning, mental preparation, and practical planning. Key steps include attending antenatal classes, staying active with walking or yoga, creating a birth plan, packing your hospital bag, and learning breathing/relaxation techniques. Regular prenatal check-ups are crucial to monitor health.",
  },
  {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
    alt: "Fourth trimester",
    caption: "Fourth trimester and postnatal adjustment",
    description:
      "The fourth trimester, or the first 12 weeks post-birth, is a critical, often challenging, period of intense emotional, physical, and identity shifts for new parents. It involves healing from childbirth (vaginal or C-section), managing hormonal changes, sleep deprivation, and adjusting to the newborn's needs. Prioritizing rest, support, and mental health is vital.",
  },
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    alt: "Calm learning space",
    caption: "Evidence-based information in a nurturing environment",
    description:
      "Evidence-based, nurturing environments provide safe, supportive, and responsive care (e.g., in homes or child-care) that is scientifically proven to enhance early childhood development and promote long-term well-being. Key components include secure, non-harsh, and warm interaction, coupled with nutrition, health monitoring, and stimulation, which reduce behavioral issues and improve cognitive outcomes.",
  },
];

export default function InformationSessionsPage() {
  return (
    <main className="pb-12 sm:pb-16 lg:pb-20">
      <PageHero
        title="Information Sessions"
        description="Expert-led sessions on pregnancy, birth, and postpartum. Get tips, guidance, and support for every stage of your journey."
        imageSrc={HERO_IMAGE}
      />
      <ContentSection title="What we cover" className="bg-beige-50">
        <p className="leading-relaxed mb-6">
          Our information sessions are designed to complement your yoga practice
          with practical knowledge and emotional support. Led by experienced
          educators, we cover topics such as pregnancy wellness, preparing for
          birth, breastfeeding and newborn care, and the fourth trimester. Each
          session is interactive and gives you space to ask questions and
          connect with other parents.
        </p>
        <p className="leading-relaxed">
          Whether you are expecting your first baby or adding to your family,
          our sessions provide evidence-based information in a calm, nurturing
          environment. You can attend standalone sessions or combine them with
          our prenatal and postnatal yoga classes for full support.
        </p>
      </ContentSection>

      <GallerySection
        title="Interactive sessions with expert educators"
        items={INFO_GALLERY_ITEMS}
        className="bg-white"
      />

      <ContentSection title="Session topics" className="bg-beige-50">
        <ul className="list-none space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-sage-500 mt-1">•</span>
            Pregnancy wellness and common concerns
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sage-500 mt-1">•</span>
            Preparing for labour and birth
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sage-500 mt-1">•</span>
            Breastfeeding and newborn care
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sage-500 mt-1">•</span>
            Fourth trimester and postnatal adjustment
          </li>
        </ul>
      </ContentSection>

      <ContentSection title="Watch: Meet our educators" className="bg-white">
        <ContentVideo src="" title="Meet our educators" />
      </ContentSection>

      <Footer />
    </main>
  );
}
