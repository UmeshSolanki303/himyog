import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Monitor,
  Users,
  CheckCircle2,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { getCourseBySlug } from "@/lib/courses";
import { listSiteImages } from "@/lib/admin-db";
import { CtaButton } from "@/components/CtaButton";
import { Footer } from "@/components/Footer";
import { MobileEnrollBar } from "@/components/MobileEnrollBar";
import { GallerySection } from "@/components/GallerySection";
import { CourseGallerySection } from "@/components/CourseGallerySection";
import { LocationMap } from "@/components/LocationMap";
import { RetreatInquiryForm } from "@/components/RetreatInquiryForm";

// Real gallery photos can be added any time from /admin/gallery — revalidate
// periodically rather than only at build time, or newly uploaded photos
// wouldn't show up until the next deploy.
export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://matrushaktiyog.com";

// Real course data — lib/courses.ts stays the single source of truth for
// duration, format, highlights, curriculum, and pricing, so this page can
// never drift from what's actually offered.
const course = getCourseBySlug("pregnancy-wellness")!;

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1624013599822-1faf520c67d1?w=1600&q=80";

const GALLERY_ITEMS = [
  {
    src: "https://images.unsplash.com/photo-1624013599822-1faf520c67d1?w=600&q=80",
    alt: "Pregnant woman seated in a calm, meditative pose",
    caption: "A moment of stillness",
    description:
      "Guided meditation and breathwork sessions help you arrive fully present — calm, centered, and ready to receive whatever the day's session holds.",
  },
  {
    src: "https://images.unsplash.com/photo-1457342813143-a1ae27448a82?w=600&q=80",
    alt: "Pregnant woman gently cradling her belly",
    caption: "Carrying new life, gently",
    description:
      "Every session honours exactly where you are in pregnancy, with care and modifications specific to your trimester.",
  },
  {
    src: "https://images.unsplash.com/photo-1618069174728-309412f47736?w=600&q=80",
    alt: "Pregnant woman stretching in a guided movement session",
    caption: "Movement, safely guided",
    description:
      "Gentle, instructor-led movement to ease tension and build the strength your body draws on through birth and beyond.",
  },
  {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    alt: "A nourishing, colourful bowl of fresh food",
    caption: "Nourishment that supports you",
    description:
      "Evidence-based nutrition guidance woven into the retreat — because wellness starts with what feeds you.",
  },
  {
    src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80",
    alt: "Hands-on newborn care guidance",
    caption: "Newborn care, hands-on",
    description:
      "Practical, hands-on guidance on newborn care essentials, so you feel prepared rather than overwhelmed.",
  },
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    alt: "A calm space for rest and recovery",
    caption: "Space to simply rest",
    description:
      "Retreat time isn't only information — it's permission to slow down, breathe, and be held for a while.",
  },
];

const FAQS = [
  {
    q: "Who is the retreat for?",
    a: `${course.level}. Whether it's your first pregnancy or your third, every session is paced for where you are right now.`,
  },
  {
    q: "How often does it run?",
    a: `${course.duration} — this isn't a single one-off event, so you can join the retreat and continue with ongoing sessions through pregnancy and into the fourth trimester.`,
  },
  {
    q: "Is it online or in person?",
    a: `${course.format}. Join live from anywhere, or in person when you're able to visit us in Rishikesh.`,
  },
  {
    q: "What does it cost?",
    a: `${course.price}. Send an enquiry below and we'll share current pricing and the next available dates.`,
  },
  {
    q: "Do I need prior yoga experience?",
    a: "No. The retreat is built for every level — from complete beginners to experienced practitioners — with modifications offered throughout.",
  },
];

export const metadata: Metadata = {
  title: course.title,
  description: course.shortDescription,
  alternates: { canonical: `${siteUrl}/retreat` },
  openGraph: {
    title: `${course.title} | Matrushakti Yog`,
    description: course.shortDescription,
    url: `${siteUrl}/retreat`,
    images: [{ url: course.image, width: 800, height: 600, alt: course.title }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function RetreatPage() {
  const siteImages = await listSiteImages().catch(
    () => ({}) as Awaited<ReturnType<typeof listSiteImages>>,
  );
  const heroImage = siteImages["retreat-hero"]?.url ?? HERO_IMAGE;
  return (
    <main className="pb-20 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/50 to-charcoal/20" />
        <div
          className="relative mx-auto w-full px-4 sm:px-6 pb-12 pt-32"
          style={{ maxWidth: "84rem" }}
        >
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-beige-200 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Courses
          </Link>
          {course.badge && (
            <span className="block mb-3">
              <span className="bg-sage-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {course.badge}
              </span>
            </span>
          )}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium mb-3">
            {course.title}
          </h1>
          <p className="text-beige-200 text-lg sm:text-xl mb-6">
            {course.subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 text-sm text-beige-100 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
              <Clock className="w-4 h-4 shrink-0" />
              {course.duration}
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-beige-100 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
              <Monitor className="w-4 h-4 shrink-0" />
              {course.format}
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-beige-100 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
              <Users className="w-4 h-4 shrink-0" />
              {course.level}
            </span>
          </div>
        </div>
      </section>

      {/* About + highlights + curriculum */}
      <section className="py-12 sm:py-20 bg-white w-full">
        <div
          className="mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14"
          style={{ maxWidth: "84rem" }}
        >
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mb-4">
                About This Retreat
              </h2>
              <p className="text-slate-muted leading-relaxed text-base sm:text-lg">
                {course.description}
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mb-5">
                What You&apos;ll Gain
              </h2>
              <ul className="space-y-3">
                {course.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-charcoal-light text-base leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mb-5">
                <span className="inline-flex items-center gap-3">
                  <BookOpen className="w-7 h-7 text-sage-500" />
                  What&apos;s Covered
                </span>
              </h2>
              <div className="rounded-2xl border border-beige-200 overflow-hidden">
                {course.curriculum.map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-4 px-5 py-4 text-sm sm:text-base text-charcoal-light ${
                      i < course.curriculum.length - 1 ? "border-b border-beige-200" : ""
                    } ${i % 2 === 0 ? "bg-white" : "bg-beige-50"}`}
                  >
                    <span className="w-7 h-7 rounded-full bg-sage-100 text-sage-700 text-xs font-semibold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — Enroll card */}
          <aside className="lg:col-span-1">
            <div className="sticky top-[calc(var(--header-height)+1.5rem)] rounded-3xl bg-beige-50 border border-beige-200 shadow-soft p-6 sm:p-8 space-y-6">
              <div>
                <p className="text-xs text-slate-soft uppercase tracking-wider font-medium mb-1">
                  Pricing
                </p>
                <p className="font-serif text-2xl text-charcoal font-medium">{course.price}</p>
              </div>

              <ul className="space-y-2">
                {[
                  { label: "Duration", value: course.duration },
                  { label: "Format", value: course.format },
                  { label: "Level", value: course.level },
                ].map(({ label, value }) => (
                  <li
                    key={label}
                    className="flex justify-between text-sm border-b border-beige-200 pb-2 last:border-0"
                  >
                    <span className="text-slate-muted">{label}</span>
                    <span className="text-charcoal font-medium text-right ml-4">{value}</span>
                  </li>
                ))}
              </ul>

              <CtaButton
                href={course.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center text-base font-semibold text-white bg-sage-500 hover:bg-sage-600 rounded-2xl px-6 py-3.5 transition-colors shadow-sm"
                wrapperClassName="w-full rounded-2xl"
              >
                Enroll Now — Open Form
              </CtaButton>
              <a
                href="#enquire"
                className="block text-center text-sm text-sage-600 hover:text-sage-700 font-medium transition-colors"
              >
                Or send us an enquiry first ↓
              </a>

              <div className="pt-2 border-t border-beige-200">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 text-sm text-sage-600 hover:text-sage-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Browse all courses
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Gallery */}
      <GallerySection
        title="A retreat that holds you, not just informs you"
        items={GALLERY_ITEMS}
        className="bg-beige-50"
      />

      <CourseGallerySection courseSlug="pregnancy-wellness" className="bg-white" />

      {/* Location */}
      <LocationMap
        title="Where the Retreat Happens"
        description="In-person sessions are hosted at our studio in Rishikesh — join us there, or live online from wherever you are."
        className="bg-white"
      />

      {/* FAQ */}
      <section className="py-12 sm:py-20 bg-beige-50 w-full">
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "48rem" }}>
          <div className="text-center mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-600 mb-4">
              Questions
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">
              Frequently Asked
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {FAQS.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl bg-white border border-beige-200/70 shadow-soft p-5 sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-sage-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-charcoal">{f.q}</p>
                    <p className="mt-1.5 text-slate-muted text-sm leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section className="py-12 sm:py-20 bg-white w-full">
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "40rem" }}>
          <RetreatInquiryForm />
        </div>
      </section>

      <Footer />
      <MobileEnrollBar title={course.title} price={course.price} formUrl={course.formUrl} />
    </main>
  );
}
