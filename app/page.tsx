import { Hero } from "@/components/Hero";
import { CardsSection } from "@/components/CardsSection";
import { Benefits } from "@/components/Benefits";
import { TeamSection } from "@/components/TeamSection";
import { ClassSection } from "@/components/ClassSection";
import { CoursesSection } from "@/components/CoursesSection";
import { ReviewSection } from "@/components/ReviewSection";
import { Footer } from "@/components/Footer";

// Placeholder URLs — replace with your Google Form links when ready
const PRENATAL_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfOv0nEZtvy7STdbX3XeIt8RXnDyW7fBjANWpOugaTzv6Pzng/viewform?usp=preview";
const POSTNATAL_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfOv0nEZtvy7STdbX3XeIt8RXnDyW7fBjANWpOugaTzv6Pzng/viewform?usp=preview";

export default function Home() {
  return (
    <main>
      <Hero />
      <CardsSection />
      <Benefits />
      <CoursesSection />
      <TeamSection />
      <ClassSection
        id="prenatal"
        title="Prenatal Yoga"
        subtitle="During pregnancy"
        description="Our prenatal classes are designed to support you through each trimester with safe, adapted poses that ease discomfort, build strength, and prepare your body and mind for birth. All classes are suitable for beginners and experienced practitioners alike."
        bullets={[
          "Safe for all trimesters with modifications offered",
          "Focus on breathwork, pelvic floor awareness, and relaxation",
          "Gentle strength and flexibility to ease back pain and improve posture",
          "Community of expecting parents in a nurturing environment",
        ]}
        imagePlaceholder="Prenatal yoga image — add your image here"
        reverse={false}
        formUrl={PRENATAL_FORM_URL}
        formLabel="Register for Prenatal Classes"
        ctaText="Opens in a new tab"
      />
      <ClassSection
        id="postnatal"
        title="Postnatal Yoga"
        subtitle="After birth"
        description="Recover gently and rebuild strength with our postnatal program. We focus on pelvic floor health, core recovery, and optional baby-and-me sessions so you can bond while you move. Start when you feel ready—we meet you where you are."
        bullets={[
          "Pelvic floor and core recovery with evidence-based practices",
          "Baby-and-me classes so you can bring your little one",
          "Adapted for cesarean and vaginal birth recovery",
          "Restore energy and find calm in the fourth trimester",
        ]}
        imagePlaceholder="Postnatal yoga image — add your image here"
        reverse={true}
        formUrl={POSTNATAL_FORM_URL}
        formLabel="Register for Postnatal Classes"
        ctaText="Opens in a new tab"
      />
      <ReviewSection />
      <Footer />
    </main>
  );
}
