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

const PRENATAL_GALLERY_ITEMS = [
  {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
    alt: "Prenatal yoga class",
    caption: "Guided breathwork and relaxation",
    description:
      "Guided breathwork and relaxation techniques, such as the 4-7-8 method, box breathing, and diaphragmatic belly breathing, are designed to rapidly lower heart rate, reduce cortisol, and activate the parasympathetic nervous system. These practices involve deep, controlled inhalations and slow, intentional exhales to induce a state of calm.",
  },
  {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    alt: "Gentle prenatal movement",
    caption: "Safe, adapted poses for every trimester",
    description:
      "Safe prenatal yoga poses focus on stability, stretching, and breathing, avoiding deep twists or laying flat on the back as the pregnancy progresses. Key poses include Cat-Cow for back pain, Supported Child’s Pose for relaxation, Butterfly Pose for hip flexibility, and Modified Squats for labor preparation. Props like blocks, pillows, and walls are essential for support.",
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    alt: "Yoga and mindfulness",
    caption: "Mindful movement and connection",
    description:
      "Mindful movement connects the mind and body by bringing full, non-judgmental awareness to physical sensations and breath during activity. Techniques like yoga, Tai Chi, or slow, intentional movement reduce stress, release stagnant energy, and foster a sense of safety, presence, and self-compassion.",
  },
  {
    src: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
    alt: "Stretching and flexibility",
    caption: "Ease tension and improve posture",
    description:
      "Ease tension and improve posture by incorporating daily stretches like chest openers, chin tucks, and cat-cow poses to reverse slouching. Strengthen your back and core with planks or shoulder blade squeezes. Practice ergonomic habits, such as keeping feet flat, sitting tall, and taking breaks every 30 minutes.",
  },
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    alt: "Calm prenatal practice",
    caption: "Restorative poses and rest",
    description:
      "Restorative yoga uses props like bolsters, blankets, and blocks to hold gentle poses for 5–20 minutes, allowing muscles to relax completely, reducing stress, and fostering deep rest. Key poses include Supported Bridge, Child’s Pose, Legs-up-the-Wall, and Savasana, often used for insomnia, anxiety, and recovery.",
  },
  {
    src: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=600&q=80",
    alt: "Community and support",
    caption: "A nurturing space together",
    description:
      "A 'nurturing space together' refers to the intentional creation of environments—physical, emotional, or communal—that foster growth, safety, connection, and wellbeing. These spaces are designed to be supportive, empathetic, and collaborative, whether for children, families, or communities.",
  },
];

export const metadata: Metadata = pageMetadata(PAGE_SEO.prenatal);

const PRENATAL_FAQS: Faq[] = [
  {
    q: "Is prenatal yoga safe in the first trimester?",
    a: "Yes, for most healthy pregnancies. First-trimester classes focus on gentle movement, breathwork and rest, and we avoid deep twists, hot rooms and strong core work. Always check with your doctor before starting, especially if your pregnancy is high-risk.",
  },
  {
    q: "When should I start pregnancy yoga?",
    a: "You can start in any trimester. Many mothers begin after the first-trimester scan, but each class is adapted to your stage, so it is never too late to join — even in the third trimester.",
  },
  {
    q: "Can prenatal yoga help with a normal delivery?",
    a: "Prenatal yoga builds strength, flexibility, pelvic floor awareness and breathing techniques that many mothers find helpful during labour. It can't guarantee a particular type of birth, but it helps you feel prepared and confident.",
  },
  {
    q: "Are your prenatal yoga classes online or in person?",
    a: "Both. Join live online pregnancy yoga classes from anywhere in India, or attend in person at our studio in Muni Ki Reti, Rishikesh.",
  },
  {
    q: "Do I need yoga experience to join?",
    a: "No. Our prenatal classes are designed for complete beginners as well as experienced practitioners, with modifications offered for every pose.",
  },
  {
    q: "Can prenatal yoga ease back pain during pregnancy?",
    a: "Gentle stretches, posture work and strengthening for the hips and back can ease the lower back and pelvic discomfort common in pregnancy. Let your instructor know about any pain so poses can be adapted for you.",
  },
];

// Replace with your image path (/hero-prenatal.jpg) or external URL
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80";

export default async function PrenatalPage() {
  const siteImages = await listSiteImages().catch(
    () => ({}) as Awaited<ReturnType<typeof listSiteImages>>,
  );

  return (
    <main>
      <PageHero
        title="Prenatal Yoga"
        description="Safe, gentle pregnancy yoga for every trimester — live online across India and in person in Rishikesh. Ease discomfort, build strength, and prepare your body and mind for birth."
        imageSrc={siteImages["prenatal-hero"]?.url ?? HERO_IMAGE}
      />
      <ContentSection title="What to expect in our prenatal yoga classes" className="bg-beige-50">
        <p className="leading-relaxed mb-6">
          Our prenatal yoga classes are designed to support you through each
          trimester with safe, adapted poses that ease common discomforts, build
          strength, and prepare your body and mind for birth. All classes are
          suitable for beginners and experienced practitioners alike. You will
          learn breathwork, pelvic floor awareness, and relaxation techniques
          that support labour and recovery. Join live online pregnancy yoga
          classes from anywhere in India, or practise with us in person in
          Rishikesh, the yoga capital of the world.
        </p>
        <p className="leading-relaxed">
          Classes focus on gentle strength and flexibility to ease back pain and
          improve posture, and you will join a community of expecting parents in
          a nurturing environment. We offer modifications for every stage and
          always prioritise safety and comfort.
        </p>
      </ContentSection>

      <GallerySection
        title="Gentle movement and breathwork in our prenatal sessions"
        items={PRENATAL_GALLERY_ITEMS}
        className="bg-beige-50"
      />

      <ContentSection title="Safe yoga for the first, second and third trimester" className="bg-white">
        <p className="leading-relaxed mb-6">
          Whether you are in your first, second, or third trimester, our
          instructors provide appropriate modifications and alternatives. We
          avoid poses that are contraindicated during pregnancy and emphasise
          listening to your body. If you have any concerns or a high-risk
          pregnancy, please consult your healthcare provider before joining.
        </p>
        <ul className="list-none space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-sage-500 mt-1">•</span>
            Focus on breathwork, pelvic floor awareness, and relaxation
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sage-500 mt-1">•</span>
            Gentle strength and flexibility to ease back pain
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sage-500 mt-1">•</span>
            Community of expecting parents in a nurturing environment
          </li>
        </ul>
      </ContentSection>

      <ContentSection
        title="Step into our practice space"
        className="bg-beige-50"
      >
        <p className="leading-relaxed">
          Every mat, every prop, every session is set up with one thing in
          mind — your safety and comfort, trimester by trimester. This is
          the space you&apos;ll come to know as your own.
        </p>
        <ContentImage
          src="https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1200&q=80"
          alt="Yoga mats ready for a prenatal class"
          caption="A calm, prepared space for every session"
        />
      </ContentSection>

      <CourseGallerySection courseSlug="prenatal-yoga" className="bg-white" />

      <FaqSection faqs={PRENATAL_FAQS} title="Prenatal Yoga FAQs" />

      <Footer />
    </main>
  );
}
