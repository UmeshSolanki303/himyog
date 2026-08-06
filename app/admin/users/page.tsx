"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Loader2, X, Save, Eye, EyeOff, ShieldCheck } from "lucide-react";

interface AdminUser {
  id: string;
  username: string;
  role: string;
  permissions: string[];
  createdAt: string;
}

const ROLE_OPTIONS = ["admin", "editor", "viewer"];
const PERM_OPTIONS = ["read", "write"];

const ROLE_BADGE: Record<string, string> = {
  admin:  "bg-sage-100 text-sage-700 border border-sage-200",
  editor: "bg-gold-100 text-gold-700 border border-gold-200",
  viewer: "bg-beige-200 text-charcoal border border-beige-300",
};

const inputCls =
  "w-full rounded-xl border border-sage-100 bg-beige-50 px-3 py-2.5 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-sage-400/60 focus:border-sage-300 transition-all";

// ─── User modal ───────────────────────────────────────────────────────────────
interface ModalProps {
  user: AdminUser | null;
  onClose: () => void;
  onSaved: (u: AdminUser) => void;
}

function UserModal({ user, onClose, onSaved }: ModalProps) {
  const isEdit = !!user;
  const [username, setUsername] = useState(user?.username ?? "");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState(user?.role ?? "viewer");
  const [permissions, setPermissions] = useState<string[]>(user?.permissions ?? ["read"]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Auto-set permissions when role changes
  function handleRole(r: string) {
    setRole(r);
    if (r === "admin") setPermissions(["read", "write"]);
    else if (r === "viewer") setPermissions(["read"]);
  }

  function togglePerm(p: string) {
    setPermissions((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEdit && !password) { setError("Password is required for new users"); return; }
    setSaving(true); setError("");

    try {
      const res = await fetch("/api/admin/users", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(isEdit ? { id: user!.id } : {}),
          username, role, permissions,
          ...(password ? { password } : {}),
        }),
      });
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
      <div className="bg-white rounded-2xl shadow-soft-lg border border-sage-100 w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-beige-200">
          <h2 className="font-serif text-lg text-charcoal font-medium">
            {isEdit ? "Edit User" : "Add User"}
          </h2>
          <button onClick={onClose} className="text-slate-soft hover:text-charcoal transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={submit} className="px-6 py-5 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">Username *</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} required className={inputCls} placeholder="johndoe" />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">
              Password {isEdit && <span className="normal-case text-slate-soft font-normal">(leave blank to keep current)</span>}
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!isEdit}
                className={`${inputCls} pr-10`}
                placeholder={isEdit ? "••••••••" : "Set a password"}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-soft hover:text-charcoal transition-colors"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">Role *</label>
            <div className="flex gap-2">
              {ROLE_OPTIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRole(r)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all capitalize ${
                    role === r
                      ? "bg-sage-600 text-white border-sage-600"
                      : "bg-white border-sage-100 text-charcoal/70 hover:border-sage-300"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-sage-600 mb-1.5">Permissions</label>
            <div className="flex gap-3">
              {PERM_OPTIONS.map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={permissions.includes(p)}
                    onChange={() => togglePerm(p)}
                    className="accent-sage-600"
                  />
                  <span className="text-sm text-charcoal capitalize">{p}</span>
                </label>
              ))}
            </div>
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
export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalUser, setModalUser] = useState<AdminUser | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  const fetchUsers = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/users")
      .then((r) => {
        if (r.status === 403) throw new Error("You don't have permission to manage users");
        return r.ok ? r.json() : [];
      })
      .then(setUsers)
      .catch((e) => showToast(e.message, false))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  async function deleteUser(id: string, username: string) {
    if (!confirm(`Delete user "${username}"? This cannot be undone.`)) return;
    setDeletingId(id);
    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      showToast("User deleted");
    } else {
      showToast(data.error ?? "Failed to delete user", false);
    }
    setDeletingId(null);
  }

  function openAdd() { setModalUser(null); setModalOpen(true); }
  function openEdit(u: AdminUser) { setModalUser(u); setModalOpen(true); }

  function handleSaved(saved: AdminUser) {
    setUsers((prev) => {
      const idx = prev.findIndex((u) => u.id === saved.id);
      if (idx !== -1) return prev.map((u) => u.id === saved.id ? saved : u);
      return [...prev, saved];
    });
    setModalOpen(false);
    showToast(modalUser ? "User updated" : "User added");
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold">Users</h1>
          <p className="text-slate-muted text-sm mt-0.5">{users.length} user{users.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-sage-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-sage-700 transition-colors shadow-soft"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Permission legend */}
      <div className="bg-white rounded-2xl border border-sage-100/80 shadow-soft p-4 flex flex-wrap gap-5 text-xs text-slate-muted">
        <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-sage-500" /><strong className="text-charcoal">admin</strong> — full access + manage users</div>
        <div><strong className="text-charcoal">editor</strong> — read + write reviews</div>
        <div><strong className="text-charcoal">viewer</strong> — read reviews only</div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-sage-100/80 shadow-soft overflow-hidden">
        {loading ? (
          <div className="py-16 flex items-center justify-center gap-2 text-slate-muted text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center text-slate-muted text-sm">No users yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-beige-50 border-b border-beige-200 text-xs text-slate-muted uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-medium">Username</th>
                  <th className="text-left px-4 py-3 font-medium">Role</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Permissions</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Created</th>
                  <th className="text-right px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-beige-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-charcoal to-charcoal-light flex items-center justify-center shrink-0">
                          <span className="text-white text-xs font-semibold uppercase">{u.username[0]}</span>
                        </div>
                        <span className="font-medium text-charcoal">@{u.username}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full capitalize ${ROLE_BADGE[u.role] ?? ROLE_BADGE.viewer}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <div className="flex gap-1.5 flex-wrap">
                        {u.permissions.map((p) => (
                          <span key={p} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-beige-100 text-charcoal/70 capitalize border border-beige-200">
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell text-xs text-slate-muted">
                      {new Date(u.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEdit(u)}
                          className="p-1.5 rounded-lg text-sage-500 hover:bg-sage-50 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteUser(u.id, u.username)}
                          disabled={deletingId === u.id}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors disabled:opacity-40"
                          title="Delete"
                        >
                          {deletingId === u.id
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <Trash2 className="w-4 h-4" />}
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
        <UserModal
          user={modalUser}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}

      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-soft-lg text-sm font-medium text-white ${toast.ok ? "bg-warm-sage-500" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
