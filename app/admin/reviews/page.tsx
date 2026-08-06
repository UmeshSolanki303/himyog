"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Plus, Pencil, Trash2, CheckCircle2, XCircle, Loader2,
  Star, ChevronDown, X, Save,
} from "lucide-react";
import type { AdminReview } from "@/lib/admin-db";

// ─── Constants ────────────────────────────────────────────────────────────────
const COURSE_OPTIONS = [
  { slug: "prenatal-yoga",      title: "Prenatal Yoga" },
  { slug: "postnatal-yoga",     title: "Postnatal Yoga" },
  { slug: "pregnancy-wellness", title: "Pregnancy Wellness" },
  { slug: "ttc-course",         title: "Yoga Teacher Training (TTC)" },
];

const STATUS_OPTIONS = ["pending", "approved", "rejected"] as const;

const STATUS_BADGE: Record<string, string> = {
  pending:  "bg-gold-100 text-gold-700 border border-gold-200",
  approved: "bg-warm-sage-100 text-warm-sage-700 border border-warm-sage-200",
  rejected: "bg-red-50 text-red-600 border border-red-100",
};

const inputCls =
  "w-full rounded-xl border border-sage-100 bg-beige-50 px-3 py-2.5 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-sage-400/60 focus:border-sage-300 transition-all";

// ─── Star picker ──────────────────────────────────────────────────────────────
function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none"
        >
          <Star
            className={`w-6 h-6 transition-colors ${
              (hovered || value) >= i ? "text-gold-400 fill-gold-400" : "text-beige-300 fill-beige-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Review form (add / edit) ─────────────────────────────────────────────────
interface FormState {
  name: string; city: string; state: string;
  courseSlug: string; rating: number;
  text: string; photo: string; status: string; date: string;
}

function defaultForm(): FormState {
  return {
    name: "", city: "", state: "", courseSlug: "", rating: 5,
    text: "", photo: "", status: "approved",
    date: new Date().toISOString().split("T")[0],
  };
}

function ReviewModal({
  review,
  onClose,
  onSaved,
}: {
  review: AdminReview | null;
  onClose: () => void;
  onSaved: (r: AdminReview) => void;
}) {
  const isEdit = !!review;
  const [form, setForm] = useState<FormState>(
    review
      ? {
          name: review.name, city: review.city, state: review.state,
          courseSlug: review.courseSlug, rating: review.rating,
          text: review.text, photo: review.photo ?? "",
          status: review.status, date: review.date,
        }
      : defaultForm()
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handle(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError("");
    const courseTitle = COURSE_OPTIONS.find((c) => c.slug === form.courseSlug)?.title ?? form.courseSlug;

    try {
      const res = await fetch(
        isEdit ? `/api/admin/reviews/${review!.id}` : "/api/admin/reviews",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, courseTitle }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      onSaved(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-soft-lg border border-sage-100 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-beige-200">
          <h2 className="font-serif text-lg text-charcoal font-medium">
            {isEdit ? "Edit Review" : "Add Review"}
          </h2>
          <button onClick={onClose} className="text-slate-soft hover:text-charcoal transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={submit} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">Name *</label>
              <input name="name" value={form.name} onChange={handle} required className={inputCls} placeholder="Priya Sharma" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">Date *</label>
              <input name="date" type="date" value={form.date} onChange={handle} required className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">City *</label>
              <input name="city" value={form.city} onChange={handle} required className={inputCls} placeholder="Mumbai" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">State *</label>
              <input name="state" value={form.state} onChange={handle} required className={inputCls} placeholder="Maharashtra" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">Course *</label>
              <div className="relative">
                <select name="courseSlug" value={form.courseSlug} onChange={handle} required className={`${inputCls} appearance-none pr-8 cursor-pointer`}>
                  <option value="">Select…</option>
                  {COURSE_OPTIONS.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-soft pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">Status</label>
              <div className="relative">
                <select name="status" value={form.status} onChange={handle} className={`${inputCls} appearance-none pr-8 cursor-pointer capitalize`}>
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-soft pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">Rating</label>
            <StarPicker value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">Review *</label>
            <textarea name="text" value={form.text} onChange={handle} required rows={4} maxLength={2000} className={`${inputCls} resize-none`} placeholder="Review content…" />
            <p className="text-right text-xs text-slate-soft mt-0.5">{form.text.length}/2000</p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">Photo URL (optional)</label>
            <input name="photo" value={form.photo} onChange={handle} className={inputCls} placeholder="https://…" />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2.5">{error}</p>
          )}

          <div className="flex gap-3 mt-1">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-sage-200 text-charcoal text-sm font-medium py-2.5 hover:bg-beige-100 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-sage-600 text-white text-sm font-semibold py-2.5 hover:bg-sage-700 disabled:opacity-60 transition-colors"
            >
              {saving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…</> : <><Save className="w-3.5 h-3.5" /> Save</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
function ReviewsPageInner() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") ?? "all";

  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [courseFilter, setCourseFilter] = useState("all");
  const [modalReview, setModalReview] = useState<AdminReview | null | "new">(undefined as unknown as null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  const fetchReviews = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/reviews")
      .then((r) => r.ok ? r.json() : [])
      .then(setReviews)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const filtered = reviews.filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (courseFilter !== "all" && r.courseSlug !== courseFilter) return false;
    return true;
  });

  async function changeStatus(id: string, status: string) {
    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status: status as AdminReview["status"] } : r));
      showToast(`Review ${status}`);
    } else {
      showToast("Failed to update status", false);
    }
  }

  async function deleteReview(id: string) {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      showToast("Review deleted");
    } else {
      showToast("Failed to delete review", false);
    }
    setDeletingId(null);
  }

  function openAdd() { setModalReview(null); setModalOpen(true); }
  function openEdit(r: AdminReview) { setModalReview(r); setModalOpen(true); }

  function handleSaved(saved: AdminReview) {
    setReviews((prev) => {
      const exists = prev.findIndex((r) => r.id === saved.id);
      if (exists !== -1) return prev.map((r) => r.id === saved.id ? saved : r);
      return [saved, ...prev];
    });
    setModalOpen(false);
    showToast(modalReview ? "Review updated" : "Review added");
  }

  const filterTab = (label: string, value: string, current: string, set: (v: string) => void) => (
    <button
      key={value}
      onClick={() => set(value)}
      className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
        current === value
          ? "bg-sage-600 text-white"
          : "bg-white border border-sage-100 text-charcoal/70 hover:bg-beige-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold">Reviews</h1>
          <p className="text-slate-muted text-sm mt-0.5">{reviews.length} total</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-sage-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-sage-700 transition-colors shadow-soft"
        >
          <Plus className="w-4 h-4" /> Add Review
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          {[
            { label: "All", value: "all" },
            ...STATUS_OPTIONS.map((s) => ({ label: s.charAt(0).toUpperCase() + s.slice(1), value: s })),
          ].map((f) => filterTab(f.label, f.value, statusFilter, setStatusFilter))}
        </div>
        <div className="relative sm:ml-auto">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="rounded-xl border border-sage-100 bg-white px-3 py-1.5 pr-8 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-sage-400/60 appearance-none cursor-pointer"
          >
            <option value="all">All courses</option>
            {COURSE_OPTIONS.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-soft pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-sage-100/80 shadow-soft overflow-hidden">
        {loading ? (
          <div className="py-16 flex items-center justify-center gap-2 text-slate-muted text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-muted text-sm">No reviews found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-beige-50 border-b border-beige-200 text-xs text-slate-muted uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-medium">Reviewer</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Course</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Rating</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Date</th>
                  <th className="text-right px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-100">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-beige-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sage-200 to-sage-500 flex items-center justify-center shrink-0">
                          <span className="text-white text-xs font-semibold">{r.initials}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-charcoal truncate max-w-[120px]">{r.name}</p>
                          <p className="text-xs text-slate-soft truncate">{r.city}, {r.state}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <span className="text-xs text-charcoal/80 truncate max-w-[140px] block">{r.courseTitle}</span>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-gold-500 text-xs">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_BADGE[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell text-xs text-slate-muted">
                      {new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        {r.status !== "approved" && (
                          <button
                            onClick={() => changeStatus(r.id, "approved")}
                            title="Approve"
                            className="p-1.5 rounded-lg text-warm-sage-500 hover:bg-warm-sage-50 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        {r.status !== "rejected" && (
                          <button
                            onClick={() => changeStatus(r.id, "rejected")}
                            title="Reject"
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => openEdit(r)}
                          title="Edit"
                          className="p-1.5 rounded-lg text-sage-500 hover:bg-sage-50 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteReview(r.id)}
                          title="Delete"
                          disabled={deletingId === r.id}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors disabled:opacity-40"
                        >
                          {deletingId === r.id
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <Trash2 className="w-4 h-4" />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <ReviewModal
          review={modalReview as AdminReview | null}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-soft-lg text-sm font-medium text-white transition-all ${toast.ok ? "bg-warm-sage-500" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

export default function AdminReviewsPage() {
  return (
    <Suspense>
      <ReviewsPageInner />
    </Suspense>
  );
}
