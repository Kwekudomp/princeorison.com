"use client";

import { useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import type { EnquiryRow } from "@/lib/database.types";

const BORDER = "#E8E4DE";

const STATUS_STYLES: Record<EnquiryRow["status"], string> = {
  new: "bg-amber-100 text-amber-800",
  read: "bg-blue-100 text-blue-800",
  replied: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-500",
};

const STATUS_OPTIONS: EnquiryRow["status"][] = ["new", "read", "replied", "closed"];

export default function EnquiriesClient({ initialEnquiries }: { initialEnquiries: EnquiryRow[] }) {
  const [enquiries, setEnquiries] = useState<EnquiryRow[]>(initialEnquiries);
  const [filter, setFilter] = useState<EnquiryRow["status"] | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  function flash(text: string) { setMsg(text); setTimeout(() => setMsg(""), 2500); }

  async function updateStatus(id: string, status: EnquiryRow["status"]) {
    setUpdatingId(id);
    const supabase = createBrowserSupabase();
    await supabase.from("enquiries").update({ status }).eq("id", id);
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    setUpdatingId(null);
    flash("Status updated.");
  }

  const filtered = filter === "all" ? enquiries : enquiries.filter(e => e.status === filter);
  const counts = { all: enquiries.length, new: enquiries.filter(e => e.status === "new").length, read: enquiries.filter(e => e.status === "read").length, replied: enquiries.filter(e => e.status === "replied").length, closed: enquiries.filter(e => e.status === "closed").length };

  function whatsappLink(phone: string, name: string) {
    const cleaned = phone.replace(/\s+/g, "").replace(/^0/, "233");
    return `https://wa.me/${cleaned}?text=Hi+${encodeURIComponent(name)}%2C+thank+you+for+your+enquiry+with+Prince+Orison+Fashion+House.`;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: "#1A1A1A" }}>Enquiries</h1>
          <p className="text-sm mt-1" style={{ color: "#6B6B6B" }}>Consultation requests from the website. Reply via WhatsApp or email.</p>
        </div>
        {msg && <span className="text-sm font-medium" style={{ color: "#C9B06B" }}>{msg}</span>}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {(["all", "new", "read", "replied", "closed"] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="text-xs px-4 py-2 rounded-full font-medium transition cursor-pointer capitalize"
            style={{
              background: filter === s ? "#1A1A1A" : "white",
              color: filter === s ? "white" : "#6B6B6B",
              border: `1px solid ${filter === s ? "#1A1A1A" : BORDER}`,
            }}
          >
            {s} {s !== "all" && <span className="ml-1 opacity-70">({counts[s]})</span>}
            {s === "all" && <span className="ml-1 opacity-70">({counts.all})</span>}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16" style={{ color: "#6B6B6B" }}>
          <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <p className="text-sm">No {filter === "all" ? "" : filter} enquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(e => (
            <div key={e.id} className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: BORDER }}>
              {/* Row */}
              <div
                className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setExpanded(expanded === e.id ? null : e.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>{e.name}</p>
                    {e.event_type && (
                      <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: "#F5F1EB", color: "#8B7A3D" }}>
                        {e.event_type}
                      </span>
                    )}
                    {e.collection_interest && (
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#F5F1EB", color: "#6B6B6B" }}>
                        {e.collection_interest}
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#6B6B6B" }}>
                    {e.phone} · {new Date(e.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[e.status]}`}>{e.status}</span>
                  <svg className={`w-4 h-4 transition-transform ${expanded === e.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#6B6B6B" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded detail */}
              {expanded === e.id && (
                <div className="px-6 pb-5 border-t space-y-4" style={{ borderColor: BORDER, background: "#FFFBF7" }}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-sm">
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#6B6B6B" }}>Phone</p>
                      <p style={{ color: "#1A1A1A" }}>{e.phone}</p>
                    </div>
                    {e.email && (
                      <div>
                        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#6B6B6B" }}>Email</p>
                        <p style={{ color: "#1A1A1A" }}>{e.email}</p>
                      </div>
                    )}
                    {e.event_date && (
                      <div>
                        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#6B6B6B" }}>Event Date</p>
                        <p style={{ color: "#1A1A1A" }}>{new Date(e.event_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                      </div>
                    )}
                  </div>

                  {e.message && (
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#6B6B6B" }}>Message</p>
                      <p className="text-sm leading-relaxed p-3 rounded-xl" style={{ background: "white", color: "#1A1A1A", border: `1px solid ${BORDER}` }}>{e.message}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {/* Reply via WhatsApp */}
                    <a
                      href={whatsappLink(e.phone, e.name)}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition cursor-pointer"
                      style={{ background: "#25D366" }}
                      onClick={() => { if (e.status === "new" || e.status === "read") updateStatus(e.id, "replied"); }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Reply on WhatsApp
                    </a>

                    {e.email && (
                      <a
                        href={`mailto:${e.email}?subject=Re: Your Prince Orison Enquiry&body=Hi ${encodeURIComponent(e.name)},%0D%0A%0D%0AThank you for your enquiry with Prince Orison Fashion House.`}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition cursor-pointer"
                        style={{ borderColor: BORDER, color: "#1A1A1A" }}
                        onClick={() => { if (e.status === "new" || e.status === "read") updateStatus(e.id, "replied"); }}
                      >
                        Reply by Email
                      </a>
                    )}

                    {/* Status dropdown */}
                    <div className="ml-auto flex items-center gap-2">
                      <span className="text-xs" style={{ color: "#6B6B6B" }}>Status:</span>
                      <select
                        value={e.status}
                        onChange={ev => updateStatus(e.id, ev.target.value as EnquiryRow["status"])}
                        disabled={updatingId === e.id}
                        className="text-xs border rounded-xl px-3 py-1.5 bg-white cursor-pointer focus:outline-none disabled:opacity-60"
                        style={{ borderColor: BORDER, color: "#1A1A1A" }}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
