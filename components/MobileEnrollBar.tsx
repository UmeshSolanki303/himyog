"use client";

import { CtaButton } from "@/components/CtaButton";

interface MobileEnrollBarProps {
  title: string;
  price: string;
  formUrl: string;
}

export function MobileEnrollBar({ title, price, formUrl }: MobileEnrollBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-sm border-t border-beige-200 px-4 py-3 flex items-center gap-3 shadow-soft-lg">
      <div className="flex-1 min-w-0">
        <p className="font-serif text-sm text-charcoal font-medium truncate">{title}</p>
        <p className="text-xs text-slate-muted mt-0.5">{price}</p>
      </div>
      <CtaButton
        href={formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 inline-flex items-center justify-center text-sm font-semibold text-white bg-sage-500 hover:bg-sage-600 rounded-xl px-5 py-2.5 transition-colors"
        wrapperClassName="shrink-0 rounded-xl"
      >
        Enroll Now
      </CtaButton>
    </div>
  );
}
