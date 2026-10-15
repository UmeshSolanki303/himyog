"use client";

import { useEffect, useState, useCallback } from "react";
import { Upload, Trash2, Loader2, ImagePlus } from "lucide-react";
import type { SiteImage } from "@/lib/admin-db";
import { SITE_IMAGE_SLOTS } from "@/lib/site-images";

function SlotCard({
  slot,
  image,
  onUploaded,
  onDeleted,
}: {
  slot: (typeof SITE_IMAGE_SLOTS)[number];
  image: SiteImage | undefined;
  onUploaded: (img: SiteImage) => void;
  onDeleted: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

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

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("slotKey", slot.key);
    fd.append("photo", file);
    fd.append("alt", slot.label);
    try {
      const res = await fetch("/api/admin/site-images", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onUploaded(data);
      setFile(null);
      setPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Revert "${slot.label}" to its default image?`)) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/site-images/${slot.key}`, { method: "DELETE" });
    if (res.ok) onDeleted();
    setDeleting(false);
  }

  const displaySrc = preview ?? image?.url;

  return (
    <div className="bg-white rounded-2xl border border-sage-100/80 shadow-soft p-5 flex flex-col sm:flex-row gap-4">
      <label className="block cursor-pointer shrink-0 w-full sm:w-32">
        <input type="file" accept="image/*" className="sr-only" onChange={handleFile} />
        {displaySrc ? (
          <div className="relative rounded-xl overflow-hidden aspect-square border border-sage-100">
            <img src={displaySrc} alt={slot.label} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-sage-200 hover:border-sage-300 bg-sage-50/40 hover:bg-sage-50/80 transition-all aspect-square px-2">
            <ImagePlus className="w-5 h-5 text-sage-400" />
            <span className="text-[10px] text-slate-soft text-center">Default / initials</span>
          </div>
        )}
      </label>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-charcoal">{slot.label}</p>
        <p className="text-xs text-slate-muted mt-0.5">{slot.description}</p>
        {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
        <div className="flex items-center gap-2 mt-3">
          {file && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-sage-600 text-white px-3 py-1.5 text-xs font-semibold hover:bg-sage-700 disabled:opacity-60 transition-colors"
            >
              {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              Save
            </button>
          )}
          {image && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 text-red-500 px-3 py-1.5 text-xs font-medium hover:bg-red-50 disabled:opacity-40 transition-colors"
            >
              {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminSiteImagesPage() {
  const [images, setImages] = useState<Record<string, SiteImage>>({});
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/site-images")
      .then((r) => (r.ok ? r.json() : {}))
      .then(setImages)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const groups = Array.from(new Set(SITE_IMAGE_SLOTS.map((s) => s.group)));

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold">Site Photos</h1>
        <p className="text-slate-muted text-sm mt-0.5">
          Replace the founder photo, team cards, and course hero images sitewide — one photo per slot.
        </p>
      </div>

      {loading ? (
        <div className="py-10 flex items-center justify-center gap-2 text-slate-muted text-sm">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : (
        groups.map((group) => (
          <div key={group} className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-sage-600">{group}</h2>
            <div className="flex flex-col gap-3">
              {SITE_IMAGE_SLOTS.filter((s) => s.group === group).map((slot) => (
                <SlotCard
                  key={slot.key}
                  slot={slot}
                  image={images[slot.key]}
                  onUploaded={(img) => setImages((prev) => ({ ...prev, [slot.key]: img }))}
                  onDeleted={() =>
                    setImages((prev) => {
                      const next = { ...prev };
                      delete next[slot.key];
                      return next;
                    })
                  }
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
