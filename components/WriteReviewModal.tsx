"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Star,
  X,
  Camera,
  Upload,
  CheckCircle2,
  Loader2,
  PenLine,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { COURSE_OPTIONS, type Review } from "@/lib/reviews-data";

// ─── Star picker ──────────────────────────────────────────────────────────────
function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110 focus:outline-none"
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              (hovered || value) >= i ? "text-gold-400 fill-gold-400" : "text-beige-300 fill-beige-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

const inputCls =
  "w-full rounded-2xl border border-sage-100 bg-white/80 px-4 py-3 text-charcoal text-sm placeholder:text-slate-soft focus:outline-none focus:ring-2 focus:ring-sage-400/60 focus:border-sage-300 transition-all duration-200";

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-sage-600 mb-1.5">
      {label}
      {required && <span className="text-sage-500 ml-0.5">*</span>}
    </span>
  );
}

interface WriteReviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitted: (review: Review) => void;
}

export function WriteReviewModal({ open, onClose, onSubmitted }: WriteReviewModalProps) {
  const shouldReduce = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [rating, setRating] = useState(5);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    city: "",
    state: "",
    courseSlug: "",
    text: "",
  });

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStatus("idle");
        setRating(5);
        setPhoto(null);
        setPreview(null);
        setError("");
        setForm({ name: "", city: "", state: "", courseSlug: "", text: "" });
      }, 300);
    }
  }, [open]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Photo must be under 5 MB");
      return;
    }
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.courseSlug) {
      setError("Please select a course");
      return;
    }
    setStatus("loading");
    setError("");

    const courseTitle =
      COURSE_OPTIONS.find((c) => c.slug === form.courseSlug)?.title ?? form.courseSlug;
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("city", form.city);
    fd.append("state", form.state);
    fd.append("courseSlug", form.courseSlug);
    fd.append("courseTitle", courseTitle);
    fd.append("rating", String(rating));
    fd.append("text", form.text);
    if (photo) fd.append("photo", photo);

    try {
      const res = await fetch("/api/reviews", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Failed");

      const newReview: Review = {
        id: `user-${Date.now()}`,
        name: form.name,
        city: form.city,
        state: form.state,
        courseSlug: form.courseSlug as Review["courseSlug"],
        courseTitle,
        rating,
        text: form.text,
        photo: data.photoPath ?? preview ?? undefined,
        date: new Date().toISOString().split("T")[0],
        initials: form.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      };

      onSubmitted(newReview);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel — drawer on mobile, centred modal on desktop */}
          <motion.div
            initial={{ opacity: 0, y: "100%", scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-0 left-0 right-0 z-50 md:inset-0 md:flex md:items-center md:justify-center md:p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full md:w-full md:max-w-xl max-h-[92dvh] overflow-y-auto rounded-t-[2rem] md:rounded-3xl bg-white/95 backdrop-blur-md border border-sage-100 shadow-soft-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1 md:hidden">
                <div className="w-10 h-1 rounded-full bg-beige-300" />
              </div>

              <div className="px-5 sm:px-7 pt-4 pb-8">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center py-10 gap-5"
                    >
                      <div className="relative">
                        {!shouldReduce && (
                          <motion.div
                            className="absolute inset-[-14px] rounded-full border border-sage-300/40"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            aria-hidden
                          />
                        )}
                        <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center">
                          <CheckCircle2 className="w-9 h-9 text-sage-600" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl text-charcoal font-medium">Thank You!</h3>
                        <p className="mt-2 text-slate-muted text-sm leading-relaxed max-w-xs mx-auto">
                          Your review has been submitted and will help other mothers and students on their journey.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-gold-500 text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span className="italic font-medium">Namaste 🙏</span>
                      </div>
                      <button
                        onClick={onClose}
                        className="mt-2 rounded-2xl bg-sage-600 text-white px-8 py-3 text-sm font-semibold hover:bg-sage-700 transition-colors"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="h-[1.5px] w-5 bg-sage-400" />
                            <span className="text-sage-600 text-[10px] font-semibold uppercase tracking-[0.18em]">
                              Share your story
                            </span>
                          </div>
                          <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
                            Add a Review
                          </h2>
                        </div>
                        <button
                          type="button"
                          onClick={onClose}
                          className="w-8 h-8 rounded-xl bg-beige-100 hover:bg-beige-200 flex items-center justify-center transition-colors shrink-0 mt-0.5"
                        >
                          <X className="w-4 h-4 text-charcoal" />
                        </button>
                      </div>

                      {/* Rating */}
                      <div>
                        <FieldLabel label="Your rating" required />
                        <StarPicker value={rating} onChange={setRating} />
                      </div>

                      {/* Name */}
                      <div>
                        <FieldLabel label="Your name" required />
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Priya Sharma"
                          className={inputCls}
                        />
                      </div>

                      {/* City + State */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <FieldLabel label="City" required />
                          <input
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            required
                            placeholder="Mumbai"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <FieldLabel label="State" required />
                          <input
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                            required
                            placeholder="Maharashtra"
                            className={inputCls}
                          />
                        </div>
                      </div>

                      {/* Course */}
                      <div>
                        <FieldLabel label="Course attended" required />
                        <div className="relative">
                          <select
                            name="courseSlug"
                            value={form.courseSlug}
                            onChange={handleChange}
                            className={`${inputCls} appearance-none pr-10 cursor-pointer`}
                          >
                            <option value="">Select a course…</option>
                            {COURSE_OPTIONS.map((c) => (
                              <option key={c.slug} value={c.slug}>
                                {c.title}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-soft pointer-events-none" />
                        </div>
                      </div>

                      {/* Review text */}
                      <div>
                        <FieldLabel label="Your review" required />
                        <textarea
                          name="text"
                          value={form.text}
                          onChange={handleChange}
                          required
                          rows={4}
                          maxLength={2000}
                          placeholder="Tell other mothers and students what the experience was like for you…"
                          className={`${inputCls} resize-none`}
                        />
                        <p className="text-right text-xs text-slate-soft mt-1">{form.text.length}/2000</p>
                      </div>

                      {/* Photo upload */}
                      <div>
                        <FieldLabel label="Add a photo (optional)" />
                        <label className="block cursor-pointer">
                          <input type="file" accept="image/*" className="sr-only" onChange={handlePhoto} />
                          {preview ? (
                            <div className="relative rounded-2xl overflow-hidden aspect-video border border-sage-100">
                              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-medium bg-black/40 rounded-lg px-3 py-1.5">
                                  Click to change
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-sage-200 hover:border-sage-300 bg-sage-50/40 hover:bg-sage-50/80 transition-all py-6 px-4">
                              <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center">
                                <Camera className="w-5 h-5 text-sage-500" />
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-medium text-charcoal">Upload a photo</p>
                                <p className="text-xs text-slate-soft mt-0.5">JPG, PNG or WEBP · Max 5 MB</p>
                              </div>
                              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-sage-200 px-3 py-1.5 text-xs font-medium text-sage-600 hover:bg-sage-50 transition-colors">
                                <Upload className="w-3.5 h-3.5" />
                                Browse
                              </span>
                            </div>
                          )}
                        </label>
                      </div>

                      {/* Error */}
                      <AnimatePresence>
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3"
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={status === "loading"}
                        whileHover={shouldReduce ? {} : { scale: 1.02, y: -1 }}
                        whileTap={shouldReduce ? {} : { scale: 0.97 }}
                        className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-sage-600 text-white px-8 py-3.5 text-sm font-semibold shadow-soft hover:bg-sage-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Submitting…
                          </>
                        ) : (
                          <>
                            <PenLine className="w-4 h-4" /> Submit Review
                          </>
                        )}
                      </motion.button>

                      <p className="text-xs text-slate-soft text-center">
                        Your review may appear publicly after a quick check
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
