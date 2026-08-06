"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, Clock, CheckCircle2, XCircle, Star, Users } from "lucide-react";
import type { AdminReview } from "@/lib/admin-db";

interface Stat {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  href: string;
}

export default function DashboardPage() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/reviews")
      .then((r) => r.ok ? r.json() : [])
      .then(setReviews)
      .finally(() => setLoading(false));
  }, []);

  const pending  = reviews.filter((r) => r.status === "pending").length;
  const approved = reviews.filter((r) => r.status === "approved").length;
  const rejected = reviews.filter((r) => r.status === "rejected").length;
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  const stats: Stat[] = [
    { label: "Total Reviews",    value: reviews.length, icon: MessageSquare, color: "bg-sage-100 text-sage-600",      href: "/admin/reviews" },
    { label: "Pending",          value: pending,        icon: Clock,         color: "bg-gold-100 text-gold-600",       href: "/admin/reviews?status=pending" },
    { label: "Approved",         value: approved,       icon: CheckCircle2,  color: "bg-warm-sage-100 text-warm-sage-600", href: "/admin/reviews?status=approved" },
    { label: "Rejected",         value: rejected,       icon: XCircle,       color: "bg-red-50 text-red-500",          href: "/admin/reviews?status=rejected" },
    { label: "Average Rating",   value: `${avgRating} ★`, icon: Star,        color: "bg-peach-100 text-peach-400",     href: "/admin/reviews" },
    { label: "Manage Users",     value: "→",            icon: Users,         color: "bg-beige-200 text-charcoal",      href: "/admin/users" },
  ];

  const recent = [...reviews].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  ).slice(0, 5);

  const STATUS_BADGE: Record<string, string> = {
    pending:  "bg-gold-100 text-gold-700",
    approved: "bg-warm-sage-100 text-warm-sage-700",
    rejected: "bg-red-50 text-red-600",
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold">Dashboard</h1>
        <p className="text-slate-muted text-sm mt-1">Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-2xl border border-sage-100/80 shadow-soft hover:shadow-soft-lg hover:border-sage-200 transition-all p-5 flex flex-col gap-3"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-charcoal">
                {loading ? "—" : s.value}
              </p>
              <p className="text-xs text-slate-muted mt-0.5">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent reviews */}
      <div className="bg-white rounded-2xl border border-sage-100/80 shadow-soft overflow-hidden">
        <div className="px-5 py-4 border-b border-beige-200 flex items-center justify-between">
          <h2 className="font-medium text-charcoal text-sm">Recent Submissions</h2>
          <Link href="/admin/reviews" className="text-xs text-sage-600 hover:text-sage-700 font-medium transition-colors">
            View all →
          </Link>
        </div>
        {loading ? (
          <div className="py-10 text-center text-slate-muted text-sm">Loading…</div>
        ) : recent.length === 0 ? (
          <div className="py-10 text-center text-slate-muted text-sm">No reviews yet</div>
        ) : (
          <div className="divide-y divide-beige-100">
            {recent.map((r) => (
              <div key={r.id} className="px-5 py-3.5 flex items-center gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sage-200 to-sage-500 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">{r.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal truncate">{r.name}</p>
                  <p className="text-xs text-slate-muted truncate">{r.courseTitle} · {r.city}, {r.state}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-gold-500">{"★".repeat(r.rating)}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_BADGE[r.status]}`}>
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
