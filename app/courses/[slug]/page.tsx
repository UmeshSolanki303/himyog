import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Monitor, Users, CheckCircle2, BookOpen } from "lucide-react";
import { courses, getCourseBySlug } from "@/lib/courses";
import { CtaButton } from "@/components/CtaButton";
import { Footer } from "@/components/Footer";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = getCourseBySlug(params.slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.shortDescription,
  };
}

export default function CourseDetailPage({ params }: Props) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${course.image})` }}
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

          {/* Quick-info chips */}
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

      {/* Body */}
      <section className="py-12 sm:py-20 bg-white w-full">
        <div
          className="mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14"
          style={{ maxWidth: "84rem" }}
        >
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mb-4">
                About This Course
              </h2>
              <p className="text-slate-muted leading-relaxed text-base sm:text-lg">
                {course.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mb-5">
                What You&apos;ll Gain
              </h2>
              <ul className="space-y-3">
                {course.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-charcoal-light text-base leading-relaxed">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mb-5">
                <span className="inline-flex items-center gap-3">
                  <BookOpen className="w-7 h-7 text-sage-500" />
                  Course Curriculum
                </span>
              </h2>
              <div className="rounded-2xl border border-beige-200 overflow-hidden">
                {course.curriculum.map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-4 px-5 py-4 text-sm sm:text-base text-charcoal-light ${
                      i < course.curriculum.length - 1
                        ? "border-b border-beige-200"
                        : ""
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
                <p className="font-serif text-2xl text-charcoal font-medium">
                  {course.price}
                </p>
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
                    <span className="text-charcoal font-medium text-right ml-4">
                      {value}
                    </span>
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
              <p className="text-xs text-slate-soft text-center">
                Enrollment form opens in a new tab
              </p>

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

      <Footer />
    </main>
  );
}
