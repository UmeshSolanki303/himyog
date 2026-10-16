import { HelpCircle } from "lucide-react";

export interface Faq {
  q: string;
  a: string;
}

// Visible FAQ list plus matching FAQPage JSON-LD, so the same questions can
// surface in Google's "People also ask" results. Keep answers in sync with
// what's on screen — Google requires the markup to mirror visible content.
export function FaqSection({
  faqs,
  title = "Frequently Asked Questions",
  className = "bg-beige-50",
}: {
  faqs: Faq[];
  title?: string;
  className?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className={`py-12 sm:py-20 w-full ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "48rem" }}>
        <div className="text-center mb-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-600 mb-4">
            Questions
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">{title}</h2>
        </div>
        <div className="flex flex-col gap-4">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl bg-white border border-beige-200/70 shadow-soft p-5 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-sage-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-charcoal">{f.q}</h3>
                  <p className="mt-1.5 text-slate-muted text-sm leading-relaxed">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
