"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "./SectionReveal";

interface ClassSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  imagePlaceholder: string;
  reverse?: boolean;
  formUrl?: string;
  formLabel?: string;
  ctaText?: string;
}

export function ClassSection({
  id,
  title,
  subtitle,
  description,
  bullets,
  imagePlaceholder,
  reverse = false,
  formUrl = "#",
  formLabel = "Register via Google Form",
  ctaText = "Open registration form",
}: ClassSectionProps) {
  return (
    <SectionReveal
      as="section"
      id={id}
      className={`py-12 sm:py-20 md:py-24 w-full ${reverse ? "bg-beige-50" : "bg-white"}`}
    >
      <div className=" mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: reverse ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className={reverse ? "lg:order-2" : ""}
          >
            <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl bg-beige-200 overflow-hidden shadow-soft flex items-center justify-center">
              {/* Placeholder: replace src with real image when ready */}
              <div className="w-full h-full flex items-center justify-center text-slate-soft text-center px-4 sm:px-6">
                <span className="text-sm sm:text-base lg:text-lg">
                  {imagePlaceholder}
                </span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={reverse ? "lg:order-1" : ""}
          >
            <p className="text-sage-600 font-medium uppercase tracking-wider text-sm mb-2">
              {subtitle}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal font-medium mb-3 sm:mb-4">
              {title}
            </h2>
            <p className="text-slate-muted text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
              {description}
            </p>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base">
              {bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-charcoal-light"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-sage-500 text-white px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium shadow-soft hover:bg-sage-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2"
              >
                {formLabel}
              </a>
              <span className="text-sm text-slate-muted self-center">
                {ctaText}
              </span>
            </div>
            {/* Optional: embed placeholder — uncomment and set formUrl to iframe src when you have the form ID */}
            {/* <div className="mt-8 rounded-2xl overflow-hidden border border-beige-300 aspect-[4/3] max-h-[360px]">
              <iframe
                src={formUrl}
                className="w-full h-full min-h-[360px]"
                frameBorder="0"
                title="Registration form"
              />
            </div> */}
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
}
