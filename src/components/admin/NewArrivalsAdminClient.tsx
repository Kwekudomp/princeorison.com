"use client";

import { useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import type { ProductRow, CollectionRow } from "@/lib/database.types";

const BORDER = "#E8E4DE";
const INPUT_CLASS = "w-full border rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none transition";
const LABEL_CLASS = "block text-xs font-semibold tracking-widest uppercase mb-1.5";

const LABELS = ["New", "Featured", "Season", "Limited"] as const;
type ArrivalLabel = (typeof LABELS)[number];

export default function NewArrivalsAdminClient({
  initialProducts,
  collections,
  initialTitle,
  initialSubtitle,
}: {
  initialProducts: ProductRow[];
  collections: CollectionRow[];
  initialTitle: string;
  initialSubtitle: string;
}) {
  const [products, setProducts] = useState<ProductRow[]>(initialProducts);
  const [title, setTitle] = useState(initialTitle);
  const [subtitle, setSubtitle] = useState(initialSubtitle);
  const [savingTitle, setSavingTitle] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [filterCollection, setFilterCollection] = useState<string>("all");
  const [msg, setMsg] = useState("");

  function flash(text: string) { setMsg(text); setTimeout(() => setMsg(""), 2500); }

  async function saveTitle() {
    setSavingTitle(true);
    const supabase = createBrowserSupabase();
    await Promise.all([
      supabase.from("site_settings").upsert({ key: "new_arrivals_title", value: title }),
      supabase.from("site_settings").upsert({ key: "new_arrivals_subtitle", value: subtitle }),
    ]);
    setSavingTitle(false);
    flash("Season title saved. Visible on homepage.");
  }

  async function toggleArrival(product: ProductRow) {
    setTogglingId(product.id);
    const supabase = createBrowserSupabase();
    await supabase
      .from("products")
      .update({ is_new_arrival: !product.is_new_arrival })
      .eq("id", product.id);
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, is_new_arrival: !p.is_new_arrival } : p));
    setTogglingId(null);
  }

  async function setLabel(id: string, label: ArrivalLabel) {
    const supabase = createBrowserSupabase();
    await supabase.from("products").update({ arrival_label: label }).eq("id", id);
    setProducts(prev => prev.map(p => p.id === id ? { ...p, arrival_label: label } : p));
  }

  async function clearAll() {
    if (!confirm("Remove all products from New Arrivals? This won't delete the products.")) return;
    const supabase = createBrowserSupabase();
    await supabase.from("products").update({ is_new_arrival: false }).eq("is_new_arrival", true);
    setProducts(prev => prev.map(p => ({ ...p, is_new_arrival: false })));
    flash("All new arrivals cleared.");
  }

  const colMap = Object.fromEntries(collections.map(c => [c.id, c.name]));
  const filtered = filterCollection === "all"
    ? products
    : products.filter(p => p.collection_id === filterCollection);

  const arrivals = products.filter(p => p.is_new_arrival);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: "#1A1A1A" }}>New Arrivals</h1>
          <p className="text-sm mt-1" style={{ color: "#6B6B6B" }}>
            Set the season name that appears on the homepage, and choose which products to feature.
          </p>
        </div>
        {msg && <span className="text-sm font-medium flex-shrink-0" style={{ color: "#C9B06B" }}>{msg}</span>}
      </div>

      {/* Season title card */}
      <div className="bg-white rounded-2xl border p-6 mb-6 space-y-4" style={{ borderColor: BORDER }}>
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#C9B06B" }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          <h2 className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>Season Announcement</h2>
        </div>
        <p className="text-xs" style={{ color: "#6B6B6B" }}>
          This is the headline shown in the New Arrivals section on the homepage. Change it to announce a new season — e.g. <em>&quot;Harmattan Collection 2025&quot;</em> or <em>&quot;Eid Collection&quot;</em>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Section Title</label>
            <input
              className={INPUT_CLASS} style={{ borderColor: BORDER }}
              placeholder="New Arrivals"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Subtitle / Tagline</label>
            <input
              className={INPUT_CLASS} style={{ borderColor: BORDER }}
              placeholder="The latest pieces fresh from the atelier"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
            />
          </div>
        </div>
        {/* Preview */}
        <div className="rounded-xl p-4" style={{ background: "#1A1A1A" }}>
          <p className="text-xs tracking-[3px] uppercase mb-1" style={{ color: "#C9B06B" }}>Preview</p>
          <p className="font-display text-xl font-semibold text-white">{title || "New Arrivals"}</p>
          {subtitle && <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>{subtitle}</p>}
        </div>
        <div className="flex justify-end">
          <button
            onClick={saveTitle}
            disabled={savingTitle}
            className="px-6 py-2 rounded-full text-sm font-semibold text-white cursor-pointer disabled:opacity-60"
            style={{ background: "#C9B06B" }}
          >
            {savingTitle ? "Saving…" : "Save & Publish"}
          </button>
        </div>
      </div>

      {/* Currently featured summary */}
      <div className="bg-white rounded-2xl border p-5 mb-6" style={{ borderColor: BORDER }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>
            Currently Featured
            <span className="ml-2 font-normal text-xs px-2 py-0.5 rounded-full" style={{ background: "#F5F1EB", color: "#8B7A3D" }}>
              {arrivals.length} product{arrivals.length !== 1 ? "s" : ""}
            </span>
          </h2>
          {arrivals.length > 0 && (
            <button onClick={clearAll} className="text-xs font-medium transition cursor-pointer" style={{ color: "#ef4444" }}>
              Clear all
            </button>
          )}
        </div>
        {arrivals.length === 0 ? (
          <p className="text-xs" style={{ color: "#6B6B6B" }}>No products marked as new arrivals. Toggle products below to feature them.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {arrivals.map(p => (
              <span key={p.id} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: "rgba(201,176,107,0.12)", color: "#8B7A3D" }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#C9B06B" }} />
                {p.name}
                <span className="opacity-60">· {p.arrival_label}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Products table */}
      <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: BORDER }}>
        <div className="px-6 py-4 border-b flex items-center justify-between gap-4 flex-wrap" style={{ borderColor: BORDER }}>
          <h2 className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>All Products</h2>
          <select
            className="text-xs border rounded-xl px-3 py-2 bg-white cursor-pointer focus:outline-none"
            style={{ borderColor: BORDER, color: "#1A1A1A" }}
            value={filterCollection}
            onChange={e => setFilterCollection(e.target.value)}
          >
            <option value="all">All Collections</option>
            {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="divide-y" style={{ borderColor: BORDER }}>
          {filtered.map(product => (
            <div
              key={product.id}
              className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition"
              style={{ borderColor: BORDER }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: "#1A1A1A" }}>{product.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "#6B6B6B" }}>{colMap[product.collection_id] ?? "—"}</p>
              </div>

              {/* Label selector — only visible when arrival is on */}
              {product.is_new_arrival && (
                <div className="flex gap-1.5 flex-wrap">
                  {LABELS.map(label => (
                    <button
                      key={label}
                      onClick={() => setLabel(product.id, label)}
                      className="text-xs px-2.5 py-1 rounded-full border font-medium transition cursor-pointer"
                      style={{
                        background: product.arrival_label === label ? "#C9B06B" : "white",
                        color: product.arrival_label === label ? "white" : "#6B6B6B",
                        borderColor: product.arrival_label === label ? "#C9B06B" : BORDER,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              {/* Toggle */}
              <button
                onClick={() => toggleArrival(product)}
                disabled={togglingId === product.id}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer disabled:opacity-50 flex-shrink-0"
                style={{ background: product.is_new_arrival ? "#C9B06B" : "#E5E7EB" }}
                title={product.is_new_arrival ? "Remove from new arrivals" : "Add to new arrivals"}
              >
                <span
                  className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
                  style={{ transform: product.is_new_arrival ? "translateX(24px)" : "translateX(4px)" }}
                />
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="px-6 py-8 text-sm text-center" style={{ color: "#6B6B6B" }}>No products found.</p>
        )}
      </div>
    </div>
  );
}
