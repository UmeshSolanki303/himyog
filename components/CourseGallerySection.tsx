import { listCourseGalleryImages } from "@/lib/admin-db";
import { GallerySection } from "./GallerySection";

interface CourseGallerySectionProps {
  courseSlug: string;
  title?: string;
  className?: string;
}

// Server component: pulls real, admin-uploaded photos for a course (see
// /admin/gallery) and renders nothing if none have been added yet — this is
// the "real people" gallery, kept separate from any curated stock imagery
// a page might also show.
export async function CourseGallerySection({
  courseSlug,
  title = "Real Moments From Our Students",
  className,
}: CourseGallerySectionProps) {
  let images: Awaited<ReturnType<typeof listCourseGalleryImages>> = [];
  try {
    images = await listCourseGalleryImages(courseSlug);
  } catch {
    return null;
  }

  if (images.length === 0) return null;

  return (
    <GallerySection
      title={title}
      items={images.map((img) => ({
        src: img.url,
        alt: img.alt,
        caption: img.caption,
      }))}
      className={className}
    />
  );
}
