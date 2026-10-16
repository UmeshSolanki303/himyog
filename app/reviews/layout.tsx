import type { Metadata } from "next";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

// page.tsx is a client component, which can't export metadata itself.
export const metadata: Metadata = pageMetadata(PAGE_SEO.reviews);

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
