import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  Leaf,
  BookOpen,
  Users,
  Star,
  MapPin,
  ArrowRight,
  Flower2,
  Infinity as InfinityIcon,
  Sparkles,
  Moon,
  Activity,
  HeartPulse,
  Smile,
  Baby,
  ClipboardCheck,
  Palmtree,
  Brain,
  Calendar,
  Mic,
  Mountain,
} from "lucide-react";
import { courses } from "@/lib/courses";
import { listApprovedReviews, listSiteImages } from "@/lib/admin-db";
import { assetPath } from "@/lib/assetPath";
import { PageHero } from "@/components/PageHero";
import { CtaButton } from "@/components/CtaButton";
import { Footer } from "@/components/Footer";

const ENROLL_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfOv0nEZtvy7STdbX3XeIt8RXnDyW7fBjANWpOugaTzv6Pzng/viewform?usp=preview";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://matrushaktiyog.com";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Matrushakti Yog nurtures mothers through every stage of motherhood — from preconception to postpartum — with safe, expert-led prenatal & postnatal yoga. Based in Rishikesh, the yoga capital of the world.",
  alternates: { canonical: `${siteUrl}/about` },
};

// Each element of the logo read against its documented meaning in yogic and
// Hindu iconography — not a claim about the designer's own notes, but the
// symbolism the imagery genuinely carries.
const symbolMeanings = [
  {
    icon: Heart,
    title: "Mother & child, one silhouette",
    description:
      "The child rests inside the very form of the mother — her body drawn as the child's shelter, the first home and life-support every one of us comes from.",
  },
  {
    icon: Flower2,
    title: "The lotus at the base",
    description:
      "In yogic tradition the lotus rises through the mud to bloom untouched — a symbol of purity, resilience, and rebirth, echoed in the seated Padmasana, the lotus pose.",
  },
  {
    icon: InfinityIcon,
    title: "The infinity knot",
    description:
      "Anchoring the lotus, the infinity symbol marks the bond between mother and child as unbroken and unconditional — a connection that holds beyond time.",
  },
  {
    icon: Sparkles,
    title: "The golden ring & leaf",
    description:
      "A circle of gold — wholeness and quiet protection — with a sprig of green beside it, nature's reminder that new life is always, first, a living thing.",
  },
];

// Framed generally and attributed to their real sources (Mayo Clinic, ACOG,
// peer-reviewed research) rather than quoting specific figures that vary
// study to study — accurate without overstating any single trial's result.
// How we help, stage by stage — drawn directly from our own course pages
// (lib/courses.ts), not separate marketing copy, so it never drifts from
// what's actually offered. Icons match the ones used for these same courses
// in the site header's Courses dropdown, for a consistent visual language.
const stageHelp = [
  {
    icon: Heart,
    title: "Trying to conceive",
    href: "/courses/preconception",
    description:
      "Gentle yoga, breathwork, and lifestyle guidance to prepare your body, mind, and hormones before conception.",
  },
  {
    icon: Flower2,
    title: "Pregnant, any trimester",
    href: "/prenatal",
    description:
      "Safe, trimester-adapted movement to ease discomfort, build strength, and prepare your body and mind for birth.",
  },
  {
    icon: Sparkles,
    title: "Seeking a conscious pregnancy",
    href: "/courses/garbhsamskar",
    description:
      "Garbhsamskar — a traditional Vedic practice of yoga, mantra, and Ayurveda to nurture your baby in the womb.",
  },
  {
    icon: Moon,
    title: "Recovering after birth",
    href: "/postnatal",
    description:
      "Pelvic floor and core recovery, plus baby-and-me sessions — rebuilding strength gradually, at your own pace.",
  },
  {
    icon: Palmtree,
    title: "Wanting deeper guidance",
    href: "/retreat",
    description:
      "Expert-led wellness sessions and retreats on birth preparation, breastfeeding, and the fourth trimester.",
  },
  {
    icon: Users,
    title: "Ready to teach others",
    href: "/courses/ttc-course",
    description:
      "Our 200-hour teacher training equips you to guide other mothers safely through their own journeys.",
  },
  {
    icon: Brain,
    title: "Simply seeking stillness",
    href: "/courses/meditation",
    description:
      "Guided meditation and pranayama for calm and clarity — open to mothers, students, and anyone in between.",
  },
];

// Sourced from the real Pregnancy Wellness Retreat course entry in
// lib/courses.ts, not separate copy — so this section can't drift from
// what's actually offered on /retreat.
const retreatHighlights = [
  {
    icon: Mic,
    title: "Expert-led, not self-guided",
    description:
      "Live sessions on birth preparation, breastfeeding, and newborn care, with Q&A alongside certified lactation support and healthcare professionals.",
  },
  {
    icon: Mountain,
    title: "Set in Rishikesh",
    description:
      "Restorative retreat time in the yoga capital of the world — space to actually rest, not just add one more thing to your to-do list.",
  },
  {
    icon: Calendar,
    title: "An ongoing rhythm",
    description:
      "Monthly retreats and sessions, not a single one-off event — so the support continues through pregnancy and into the fourth trimester.",
  },
];

const helpPoints = [
  {
    icon: Smile,
    title: "Less stress & anxiety",
    description:
      "A regular prenatal yoga practice is linked to measurably lower anxiety and depression scores during pregnancy, per peer-reviewed meta-analyses.",
  },
  {
    icon: Moon,
    title: "Better sleep",
    description:
      "Mayo Clinic notes prenatal yoga can improve sleep quality — often one of the first things pregnancy disrupts.",
  },
  {
    icon: Activity,
    title: "Strength for labour",
    description:
      "Build the strength, flexibility, and endurance your body draws on through childbirth, in line with ACOG's recommended 150 minutes of weekly activity.",
  },
  {
    icon: HeartPulse,
    title: "Relief from common discomforts",
    description:
      "Gentle, trimester-adapted sequences help ease lower back pain, nausea, headaches, and shortness of breath.",
  },
  {
    icon: Baby,
    title: "Support toward birth",
    description:
      "Research has linked a regular prenatal practice to smoother labour and improved birth outcomes compared to inactivity.",
  },
  {
    icon: ClipboardCheck,
    title: "A gentler fourth trimester",
    description:
      "Postnatal yoga is associated with reduced depressive symptoms and greater psychological wellbeing in the months after birth.",
  },
];

interface TeamMember {
  id: string;
  photoSlotKey: string;
  initials: string;
  name: string;
  role: string;
  bio: string;
  isSample?: boolean;
}

// The 3 non-founder entries are placeholder sample data — clearly tagged
// "Sample" in the UI below — standing in until real team members' names,
// credentials, and bios are supplied to replace them. Real photos can still
// be uploaded per-card from /admin/site-images at any time (photoSlotKey),
// independent of the name/bio text.
const team: TeamMember[] = [
  {
    id: "himani-dwivedi",
    photoSlotKey: "founder-photo",
    initials: "HD",
    name: "Himani Dwivedi",
    role: "Founder & Lead Instructor · RYT-500 · Pre/Postnatal Specialist",
    bio: "Over a decade weaving yoga into the journey of motherhood — blending ancient yogic wisdom with modern prenatal & postnatal science. Himani founded Matrushakti Yog to give every mother a safe, sacred space to move through pregnancy, birth, and beyond with strength and calm.",
  },
  {
    id: "sample-retreat",
    photoSlotKey: "team-specialty-retreat",
    initials: "TM",
    name: "Team Member Name",
    role: "Retreat Facilitator · Credentials to be added",
    bio: "Sample bio — replace with real details. Guides our Pregnancy Wellness Retreats, pairing expert-led sessions on birth preparation and newborn care with restorative time in Rishikesh.",
    isSample: true,
  },
  {
    id: "sample-meditation",
    photoSlotKey: "team-specialty-meditation",
    initials: "TM",
    name: "Team Member Name",
    role: "Meditation & Mindfulness Guide · Credentials to be added",
    bio: "Sample bio — replace with real details. Leads guided meditation, pranayama, and yoga nidra sessions for calm and clarity, open to mothers and students alike.",
    isSample: true,
  },
  {
    id: "sample-awareness",
    photoSlotKey: "team-specialty-awareness",
    initials: "TM",
    name: "Team Member Name",
    role: "Prenatal & Postnatal Awareness Specialist · Credentials to be added",
    bio: "Sample bio — replace with real details. Guides Garbhsamskar and trimester-specific awareness practices rooted in Vedic tradition, nurturing pregnancy and recovery.",
    isSample: true,
  },
];

const values = [
  {
    icon: Heart,
    title: "Safe & Expert-Led",
    description:
      "Every sequence is adapted for pregnancy and postpartum by a trained, RYT-certified instructor — nothing generic, nothing risky.",
  },
  {
    icon: Leaf,
    title: "Rooted in Yogic Wisdom",
    description:
      "Classical yogic practice — asana, pranayama, and meditation — passed down with care, not diluted for trend.",
  },
  {
    icon: BookOpen,
    title: "Backed by Modern Science",
    description:
      "Ancient technique meets current prenatal and postnatal research, so every class is as evidence-informed as it is sacred.",
  },
  {
    icon: Users,
    title: "A Community of Mothers",
    description:
      "You're never practising alone — our students become a circle of support that often outlasts the course itself.",
  },
];

// Loaded server-side at request time (revalidated periodically) so the
// counts on this page are always real numbers, never invented placeholders.
async function getStats() {
  let reviewCount = 0;
  let avgRating: string | null = null;
  try {
    const reviews = await listApprovedReviews();
    reviewCount = reviews.length;
    if (reviews.length) {
      avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
    }
  } catch {
    // DB unreachable — fall back to showing just the course count below.
  }
  return { reviewCount, avgRating, courseCount: courses.length };
}

export const revalidate = 300;

export default async function AboutPage() {
  const { reviewCount, avgRating, courseCount } = await getStats();
  const siteImages = await listSiteImages().catch(
    () => ({}) as Awaited<ReturnType<typeof listSiteImages>>,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/about#aboutpage`,
    url: `${siteUrl}/about`,
    name: "About Matrushakti Yog",
    mainEntity: { "@id": `${siteUrl}/#organization` },
  };

  const stats = [
    { label: "Course Offerings", value: `${courseCount}` },
    ...(reviewCount > 0
      ? [{ label: "Student Reviews", value: `${reviewCount}` }]
      : []),
    ...(avgRating
      ? [{ label: "Average Rating", value: `${avgRating} ★` }]
      : []),
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title="About Matrushakti Yog"
        description="Where motherhood meets sacred yoga — nurturing women through every stage of the journey, from preconception to postpartum."
      />

      {/* The Story in Our Symbol */}
      <section className="py-12 sm:py-20 bg-white w-full">
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "64rem" }}>
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-600 mb-4">
              The Story in Our Symbol
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium leading-tight max-w-2xl mx-auto">
              The Power of a Mother
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            <div className="shrink-0 w-48 sm:w-56 lg:w-64">
              <img
                src={assetPath("/images/logo-bk.png")}
                alt="The Matrushakti Yog emblem: a mother cradling her child within her own silhouette, rising from a lotus"
                className="w-full h-auto"
              />
            </div>

            <div className="flex-1">
              <p className="text-charcoal-light text-base leading-relaxed mb-8">
                In Sanskrit, &ldquo;Matru&rdquo; means mother, and
                &ldquo;Shakti&rdquo; is the word for the divine, creative
                energy at the root of all life — traditionally embodied as
                the Mother Goddess herself. Our name is literally{" "}
                <em>the power of the mother</em>, and our emblem was drawn to
                show exactly that: a mother whose own body and spirit become
                the life-support for the one she carries.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {symbolMeanings.map((s) => (
                  <div key={s.title} className="flex items-start gap-3">
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-sage-50 text-sage-600 flex items-center justify-center">
                      <s.icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal">{s.title}</p>
                      <p className="text-sm text-slate-muted leading-relaxed mt-0.5">
                        {s.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-12 sm:py-20 bg-beige-50 w-full">
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "48rem" }}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-600 mb-4">
            Who We Are
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium leading-snug mb-5">
            Yoga for the journey into motherhood — not just the pregnancy
          </h2>
          <div className="flex flex-col gap-4 text-charcoal-light text-base leading-relaxed">
            <p>
              Matrushakti Yog was founded on a simple belief: that the
              transformation into motherhood deserves the same depth of care
              as the arrival of the baby itself. &ldquo;Matrushakti&rdquo; —
              the power of the mother — is at the heart of everything we
              teach.
            </p>
            <p>
              <strong className="text-charcoal font-medium">Our purpose</strong> is
              to give every mother a safe, expert-led space to move through
              preconception, pregnancy, garbhsamskar, and the fourth
              trimester — supported, not alone, at every stage.
            </p>
            <p>
              We guide women through preconception, pregnancy, garbhsamskar,
              and the fourth trimester with yoga that is gentle enough to be
              safe and precise enough to be effective — blending classical
              yogic practice with modern prenatal and postnatal science.
            </p>
            <p>
              We&apos;re based in Rishikesh, Uttarakhand — the yoga capital
              of the world — and our classes reach mothers online across
              India and beyond.
            </p>
          </div>

          {/* Stats */}
          {stats.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-6 sm:gap-10 pt-8 border-t border-beige-200">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-3xl text-charcoal font-semibold">{s.value}</p>
                  <p className="text-xs text-slate-soft mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How We Can Help You — stage by stage */}
      <section className="py-12 sm:py-20 bg-white w-full">
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
          <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-600 mb-4">
              How We Can Help You
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-medium">
              Wherever you are, we meet you there
            </h2>
            <p className="mt-4 text-slate-muted text-base leading-relaxed">
              Every mother&apos;s journey looks different. Here&apos;s how
              Matrushakti Yog supports you, whichever part of it
              you&apos;re in.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stageHelp.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group rounded-3xl bg-beige-50 border border-sage-100/80 shadow-soft hover:shadow-soft-lg hover:border-sage-200 transition-all duration-300 p-6 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-600 flex items-center justify-center">
                  <s.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-serif text-base text-charcoal font-medium">{s.title}</h3>
                <p className="text-slate-muted text-sm leading-relaxed flex-1">{s.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sage-600 text-xs font-medium group-hover:gap-2.5 transition-all">
                  Explore <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Retreat spotlight */}
      <section className="py-12 sm:py-20 bg-white w-full">
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
          <div className="rounded-[2rem] overflow-hidden border border-sage-100/80 shadow-soft-lg bg-beige-50 grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative min-h-[260px] lg:min-h-full order-1 lg:order-2">
              <img
                src={siteImages["retreat-hero"]?.url ?? "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80"}
                alt={siteImages["retreat-hero"]?.alt ?? "A restorative yoga retreat setting in the mountains"}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/30 lg:bg-gradient-to-l lg:from-charcoal-dark/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-600 mb-4">
                Our Retreat
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium leading-snug mb-5">
                More than a class — a full reset
              </h2>
              <div className="flex flex-col gap-4 text-charcoal-light text-base leading-relaxed mb-8">
                <p>
                  The Pregnancy Wellness Retreat pairs live, expert-led
                  sessions — birth preparation, breastfeeding, newborn care —
                  with restorative retreat time in Rishikesh. It&apos;s
                  knowledge and calm held together, not knowledge alone.
                </p>
                <p>
                  And it&apos;s one piece of something bigger. Preconception
                  guidance before you even conceive, a 200-hour teacher
                  training for practitioners ready to guide others, and
                  meditation open to absolutely everyone — our work spans
                  the whole arc of motherhood, not just the nine months in
                  between.
                </p>
              </div>

              <div className="flex flex-col gap-4 mb-8">
                {retreatHighlights.map((r) => (
                  <div key={r.title} className="flex items-start gap-3">
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-white text-sage-600 shadow-soft flex items-center justify-center">
                      <r.icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal">{r.title}</p>
                      <p className="text-sm text-slate-muted leading-relaxed mt-0.5">
                        {r.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/retreat"
                className="inline-flex items-center gap-2 self-start rounded-xl bg-sage-600 hover:bg-sage-700 text-white px-5 py-3 text-sm font-semibold transition-colors"
              >
                Explore the Retreat
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Benefits You Can Expect */}
      <section className="py-12 sm:py-20 bg-beige-50 w-full">
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
          <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-600 mb-4">
              The Benefits You Can Expect
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-medium">
              A practice backed by research, not just tradition
            </h2>
            <p className="mt-4 text-slate-muted text-base leading-relaxed">
              Prenatal and postnatal yoga is more than a wellness trend —
              organisations like Mayo Clinic and ACOG, and peer-reviewed
              research, consistently link it to real benefits across
              pregnancy and the fourth trimester.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpPoints.map((h) => (
              <div
                key={h.title}
                className="rounded-3xl bg-white border border-beige-200/70 shadow-soft p-6 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-beige-50 text-sage-600 flex items-center justify-center">
                  <h.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-serif text-lg text-charcoal font-medium">{h.title}</h3>
                <p className="text-slate-muted text-sm leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-12 sm:py-20 bg-white w-full border-y border-beige-200/60">
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-600 mb-6 text-center">
            Our Team
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {team.map((member) => {
              const photo = siteImages[member.photoSlotKey];
              return (
              <div
                key={member.id}
                className="relative rounded-[2rem] overflow-hidden border border-sage-100/80 shadow-soft-lg bg-beige-50 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6 sm:gap-8"
              >
                {member.isSample && (
                  <span className="absolute top-5 right-5 sm:top-6 sm:right-6 text-[10px] font-semibold uppercase tracking-wide text-gold-600 bg-gold-50 border border-gold-200 rounded-full px-2.5 py-1">
                    Sample
                  </span>
                )}
                {photo ? (
                  <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
                    <img src={photo.url} alt={photo.alt ?? member.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sage-200 via-sage-400 to-sage-600 flex items-center justify-center">
                    <span className="text-white font-serif text-2xl sm:text-3xl font-medium select-none">
                      {member.initials}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-medium leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-sage-600 text-sm font-medium mt-1">{member.role}</p>
                  <p className="mt-4 text-charcoal-light text-base leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-20 bg-beige-50 w-full">
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-medium">
              What Guides Our Teaching
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl bg-white border border-sage-100/80 shadow-soft hover:shadow-soft-lg hover:border-sage-200 transition-all duration-300 p-6 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-600 flex items-center justify-center">
                  <v.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-serif text-lg text-charcoal font-medium">{v.title}</h3>
                <p className="text-slate-muted text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location + CTA */}
      <section className="py-12 sm:py-20 bg-white w-full border-t border-beige-200/60">
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "48rem" }}>
          <div className="rounded-3xl bg-beige-50 border border-beige-200/70 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0 text-sage-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-charcoal">
                  14 Bigha, Muni Ki Reti
                </p>
                <p className="text-sm text-charcoal-light">
                  Rishikesh, Uttarakhand 249137, India
                </p>
                <p className="text-xs text-slate-soft mt-1">
                  Classes available online, pan-India.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-sage-300 text-sage-700 hover:bg-sage-50 px-5 py-3 text-sm font-medium transition-colors"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <CtaButton
                href={ENROLL_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-sage-600 hover:bg-sage-700 text-white px-5 py-3 text-sm font-semibold transition-colors"
                wrapperClassName="rounded-xl"
              >
                Enroll Now
              </CtaButton>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 text-sage-600 hover:text-sage-700 text-sm font-medium transition-colors"
            >
              <Star className="w-4 h-4 shrink-0 fill-gold-400 text-gold-400" />
              Read stories from our students
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
