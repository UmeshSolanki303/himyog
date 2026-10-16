import type { Metadata } from "next";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Clock, Monitor } from "lucide-react";
import { courses, getCourseUrl } from "@/lib/courses";
import { getCourseHeroSlotKey } from "@/lib/site-images";
import { listSiteImages } from "@/lib/admin-db";
import { CtaButton } from "@/components/CtaButton";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = pageMetadata(PAGE_SEO.courses);

// Real course photos can be added any time from /admin/site-images —
// revalidate periodically rather than only at build time.
export const revalidate = 60;

export default async function CoursesPage() {
  const siteImages = await listSiteImages().catch(
    () => ({}) as Awaited<ReturnType<typeof listSiteImages>>,
  );

  return (
    <main>
      <PageHero
        title="Our Courses"
        description="Fertility yoga, prenatal yoga, Garbh Sanskar, postnatal recovery and prenatal yoga teacher training — structured programs for every stage, live online and in Rishikesh."
      />

      <section className="py-12 sm:py-20 md:py-24 bg-beige-50 w-full">
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.slug}
                className="flex flex-col h-full rounded-3xl overflow-hidden bg-beige-50 border border-beige-200/60 shadow-soft hover:shadow-soft-lg hover:border-sage-200 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden shrink-0 group">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${siteImages[getCourseHeroSlotKey(course.slug)]?.url ?? course.image})`,
                    }}
                    aria-hidden
                  />
                  {course.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-sage-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        {course.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h2 className="font-serif text-2xl text-charcoal font-medium mb-1">
                    {course.title}
                  </h2>
                  <p className="text-sage-600 text-sm font-medium mb-3">
                    {course.subtitle}
                  </p>

                  {/* Detail chips */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-xs text-charcoal-light bg-white border border-beige-200 rounded-full px-3 py-1">
                      <Clock className="w-3 h-3 shrink-0" />
                      {course.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-charcoal-light bg-white border border-beige-200 rounded-full px-3 py-1">
                      <Monitor className="w-3 h-3 shrink-0" />
                      {course.format}
                    </span>
                  </div>

                  <p className="text-slate-muted text-sm leading-relaxed flex-1 mb-6">
                    {course.shortDescription}
                  </p>

                  {/* Highlights preview */}
                  <ul className="space-y-1.5 mb-6">
                    {course.highlights.slice(0, 3).map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-charcoal-light"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* CTA buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Link
                      href={getCourseUrl(course.slug)}
                      className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium text-sage-600 border border-sage-300 hover:bg-sage-50 rounded-xl px-4 py-2.5 transition-colors"
                    >
                      Course Details
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                    <CtaButton
                      href={course.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center text-sm font-medium text-white bg-sage-500 hover:bg-sage-600 rounded-xl px-4 py-2.5 transition-colors"
                      wrapperClassName="flex-1 rounded-xl"
                    >
                      Enroll Now
                    </CtaButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
