"use client";

import { useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import type { NewsletterRow } from "@/lib/database.types";

const BORDER = "#E8E4DE";

export default function NewsletterClient({ initialSubscribers }: { initialSubscribers: NewsletterRow[] }) {
  const [subscribers, setSubscribers] = useState<NewsletterRow[]>(initialSubscribers);
  const [search, setSearch] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  function flash(text: string) { setMsg(text); setTimeout(() => setMsg(""), 2500); }

  async function toggleActive(sub: NewsletterRow) {
    setTogglingId(sub.id);
    const supabase = createBrowserSupabase();
    await supabase.from("newsletter_subscribers").update({ is_active: !sub.is_active }).eq("id", sub.id);
    setSubscribers(prev => prev.map(s => s.id === sub.id ? { ...s, is_active: !s.is_active } : s));
    setTogglingId(null);
    flash(sub.is_active ? "Subscriber deactivated." : "Subscriber reactivated.");
  }

  function copyEmails() {
    const active = filtered.filter(s => s.is_active).map(s => s.email).join(", ");
    navigator.clipboard.writeText(active);
    flash(`Copied ${filtered.filter(s => s.is_active).length} emails to clipboard.`);
  }

  const filtered = subscribers.filter(s =>
    !search || s.email.toLowerCase().includes(search.toLowerCase())
  );
  const activeCount = subscribers.filter(s => s.is_active).length;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: "#1A1A1A" }}>Newsletter</h1>
          <p className="text-sm mt-1" style={{ color: "#6B6B6B" }}>
            {activeCount} active subscriber{activeCount !== 1 ? "s" : ""} · {subscribers.length} total
          </p>
        </div>
        <div className="flex items-center gap-3">
          {msg && <span className="text-sm font-medium" style={{ color: "#C9B06B" }}>{msg}</span>}
          <button
            onClick={copyEmails}
            className="px-4 py-2.5 rounded-full text-sm font-medium border transition cursor-pointer"
            style={{ borderColor: "#C9B06B", color: "#C9B06B" }}
          >
            Copy Emails
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="search"
          placeholder="Search by email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none transition"
          style={{ borderColor: BORDER }}
        />
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", value: subscribers.length },
          { label: "Active", value: activeCount },
          { label: "Unsubscribed", value: subscribers.length - activeCount },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border p-4 text-center" style={{ borderColor: BORDER }}>
            <p className="text-2xl font-display font-semibold" style={{ color: "#C9B06B" }}>{s.value}</p>
            <p className="text-xs mt-0.5 font-medium uppercase tracking-wider" style={{ color: "#6B6B6B" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16" style={{ color: "#6B6B6B" }}>
          <p className="text-sm">{search ? "No matching subscribers." : "No subscribers yet."}</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: BORDER }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: BORDER }}>
                <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase" style={{ color: "#6B6B6B" }}>Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-widest uppercase" style={{ color: "#6B6B6B" }}>Source</th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-widest uppercase" style={{ color: "#6B6B6B" }}>Joined</th>
                <th className="text-right px-6 py-3 text-xs font-semibold tracking-widest uppercase" style={{ color: "#6B6B6B" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub, i) => (
                <tr key={sub.id} className="border-b last:border-0 hover:bg-gray-50 transition" style={{ borderColor: BORDER }}>
                  <td className="px-6 py-3 font-medium" style={{ color: sub.is_active ? "#1A1A1A" : "#9CA3AF" }}>{sub.email}</td>
                  <td className="px-4 py-3 text-xs capitalize" style={{ color: "#6B6B6B" }}>{sub.source ?? "website"}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#6B6B6B" }}>
                    {new Date(sub.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => toggleActive(sub)}
                      disabled={togglingId === sub.id}
                      className="text-xs px-3 py-1.5 rounded-full border font-medium transition cursor-pointer disabled:opacity-50"
                      style={{
                        borderColor: sub.is_active ? BORDER : "#C9B06B",
                        color: sub.is_active ? "#6B6B6B" : "#C9B06B",
                      }}
                    >
                      {togglingId === sub.id ? "…" : sub.is_active ? "Deactivate" : "Reactivate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length > 0 && (
            <div className="px-6 py-3 border-t text-xs" style={{ borderColor: BORDER, color: "#6B6B6B" }}>
              Showing {filtered.length} of {subscribers.length} subscribers
            </div>
          )}
        </div>
      )}
    </div>
  );
}
