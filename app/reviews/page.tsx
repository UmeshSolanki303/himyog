"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  Star,
  X,
  ArrowLeft,
  PenLine,
  MapPin,
  ZoomIn,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { WriteReviewModal } from "@/components/WriteReviewModal";
import { useReviews } from "@/lib/useReviews";
import { COURSES, COURSE_META, reviewerLabel, type Review } from "@/lib/reviews-data";

// ─── Star display ─────────────────────────────────────────────────────────────
function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`${cls} ${i <= rating ? "text-gold-400 fill-gold-400" : "text-beige-300 fill-beige-300"}`} />
      ))}
    </div>
  );
}

// ─── Photo lightbox ───────────────────────────────────────────────────────────
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.img
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        src={src}
        alt="Review photo"
        className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
        onClick={e => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

// ─── Review card ──────────────────────────────────────────────────────────────
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const shouldReduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const meta = COURSE_META[review.courseSlug];
  const isLong = review.text.length > 220;
  const displayText = isLong && !expanded ? review.text.slice(0, 220) + "…" : review.text;
  const label = reviewerLabel(review.courseSlug);

  const formatted = new Date(review.date).toLocaleDateString("en-IN", {
    month: "long", year: "numeric",
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.4), ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={shouldReduce ? {} : { y: -4, transition: { duration: 0.25 } }}
        className="flex flex-col rounded-3xl bg-white border border-sage-100/80 shadow-soft hover:shadow-soft-lg hover:border-sage-200 transition-all duration-300 overflow-hidden"
      >
        {/* Photo header */}
        {review.photo && (
          <div
            className="relative aspect-[16/9] overflow-hidden cursor-zoom-in group"
            onClick={() => setLightbox(review.photo!)}
          >
            <img
              src={review.photo}
              alt={`Review by ${review.name}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white drop-shadow" />
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1 p-5 sm:p-6 gap-3">
          {/* Header row */}
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-sage-200 via-sage-400 to-sage-600 flex items-center justify-center">
              <span className="text-white text-xs font-serif font-semibold select-none">
                {review.initials}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-charcoal text-sm leading-tight">{review.name}</p>
              <div className="flex items-center gap-1 mt-0.5 text-slate-soft text-xs">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{review.city}, {review.state}</span>
              </div>
            </div>
            {/* Course badge */}
            <span className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full ${meta.badge}`}>
              {meta.title}
            </span>
          </div>

          {/* Stars + reviewer label + date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stars rating={review.rating} />
              <span className="text-[10px] font-medium text-slate-soft">· {label}</span>
            </div>
            <span className="text-xs text-slate-soft">{formatted}</span>
          </div>

          {/* Divider */}
          <div className="h-px bg-beige-200/80" />

          {/* Review text */}
          <div className="flex-1">
            <p className="text-slate-muted text-sm leading-relaxed">
              &ldquo;{displayText}&rdquo;
            </p>
            {isLong && (
              <button
                onClick={() => setExpanded(v => !v)}
                className="mt-1.5 text-sage-600 text-xs font-medium hover:text-sage-700 transition-colors"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────
function StatsBar({ reviews }: { reviews: Review[] }) {
  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const counts = COURSES.filter(c => c.slug !== "all").map(c => ({
    label: c.short,
    count: reviews.filter(r => r.courseSlug === c.slug).length,
    dot: COURSE_META[c.slug as Review["courseSlug"]].dot,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-wrap items-center gap-4 sm:gap-8 py-5 px-5 sm:px-7 rounded-2xl bg-white/70 border border-sage-100/80 shadow-soft backdrop-blur-sm"
    >
      {/* Average */}
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">{avg}</span>
        <div className="flex flex-col gap-0.5">
          <Stars rating={Math.round(Number(avg))} size="md" />
          <span className="text-xs text-slate-soft">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      <div className="h-10 w-px bg-beige-200 hidden sm:block" />

      {/* Per-course counts */}
      <div className="flex flex-wrap gap-4 sm:gap-6">
        {counts.map(({ label, count, dot }) => (
          <div key={label} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dot}`} />
            <span className="text-sm text-charcoal font-medium">{count}</span>
            <span className="text-xs text-slate-soft">{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ReviewsPage() {
  const shouldReduce = useReducedMotion();
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const { reviews, addReview } = useReviews();

  const filtered = filter === "all" ? reviews : reviews.filter(r => r.courseSlug === filter);

  const handleSubmitted = useCallback((review: Review) => {
    addReview(review);
  }, [addReview]);

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <header className="relative w-full bg-beige-100 border-b border-beige-200/80 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 65% 100% at 95% 50%, rgba(184,64,112,0.07) 0%, transparent 60%),
              radial-gradient(ellipse 45% 70% at 0% 100%, rgba(212,164,40,0.05) 0%, transparent 55%)
            `,
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto px-4 sm:px-6 pt-8 pb-10 sm:pt-12 sm:pb-16" style={{ maxWidth: "84rem" }}>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 text-xs sm:text-sm font-medium mb-8 sm:mb-10 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />Back to home
            </Link>
          </motion.div>

          <motion.div
            className="h-[2px] rounded-full bg-gradient-to-r from-sage-500 via-sage-400 to-transparent mb-6"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ width: "4rem" }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-charcoal leading-[1.08] tracking-tight"
          >
            Real Stories &amp;{" "}
            <span className="text-shimmer italic">Reviews</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 flex items-stretch gap-4 max-w-2xl"
          >
            <div className="w-[3px] shrink-0 rounded-full bg-gradient-to-b from-sage-500 to-sage-200" />
            <p className="text-charcoal-light text-base sm:text-lg leading-relaxed">
              Honest experiences from the mothers and students who&rsquo;ve walked this journey with us.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.48 }}
            className="mt-8 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-sage-500" />
            <span className="w-2 h-2 rounded-full bg-gold-400/70" />
            <span className="w-2 h-2 rounded-full bg-peach-300/80" />
            <span className="ml-2 h-px w-16 bg-beige-300" />
          </motion.div>
        </div>
      </header>

      {/* ── Content ───────────────────────────────────────────── */}
      <section
        className="w-full py-10 sm:py-16 pb-28"
        style={{ background: "linear-gradient(180deg, #FAF5EF 0%, #F5EAE0 100%)" }}
      >
        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "84rem" }}>
          <div className="flex flex-col gap-8">

            {/* Stats */}
            <StatsBar reviews={reviews} />

            {/* Filter tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {COURSES.map(c => (
                <button
                  key={c.slug}
                  onClick={() => setFilter(c.slug)}
                  className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sage-400/60 ${
                    filter === c.slug
                      ? "bg-sage-600 text-white shadow-soft"
                      : "bg-white/70 text-charcoal/70 border border-sage-100 hover:bg-white hover:text-charcoal"
                  }`}
                >
                  {c.label}
                  {c.slug !== "all" && (
                    <span className={`ml-2 text-xs font-normal ${filter === c.slug ? "text-white/70" : "text-slate-soft"}`}>
                      {reviews.filter(r => r.courseSlug === c.slug).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Review grid */}
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center py-20 gap-4"
                >
                  <span className="text-5xl">🌸</span>
                  <p className="text-charcoal font-serif text-xl">No reviews yet for this course</p>
                  <p className="text-slate-muted text-sm">Be the first to share your experience!</p>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="mt-2 rounded-2xl bg-sage-600 text-white px-6 py-3 text-sm font-semibold hover:bg-sage-700 transition-colors"
                  >
                    Add the first review
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={filter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                >
                  {filtered.map((review, i) => (
                    <ReviewCard key={review.id} review={review} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── Floating Add Review button ─────────────────────────── */}
      <div className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40">
        {!shouldReduce && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ background: "radial-gradient(circle, rgba(184,64,112,0.35) 0%, transparent 70%)", filter: "blur(12px)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
        )}
        <motion.button
          onClick={() => setModalOpen(true)}
          whileHover={shouldReduce ? {} : { scale: 1.05, y: -2 }}
          whileTap={shouldReduce ? {} : { scale: 0.97 }}
          className="relative inline-flex items-center gap-2 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white px-4 py-3 sm:px-5 sm:py-3.5 text-sm font-semibold shadow-soft-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2"
        >
          <PenLine className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Write a Review</span>
          <span className="sm:hidden">Review</span>
        </motion.button>
      </div>

      {/* ── Review modal ──────────────────────────────────────────── */}
      <WriteReviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitted={handleSubmitted}
      />
    </main>
  );
}
