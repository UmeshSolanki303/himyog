import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContentSection, ContentVideo } from "@/components/ContentSection";
import { GallerySection } from "@/components/GallerySection";
import { Footer } from "@/components/Footer";

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

export const metadata: Metadata = {
  title: "Prenatal Yoga | Him Yoga",
  description:
    "Safe prenatal yoga for every trimester. Ease discomfort, build strength, and prepare for birth with expert-led classes.",
};

// Replace with your image path (/hero-prenatal.jpg) or external URL
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80";

export default function PrenatalPage() {
  return (
    <main className="pb-12 sm:pb-16 lg:pb-20">
      <PageHero
        title="Prenatal Yoga"
        description="Safe, gentle yoga for every trimester. Ease discomfort, build strength, and prepare your body and mind for birth in a supportive environment."
        imageSrc={HERO_IMAGE}
      />
      <ContentSection title="What to expect" className="bg-beige-50">
        <p className="leading-relaxed mb-6">
          Our prenatal classes are designed to support you through each
          trimester with safe, adapted poses that ease common discomforts, build
          strength, and prepare your body and mind for birth. All classes are
          suitable for beginners and experienced practitioners alike. You will
          learn breathwork, pelvic floor awareness, and relaxation techniques
          that support labour and recovery.
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

      <ContentSection title="Safe for all trimesters" className="bg-white">
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
        title="Watch: Introduction to prenatal yoga"
        className="bg-beige-50"
      >
        <ContentVideo src="" title="Introduction to prenatal yoga" />
      </ContentSection>

      <Footer />
    </main>
  );
}
