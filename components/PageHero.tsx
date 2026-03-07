"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface PageHeroProps {
  title: string;
  description: string;
  /** Optional: URL for background image. Add your image to /public and use e.g. "/hero-prenatal.jpg" or use an external URL. */
  imageSrc?: string;
}

export function PageHero({ title, description, imageSrc }: PageHeroProps) {
  return (
    <header className="relative min-h-[50vh] flex items-end overflow-hidden w-full">
      {/* Background image with low-opacity overlay */}
      <div className="absolute inset-0 z-0">
        {imageSrc ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageSrc})` }}
              role="img"
              aria-hidden
            />
            <div className="absolute inset-0 bg-charcoal-dark/65" aria-hidden />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sage-500 to-sage-800" />
        )}
      </div>

      {/* Left-side content */}
      <div
        className="relative z-10 w-full mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-20 pt-24 sm:pt-28"
        style={{ maxWidth: "84rem" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-beige-200 hover:text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            Back to home
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-medium leading-tight">
            {title}
          </h1>
          <p className="mt-3 sm:mt-4 text-beige-200 text-base sm:text-lg leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </header>
  );
}
