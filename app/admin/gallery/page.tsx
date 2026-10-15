"use client";

import { useEffect, useState, useCallback } from "react";
import { Upload, Trash2, Loader2, ImagePlus, ChevronDown } from "lucide-react";
import type { CourseGalleryImage } from "@/lib/admin-db";
import { COURSE_OPTIONS } from "@/lib/reviews-data";

const inputCls =
  "w-full rounded-xl border border-sage-100 bg-beige-50 px-3 py-2.5 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-sage-400/60 focus:border-sage-300 transition-all";

export default function AdminGalleryPage() {
  const [courseSlug, setCourseSlug] = useState<string>(COURSE_OPTIONS[0].slug);
  const [images, setImages] = useState<CourseGalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [alt, setAlt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  const fetchImages = useCallback(() => {
    setLoading(true);
    fetch(`/api/admin/gallery?course=${courseSlug}`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setImages)
      .finally(() => setLoading(false));
  }, [courseSlug]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 8 * 1024 * 1024) {
      setError("Image must be under 8 MB");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError("");
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Choose a photo to upload");
      return;
    }
    setUploading(true);
    setError("");

    const fd = new FormData();
    fd.append("courseSlug", courseSlug);
    fd.append("photo", file);
    fd.append("caption", caption);
    fd.append("alt", alt);

    try {
      const res = await fetch("/api/admin/gallery", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setImages((prev) => [...prev, data]);
      setFile(null);
      setPreview(null);
      setCaption("");
      setAlt("");
      showToast("Photo uploaded");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this photo? This cannot be undone.")) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (res.ok) {
      setImages((prev) => prev.filter((img) => img.id !== id));
      showToast("Photo deleted");
    } else {
      showToast("Failed to delete photo", false);
    }
    setDeletingId(null);
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold">Course Gallery</h1>
        <p className="text-slate-muted text-sm mt-0.5">
          Upload real photos — students, sessions, retreats — shown on each course&apos;s page.
        </p>
      </div>

      {/* Course selector */}
      <div className="relative max-w-xs">
        <select
          value={courseSlug}
          onChange={(e) => setCourseSlug(e.target.value)}
          className={`${inputCls} appearance-none pr-10 cursor-pointer bg-white`}
        >
          {COURSE_OPTIONS.map((c) => (
            <option key={c.slug} value={c.slug}>{c.title}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-soft pointer-events-none" />
      </div>

      {/* Upload form */}
      <form
        onSubmit={handleUpload}
        className="bg-white rounded-2xl border border-sage-100/80 shadow-soft p-5 sm:p-6 flex flex-col sm:flex-row gap-5"
      >
        <label className="block cursor-pointer shrink-0 w-full sm:w-48">
          <input type="file" accept="image/*" className="sr-only" onChange={handleFile} />
          {preview ? (
            <div className="relative rounded-xl overflow-hidden aspect-square border border-sage-100">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sage-200 hover:border-sage-300 bg-sage-50/40 hover:bg-sage-50/80 transition-all aspect-square px-4">
              <ImagePlus className="w-6 h-6 text-sage-400" />
              <span className="text-xs text-slate-soft text-center">Click to choose a photo</span>
            </div>
          )}
        </label>

        <div className="flex-1 flex flex-col gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">
              Caption (optional)
            </label>
            <input value={caption} onChange={(e) => setCaption(e.target.value)} className={inputCls} placeholder="e.g. Graduation day, batch of March 2026" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">
              Alt text (for accessibility)
            </label>
            <input value={alt} onChange={(e) => setAlt(e.target.value)} className={inputCls} placeholder="Describe the photo" />
          </div>
          {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-3 py-2">{error}</p>}
          <button
            type="submit"
            disabled={uploading}
            className="self-start inline-flex items-center gap-2 rounded-xl bg-sage-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-sage-700 disabled:opacity-60 transition-colors"
          >
            {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</> : <><Upload className="w-4 h-4" /> Upload Photo</>}
          </button>
        </div>
      </form>

      {/* Existing images */}
      <div className="bg-white rounded-2xl border border-sage-100/80 shadow-soft p-5 sm:p-6">
        <h2 className="text-sm font-medium text-charcoal mb-4">
          {COURSE_OPTIONS.find((c) => c.slug === courseSlug)?.title} — {images.length} photo{images.length !== 1 ? "s" : ""}
        </h2>
        {loading ? (
          <div className="py-10 flex items-center justify-center gap-2 text-slate-muted text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
        ) : images.length === 0 ? (
          <p className="py-10 text-center text-slate-muted text-sm">
            No real photos uploaded for this course yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img.id} className="group relative rounded-xl overflow-hidden border border-beige-200 aspect-square">
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(img.id)}
                    disabled={deletingId === img.id}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-white/90 text-red-500 hover:bg-white disabled:opacity-40"
                    title="Delete photo"
                  >
                    {deletingId === img.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
                {img.caption && (
                  <p className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[10px] px-2 py-1 truncate">
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-soft-lg text-sm font-medium text-white transition-all ${toast.ok ? "bg-warm-sage-500" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
