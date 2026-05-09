"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Monitor, ArrowRight } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { courses } from "@/lib/courses";

export function CoursesSection() {
  return (
    <SectionReveal
      as="section"
      className="py-12 sm:py-20 md:py-24 bg-beige-50 w-full"
      delay={0}
    >
      <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-charcoal font-medium">
            Our Courses
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-muted text-base sm:text-lg max-w-2xl mx-auto px-2">
            Structured programs designed to support every stage of your
            motherhood journey.
          </p>
        </motion.div>

        {/* Scrollable on mobile/tablet, grid on desktop */}
        <div className="grid grid-flow-col auto-cols-[85vw] sm:auto-cols-[55vw] lg:grid-flow-row lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 snap-x snap-mandatory lg:snap-none scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          {courses.map((course, index) => (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="snap-start flex flex-col h-full rounded-3xl overflow-hidden bg-white border border-beige-200/60 shadow-soft hover:shadow-soft-lg hover:border-sage-200 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                  style={{ backgroundImage: `url(${course.image})` }}
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
              <div className="flex flex-col flex-1 p-5 sm:p-6">
                <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-medium mb-1">
                  {course.title}
                </h3>
                <p className="text-sage-600 text-sm font-medium mb-3">
                  {course.subtitle}
                </p>

                {/* Detail chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 text-xs text-charcoal-light bg-beige-100 border border-beige-200 rounded-full px-3 py-1">
                    <Clock className="w-3 h-3 shrink-0" />
                    {course.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-charcoal-light bg-beige-100 border border-beige-200 rounded-full px-3 py-1">
                    <Monitor className="w-3 h-3 shrink-0" />
                    {course.format}
                  </span>
                </div>

                <p className="text-slate-muted text-sm leading-relaxed flex-1 mb-6">
                  {course.shortDescription}
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium text-sage-600 border border-sage-300 hover:bg-sage-50 rounded-xl px-4 py-2.5 transition-colors"
                  >
                    Course Details
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </Link>
                  <a
                    href={course.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center text-sm font-medium text-white bg-sage-500 hover:bg-sage-600 rounded-xl px-4 py-2.5 transition-colors"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-8 sm:mt-10"
        >
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sage-600 font-medium hover:text-sage-700 transition-colors text-sm sm:text-base"
          >
            View all courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
