import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContentSection, ContentImage } from "@/components/ContentSection";
import { GallerySection } from "@/components/GallerySection";
import { CourseGallerySection } from "@/components/CourseGallerySection";
import { Footer } from "@/components/Footer";
import { listSiteImages } from "@/lib/admin-db";
import { FaqSection, type Faq } from "@/components/FaqSection";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

// Real gallery photos can be added any time from /admin/gallery — revalidate
// periodically rather than only at build time, or newly uploaded photos
// wouldn't show up until the next deploy.
export const revalidate = 60;

export const metadata: Metadata = pageMetadata(PAGE_SEO.postnatal);

const POSTNATAL_FAQS: Faq[] = [
  {
    q: "When can I start postnatal yoga after delivery?",
    a: "Many mothers begin gentle breathing and pelvic floor work in the first weeks, and a full postnatal class around six weeks after a vaginal birth, once their doctor has cleared them. Always follow your doctor's advice for your own recovery.",
  },
  {
    q: "Is postnatal yoga safe after a C-section?",
    a: "Yes, once your doctor has cleared you for exercise — usually from around 8 to 12 weeks after a caesarean. Our classes are adapted for C-section recovery, protecting the scar and rebuilding core strength gradually.",
  },
  {
    q: "Can postnatal yoga help with diastasis recti?",
    a: "Our classes include deep core and pelvic floor exercises that support diastasis recti recovery, and we avoid movements that strain the abdominal wall. If you have a significant separation, we recommend working alongside a women's health physiotherapist.",
  },
  {
    q: "Will postpartum yoga help reduce belly fat?",
    a: "Postnatal yoga rebuilds core strength, posture and energy, which helps your body recover after birth. We focus on healing first rather than quick weight loss — there's no rush to 'bounce back'.",
  },
  {
    q: "Can I bring my baby to class?",
    a: "Yes. Our baby-and-me (mom and baby) yoga sessions are designed so you can bring your little one along, and feeding or soothing breaks are always welcome.",
  },
  {
    q: "Are postnatal yoga classes available online?",
    a: "Yes. Join live online postpartum yoga from home anywhere in India, or attend in person at our studio in Rishikesh.",
  },
];

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
      "There's no fixed timeline for postpartum recovery. Your instructor adjusts every sequence to how your body feels that day — whether you're six weeks or six months postpartum — so progress is steady, safe, and entirely your own.",
  },
  {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    alt: "Calm and connection",
    caption: "Bond while you move",
    description:
      "Shared poses, soft eye contact, and skin-to-skin moments woven into class let movement become a form of bonding — a few quiet minutes each week that are just for you and your baby.",
  },
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    alt: "Restorative postnatal yoga",
    caption: "Nurturing space for new parents",
    description:
      "A nurturing space for new parents blends physical, emotional, and social support to ease the transition into parenthood. It involves creating a calm, organized, and safe home environment for the baby, alongside prioritizing self-care, seeking community support, and practicing compassion to reduce stress and foster bonding. ",
  },
];

export default async function PostnatalPage() {
  const siteImages = await listSiteImages().catch(
    () => ({}) as Awaited<ReturnType<typeof listSiteImages>>,
  );

  return (
    <main>
      <PageHero
        title="Postnatal Yoga"
        description="Postpartum yoga to recover gently and rebuild strength after normal or C-section birth — pelvic floor and core recovery, plus baby-and-me sessions. Online and in Rishikesh."
        imageSrc={siteImages["postnatal-hero"]?.url ?? HERO_IMAGE}
      />
      <ContentSection title="Postpartum recovery and strength" className="bg-beige-50">
        <p className="leading-relaxed mb-6">
          Our postnatal yoga program focuses on pelvic floor health, core
          recovery (including diastasis recti), and restoring energy in the
          fourth trimester. We use evidence-based
          practices adapted for both cesarean and vaginal birth recovery. You
          can start when you feel ready—we meet you where you are and never push
          beyond what feels right for your body. Classes run live online and in
          person at our studio in Rishikesh.
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

      <ContentSection title="What our postnatal yoga classes focus on" className="bg-beige-50">
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
        title="A gentler fourth trimester"
        className="bg-white"
      >
        <p className="leading-relaxed">
          No rush to &ldquo;bounce back.&rdquo; Every class leaves space for
          stillness — a few minutes of rest woven into the practice, because
          recovery is as much about slowing down as it is about rebuilding
          strength.
        </p>
        <ContentImage
          src="https://images.unsplash.com/photo-1593810450967-f9c42742e326?w=1200&q=80"
          alt="Restorative postnatal stretch"
          caption="Space to rest, not just to recover"
        />
      </ContentSection>

      <CourseGallerySection courseSlug="postnatal-yoga" className="bg-white" />

      <FaqSection faqs={POSTNATAL_FAQS} title="Postnatal Yoga FAQs" />

      <Footer />
    </main>
  );
}
