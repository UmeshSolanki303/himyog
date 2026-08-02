import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContentSection, ContentVideo } from "@/components/ContentSection";
import { GallerySection } from "@/components/GallerySection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Postnatal Yoga",
  description:
    "Postpartum recovery with pelvic floor and core focus. Baby-and-me yoga classes and expert-led support for the fourth trimester. Recover gently after birth.",
  openGraph: {
    title: "Postnatal Yoga | Him Yoga",
    description:
      "Postpartum recovery yoga. Pelvic floor and core recovery, baby-and-me sessions for new parents.",
    url: "/postnatal",
  },
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=1600&q=80";

const POSTNATAL_GALLERY_ITEMS = [
  {
    src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80",
    alt: "Postnatal yoga with baby",
    caption: "Baby-and-me sessions in a supportive environment",
    description:
      "Baby-and-me sessions offer a nurturing, weekly space for caregivers and infants (usually aged 0–12 months) to bond, reduce stress, and socialize with peers. These 45–60 minute, often free or low-cost, sessions feature sensory play, music, and expert-led activities designed to support early development and mental health.",
  },
  {
    src: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600&q=80",
    alt: "Recovery and rest",
    caption: "Restore energy in the fourth trimester",
    description:
      "Restoring energy in the fourth trimester—the 12 weeks following childbirth—requires a shift from 'bouncing back' to intentional healing, resting, and deep nourishment. The body is undergoing intense physical changes, including healing from birth, hormonal shifts, and, if breastfeeding, managing high caloric demands.",
  },
  {
    src: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&q=80",
    alt: "Gentle movement",
    caption: "Pelvic floor and core recovery",
    description:
      "Pelvic floor and core recovery focuses on re-establishing the connection between the diaphragm, deep abdominals (transverse abdominis), and pelvic floor muscles through gentle, breath-focused movements. Key exercises include diaphragmatic breathing, Kegels, pelvic tilts, bridges, and bird-dogs, performed in 3-phase protocols (stabilization to functional) to improve stability and control.",
  },
  {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
    alt: "Mindful practice",
    caption: "Adapted for your pace",
    description:
      "Adapting training to your own pace involves listening to your body to set intensity levels rather than following rigid, one-size-fits-all targets. True progress comes from consistency—such as running 65–80% of mileage at an 'easy' conversational pace—and aligning goals with your current fitness level, not others",
  },
  {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    alt: "Calm and connection",
    caption: "Bond while you move",
    description:
      "Securing your rental bond when moving requires a final inspection with your landlord to identify repairs, ensuring a smooth bond transfer or return. In shared housing, arrange a lease transfer in writing, having the incoming tenant pay you directly to transfer the bond. Act responsibly by documenting everything for a clean move.",
  },
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    alt: "Restorative postnatal yoga",
    caption: "Nurturing space for new parents",
    description:
      "A nurturing space for new parents blends physical, emotional, and social support to ease the transition into parenthood. It involves creating a calm, organized, and safe home environment for the baby, alongside prioritizing self-care, seeking community support, and practicing compassion to reduce stress and foster bonding. ",
  },
];

export default function PostnatalPage() {
  return (
    <main>
      <PageHero
        title="Postnatal Yoga"
        description="Recover gently and rebuild strength after birth. Pelvic floor and core recovery, with optional baby-and-me sessions so you can bond while you move."
        imageSrc={HERO_IMAGE}
      />
      <ContentSection title="Recovery and strength" className="bg-beige-50">
        <p className="leading-relaxed mb-6">
          Our postnatal program focuses on pelvic floor health, core recovery,
          and restoring energy in the fourth trimester. We use evidence-based
          practices adapted for both cesarean and vaginal birth recovery. You
          can start when you feel ready—we meet you where you are and never push
          beyond what feels right for your body.
        </p>
        <p className="leading-relaxed">
          Baby-and-me classes let you bring your little one along so you can
          bond while you move. Our instructors are trained to support new
          parents with patience and care, and we prioritise rest and nourishment
          as much as movement.
        </p>
      </ContentSection>

      <GallerySection
        title="Baby-and-me sessions in a supportive environment"
        items={POSTNATAL_GALLERY_ITEMS}
        className="bg-white"
      />

      <ContentSection title="What we focus on" className="bg-beige-50">
        <ul className="list-none space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-sage-500 mt-1">•</span>
            Pelvic floor and core recovery with evidence-based practices
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sage-500 mt-1">•</span>
            Baby-and-me classes so you can bring your little one
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sage-500 mt-1">•</span>
            Adapted for cesarean and vaginal birth recovery
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sage-500 mt-1">•</span>
            Restore energy and find calm in the fourth trimester
          </li>
        </ul>
      </ContentSection>

      <ContentSection
        title="Watch: Postnatal recovery tips"
        className="bg-white"
      >
        <ContentVideo src="" title="Postnatal recovery tips" />
      </ContentSection>

      <Footer />
    </main>
  );
}
