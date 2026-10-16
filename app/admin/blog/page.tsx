"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { marked } from "marked";
import {
  Plus, Pencil, Trash2, Loader2, X, Save, Eye, EyeOff,
  CheckCircle2, FileEdit, Circle,
} from "lucide-react";
import type { AdminBlogPost } from "@/lib/admin-db";
import { slugify, deriveExcerpt, readingTime, parseKeywords, seoChecks } from "@/lib/blog-utils";

const STATUS_OPTIONS = ["draft", "published"] as const;

const STATUS_BADGE: Record<string, string> = {
  draft: "bg-gold-100 text-gold-700 border border-gold-200",
  published: "bg-warm-sage-100 text-warm-sage-700 border border-warm-sage-200",
};

const inputCls =
  "w-full rounded-xl border border-sage-100 bg-beige-50 px-3 py-2.5 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-sage-400/60 focus:border-sage-300 transition-all";

const labelCls = "block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5";

// ─── Post form (add / edit) ────────────────────────────────────────────────────
interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string;
  status: "draft" | "published";
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  seoKeywords: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://matrushaktiyog.com";

function CharCount({ value, min, max }: { value: string; min: number; max: number }) {
  const n = value.length;
  const tone = n === 0 ? "text-slate-soft" : n < min || n > max ? "text-gold-600" : "text-warm-sage-600";
  return <span className={`text-[11px] ${tone}`}>{n}/{max}</span>;
}

function defaultForm(): FormState {
  return {
    title: "", slug: "", excerpt: "", content: "", coverImage: "", author: "",
    tags: "", status: "draft", seoTitle: "", seoDescription: "",
    focusKeyword: "", seoKeywords: "",
  };
}

function PostModal({
  post,
  onClose,
  onSaved,
}: {
  post: AdminBlogPost | null;
  onClose: () => void;
  onSaved: (p: AdminBlogPost) => void;
}) {
  const isEdit = !!post;
  const [form, setForm] = useState<FormState>(
    post
      ? {
          title: post.title, slug: post.slug, excerpt: post.excerpt,
          content: post.content, coverImage: post.coverImage ?? "",
          author: post.author, tags: post.tags.join(", "), status: post.status,
          seoTitle: post.seoTitle ?? "", seoDescription: post.seoDescription ?? "",
          focusKeyword: post.focusKeyword ?? "", seoKeywords: (post.seoKeywords ?? []).join(", "),
        }
      : defaultForm(),
  );
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handle(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => {
      const next = { ...f, [name]: value };
      if (name === "title" && !slugTouched) next.slug = slugify(value);
      return next;
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError("");

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      author: form.author,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      status: form.status,
      seoTitle: form.seoTitle,
      seoDescription: form.seoDescription,
      focusKeyword: form.focusKeyword,
      seoKeywords: parseKeywords(form.seoKeywords),
    };

    try {
      const res = await fetch(
        isEdit ? `/api/admin/blog/${post!.id}` : "/api/admin/blog",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
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
      <div className="bg-white rounded-2xl shadow-soft-lg border border-sage-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-beige-200 sticky top-0 bg-white z-10">
          <h2 className="font-serif text-lg text-charcoal font-medium">
            {isEdit ? "Edit Post" : "New Post"}
          </h2>
          <button onClick={onClose} className="text-slate-soft hover:text-charcoal transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={submit} className="px-6 py-5 flex flex-col gap-4">
          <div>
            <label className={labelCls}>Title *</label>
            <input name="title" value={form.title} onChange={handle} required className={inputCls} placeholder="5 Gentle Poses for Your First Trimester" />
          </div>

          <div>
            <label className={labelCls}>Slug</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-soft shrink-0">/blog/</span>
              <input
                name="slug"
                value={form.slug}
                onChange={(e) => { setSlugTouched(true); handle(e); }}
                placeholder="auto-generated-from-title"
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Status</label>
              <select name="status" value={form.status} onChange={handle} className={`${inputCls} appearance-none cursor-pointer capitalize`}>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Tags</label>
              <input name="tags" value={form.tags} onChange={handle} className={inputCls} placeholder="prenatal, nutrition" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Author</label>
              <input name="author" value={form.author} onChange={handle} className={inputCls} placeholder="Matrushakti Yog" />
            </div>
            <div>
              <label className={labelCls}>Cover image URL</label>
              <input name="coverImage" value={form.coverImage} onChange={handle} className={inputCls} placeholder="https://… (optional)" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Excerpt</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handle}
              rows={2}
              maxLength={240}
              className={`${inputCls} resize-none`}
              placeholder="Leave blank to auto-generate from the content"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={labelCls + " mb-0"}>Content * (Markdown)</label>
              <button
                type="button"
                onClick={() => setPreview((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-sage-600 hover:text-sage-700 transition-colors"
              >
                {preview ? <><EyeOff className="w-3.5 h-3.5" /> Edit</> : <><Eye className="w-3.5 h-3.5" /> Preview</>}
              </button>
            </div>
            {preview ? (
              <div
                className="prose prose-sm max-w-none rounded-xl border border-sage-100 bg-beige-50 px-4 py-3 min-h-[220px] text-charcoal"
                dangerouslySetInnerHTML={{ __html: form.content ? marked.parse(form.content) as string : "<p class='text-slate-soft'>Nothing to preview yet…</p>" }}
              />
            ) : (
              <textarea
                name="content"
                value={form.content}
                onChange={handle}
                required
                rows={12}
                className={`${inputCls} resize-y font-mono text-[13px] leading-relaxed`}
                placeholder={"## A heading\n\nWrite your post in Markdown — **bold**, _italic_, [links](https://example.com), lists, and images all work."}
              />
            )}
            <p className="text-right text-xs text-slate-soft mt-0.5">
              {form.content.trim() ? readingTime(form.content) : "—"}
            </p>
          </div>

          <details className="group rounded-xl border border-sage-100 bg-beige-50/60 px-4 py-3" open>
            <summary className="text-xs font-semibold uppercase tracking-wide text-sage-600 cursor-pointer select-none">
              SEO &amp; keywords
            </summary>
            <div className="mt-4 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Focus keyword</label>
                  <input name="focusKeyword" value={form.focusKeyword} onChange={handle} className={inputCls} placeholder="prenatal yoga first trimester" />
                </div>
                <div>
                  <label className={labelCls}>Other keywords</label>
                  <input name="seoKeywords" value={form.seoKeywords} onChange={handle} className={inputCls} placeholder="pregnancy yoga, safe poses, rishikesh" />
                </div>
              </div>
              <p className="text-[11px] text-slate-soft -mt-2">
                Comma-separated. Focus keyword, keywords, and tags are all added to the page&apos;s meta keywords and structured data.
              </p>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={labelCls + " mb-0"}>SEO title</label>
                  <CharCount value={form.seoTitle || form.title} min={30} max={60} />
                </div>
                <input name="seoTitle" value={form.seoTitle} onChange={handle} className={inputCls} placeholder={form.title || "Defaults to the post title"} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={labelCls + " mb-0"}>Meta description</label>
                  <CharCount value={form.seoDescription || form.excerpt || deriveExcerpt(form.content)} min={70} max={160} />
                </div>
                <textarea
                  name="seoDescription"
                  value={form.seoDescription}
                  onChange={handle}
                  rows={2}
                  maxLength={160}
                  className={`${inputCls} resize-none`}
                  placeholder={form.excerpt || deriveExcerpt(form.content) || "Defaults to the excerpt"}
                />
              </div>

              {/* Google result preview */}
              <div className="rounded-xl bg-white border border-sage-100 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-soft mb-2">Search preview</p>
                <p className="text-xs text-charcoal/60 truncate">{siteUrl.replace(/^https?:\/\//, "")} › blog › {form.slug || "your-post-slug"}</p>
                <p className="text-[#1a0dab] text-base leading-snug truncate">
                  {(form.seoTitle || form.title || "Post title") + " | Matrushakti Yog"}
                </p>
                <p className="text-xs text-charcoal/70 leading-relaxed line-clamp-2">
                  {form.seoDescription || form.excerpt || deriveExcerpt(form.content) || "Meta description will appear here."}
                </p>
              </div>

              {/* On-page checklist */}
              {(() => {
                const checks = seoChecks(form);
                const passed = checks.filter((c) => c.ok).length;
                return (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-soft mb-2">
                      SEO checklist · {passed}/{checks.length}
                    </p>
                    <ul className="flex flex-col gap-1">
                      {checks.map((c) => (
                        <li key={c.label} className={`flex items-start gap-2 text-xs ${c.ok ? "text-warm-sage-700" : "text-charcoal/60"}`}>
                          {c.ok
                            ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-px text-warm-sage-500" />
                            : <Circle className="w-3.5 h-3.5 shrink-0 mt-px text-slate-soft" />}
                          {c.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </div>
          </details>

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
function BlogPageInner() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") ?? "all";

  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [modalPost, setModalPost] = useState<AdminBlogPost | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  const fetchPosts = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/blog")
      .then((r) => r.ok ? r.json() : [])
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const filtered = posts.filter((p) => statusFilter === "all" || p.status === statusFilter);

  async function toggleStatus(p: AdminBlogPost) {
    const nextStatus = p.status === "published" ? "draft" : "published";
    const res = await fetch(`/api/admin/blog/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    if (res.ok) {
      const updated = await res.json();
      setPosts((prev) => prev.map((x) => x.id === p.id ? updated : x));
      showToast(nextStatus === "published" ? "Post published" : "Moved to draft");
    } else {
      showToast("Failed to update status", false);
    }
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showToast("Post deleted");
    } else {
      showToast("Failed to delete post", false);
    }
    setDeletingId(null);
  }

  function openAdd() { setModalPost(null); setModalOpen(true); }
  function openEdit(p: AdminBlogPost) { setModalPost(p); setModalOpen(true); }

  function handleSaved(saved: AdminBlogPost) {
    setPosts((prev) => {
      const exists = prev.findIndex((p) => p.id === saved.id);
      if (exists !== -1) return prev.map((p) => p.id === saved.id ? saved : p);
      return [saved, ...prev];
    });
    setModalOpen(false);
    showToast(modalPost ? "Post updated" : "Post created");
  }

  const filterTab = (label: string, value: string) => (
    <button
      key={value}
      onClick={() => setStatusFilter(value)}
      className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
        statusFilter === value
          ? "bg-sage-600 text-white"
          : "bg-white border border-sage-100 text-charcoal/70 hover:bg-beige-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold">Blog</h1>
          <p className="text-slate-muted text-sm mt-0.5">{posts.length} total</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-sage-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-sage-700 transition-colors shadow-soft"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
        {[{ label: "All", value: "all" }, ...STATUS_OPTIONS.map((s) => ({ label: s.charAt(0).toUpperCase() + s.slice(1), value: s }))]
          .map((f) => filterTab(f.label, f.value))}
      </div>

      <div className="bg-white rounded-2xl border border-sage-100/80 shadow-soft overflow-hidden">
        {loading ? (
          <div className="py-16 flex items-center justify-center gap-2 text-slate-muted text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-muted text-sm">No posts found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-beige-50 border-b border-beige-200 text-xs text-slate-muted uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-medium">Title</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Tags</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Updated</th>
                  <th className="text-right px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-beige-50/50 transition-colors">
                    <td className="px-5 py-3.5 max-w-[260px]">
                      <p className="font-medium text-charcoal truncate">{p.title}</p>
                      <p className="text-xs text-slate-soft truncate">/blog/{p.slug}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {p.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-beige-100 text-charcoal/70">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_BADGE[p.status]}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell text-xs text-slate-muted">
                      {new Date(p.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => toggleStatus(p)}
                          title={p.status === "published" ? "Move to draft" : "Publish"}
                          className={`p-1.5 rounded-lg transition-colors ${p.status === "published" ? "text-gold-500 hover:bg-gold-50" : "text-warm-sage-500 hover:bg-warm-sage-50"}`}
                        >
                          {p.status === "published" ? <FileEdit className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => openEdit(p)}
                          title="Edit"
                          className="p-1.5 rounded-lg text-sage-500 hover:bg-sage-50 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deletePost(p.id)}
                          title="Delete"
                          disabled={deletingId === p.id}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors disabled:opacity-40"
                        >
                          {deletingId === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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

      {modalOpen && (
        <PostModal
          post={modalPost}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}

      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-soft-lg text-sm font-medium text-white transition-all ${toast.ok ? "bg-warm-sage-500" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

export default function AdminBlogPage() {
  return (
    <Suspense>
      <BlogPageInner />
    </Suspense>
  );
}
