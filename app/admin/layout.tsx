"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

interface CurrentUser {
  id: string;
  username: string;
  role: string;
  permissions: string[];
}

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard",   icon: LayoutDashboard },
  { href: "/admin/reviews",   label: "Reviews",     icon: MessageSquare },
  { href: "/admin/users",     label: "Users",       icon: Users, adminOnly: true },
];

function Sidebar({
  user,
  onClose,
}: {
  user: CurrentUser | null;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin");
  }

  return (
    <aside className="flex flex-col h-full bg-charcoal-dark text-white w-60 shrink-0">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10">
        <p className="font-serif text-base font-semibold text-white leading-tight">
          Matrushakti Yog
        </p>
        <p className="text-[10px] text-white/40 mt-0.5 uppercase tracking-widest">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV.filter((n) => !n.adminOnly || user?.role === "admin").map((n) => {
          const active = pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-sage-700/60 text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <n.icon className="w-4 h-4 shrink-0" />
              {n.label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-sage-400" />}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="px-5 py-4 border-t border-white/10">
        {user && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-white/80 truncate">@{user.username}</p>
            <div className="flex gap-1.5 mt-1 flex-wrap">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sage-700/50 text-sage-300 capitalize">
                {user.role}
              </span>
              {user.permissions.map((p) => (
                <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50 capitalize">
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-2 text-xs text-white/50 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setUser(data); })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex bg-beige-50 font-sans">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar user={user} />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 h-full">
            <Sidebar user={user} onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-charcoal-dark text-white border-b border-white/10">
          <button onClick={() => setMobileOpen(true)} className="p-1">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <p className="font-serif text-sm font-semibold">Matrushakti Yog Admin</p>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
