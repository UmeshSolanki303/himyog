"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";

const inputClass =
  "w-full rounded-2xl border border-sage-100 bg-white/80 px-4 py-3.5 text-charcoal text-sm placeholder:text-slate-soft focus:outline-none focus:ring-2 focus:ring-sage-400/60 focus:border-sage-300 transition-all duration-200 backdrop-blur-sm";

const labelClass =
  "text-xs font-semibold uppercase tracking-[0.12em] text-sage-600";

export function RetreatInquiryForm() {
  const shouldReduce = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, course: "Pregnancy Wellness Retreat" }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      id="enquire"
      className="relative rounded-3xl bg-white/70 border border-sage-100/80 shadow-soft-lg backdrop-blur-md p-6 sm:p-8 lg:p-10"
    >
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
              <h3 className="font-serif text-2xl text-charcoal font-medium">Enquiry Received</h3>
              <p className="mt-2 text-slate-muted text-sm leading-relaxed max-w-xs mx-auto">
                Thank you for your interest in the retreat. We&apos;ll reach out within 24 hours with dates and details.
              </p>
            </div>
            <div className="flex items-center gap-2 text-gold-500 text-sm">
              <Sparkles className="w-4 h-4" />
              <span className="italic font-medium">Namaste 🙏</span>
            </div>
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 text-sage-600 hover:text-sage-700 text-sm font-medium underline underline-offset-4 transition-colors"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="mb-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="h-[1.5px] w-6 bg-sage-400" />
                <span className="text-sage-600 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em]">
                  Reserve your place
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium leading-snug">
                Enquire About the Retreat
              </h2>
              <p className="mt-1.5 text-slate-muted text-sm leading-relaxed">
                Tell us a little about yourself and we&apos;ll send over the next available dates and pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="retreat-name" className={labelClass}>
                  Your name <span className="text-sage-500">*</span>
                </label>
                <input
                  id="retreat-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Priya Sharma"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="retreat-email" className={labelClass}>
                  Email address <span className="text-sage-500">*</span>
                </label>
                <input
                  id="retreat-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="retreat-phone" className={labelClass}>
                WhatsApp / Phone
              </label>
              <input
                id="retreat-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="retreat-message" className={labelClass}>
                Anything we should know?
              </label>
              <textarea
                id="retreat-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Your due date or trimester, any questions about the retreat…"
                className={`${inputClass} resize-none`}
              />
            </div>

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3"
                >
                  Something went wrong. Please email us directly at{" "}
                  <a href="mailto:matrushaktiyog@gmail.com" className="underline">
                    matrushaktiyog@gmail.com
                  </a>
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={shouldReduce ? {} : { scale: 1.02, y: -2 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-2xl bg-sage-600 text-white px-8 py-4 text-sm font-semibold shadow-soft hover:bg-sage-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Enquiry
                </>
              )}
            </motion.button>

            <p className="text-xs text-slate-soft text-center">
              We typically reply within 24 hours · Your details are never shared
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
