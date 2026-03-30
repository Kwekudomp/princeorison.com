"use client";

import { useState } from "react";
import Link from "next/link";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import type { CollectionRow } from "@/lib/database.types";

const LABEL_CLASS = "block text-xs font-semibold tracking-widest uppercase mb-1.5";
const INPUT_CLASS = "w-full border rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none transition";
const BORDER = "#E8E4DE";

export default function CollectionsCMSClient({
  initialCollections,
}: {
  initialCollections: CollectionRow[];
  userEmail: string;
}) {
  const [collections, setCollections] = useState<CollectionRow[]>(initialCollections);
  const [toggling, setToggling] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ name: string; description: string; hero_description: string }>({ name: "", description: "", hero_description: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function togglePublished(col: CollectionRow) {
    setToggling(col.id);
    const supabase = createBrowserSupabase();
    const { error } = await supabase
      .from("collections")
      .update({ is_published: !col.is_published })
      .eq("id", col.id);
    if (!error) {
      setCollections(prev => prev.map(c => c.id === col.id ? { ...c, is_published: !c.is_published } : c));
    }
    setToggling(null);
  }

  function startEdit(col: CollectionRow) {
    setEditingId(col.id);
    setEditForm({ name: col.name, description: col.description ?? "", hero_description: col.hero_description ?? "" });
    setMsg("");
  }

  async function saveEdit(id: string) {
    setSaving(true);
    const supabase = createBrowserSupabase();
    const { error } = await supabase
      .from("collections")
      .update({ name: editForm.name, description: editForm.description, hero_description: editForm.hero_description })
      .eq("id", id);
    if (!error) {
      setCollections(prev => prev.map(c => c.id === id ? { ...c, ...editForm } : c));
      setEditingId(null);
      setMsg("Saved.");
      setTimeout(() => setMsg(""), 2500);
    }
    setSaving(false);
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: "#1A1A1A" }}>Collections</h1>
          <p className="text-sm mt-1" style={{ color: "#6B6B6B" }}>Manage your fashion collections. Click a collection to edit its products.</p>
        </div>
        {msg && <span className="text-sm font-medium" style={{ color: "#C9B06B" }}>{msg}</span>}
      </div>

      <div className="space-y-4">
        {collections.map(col => (
          <div key={col.id} className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: BORDER }}>
            {/* Row header */}
            <div className="flex items-center gap-4 px-6 py-4">
              {/* Cover thumbnail */}
              <div className="w-12 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                {col.cover_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={col.cover_image} alt={col.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "#1A1A1A" }}>
                    <svg className="w-5 h-5 opacity-30" fill="none" stroke="white" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>{col.name}</p>
                  {col.is_bespoke && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#F5F1EB", color: "#8B7A3D" }}>Bespoke</span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${col.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {col.is_published ? "Published" : "Hidden"}
                  </span>
                </div>
                <p className="text-xs mt-0.5 truncate" style={{ color: "#6B6B6B" }}>{col.description ?? "No description"}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => togglePublished(col)}
                  disabled={toggling === col.id}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium transition cursor-pointer disabled:opacity-50"
                  style={{ borderColor: BORDER, color: "#6B6B6B" }}
                >
                  {toggling === col.id ? "…" : col.is_published ? "Hide" : "Publish"}
                </button>
                <button
                  onClick={() => editingId === col.id ? setEditingId(null) : startEdit(col)}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium transition cursor-pointer"
                  style={{ borderColor: "#C9B06B", color: "#C9B06B" }}
                >
                  {editingId === col.id ? "Cancel" : "Edit"}
                </button>
                <Link
                  href={`/admin/collections/${col.slug}`}
                  className="text-xs px-3 py-1.5 rounded-full font-medium text-white transition cursor-pointer"
                  style={{ background: "#1A1A1A" }}
                >
                  Products →
                </Link>
              </div>
            </div>

            {/* Inline edit panel */}
            {editingId === col.id && (
              <div className="px-6 pb-5 pt-1 border-t space-y-4" style={{ borderColor: BORDER, background: "#FFFBF7" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Collection Name</label>
                    <input
                      className={INPUT_CLASS} style={{ borderColor: BORDER }}
                      value={editForm.name}
                      onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Short Description</label>
                    <input
                      className={INPUT_CLASS} style={{ borderColor: BORDER }}
                      value={editForm.description}
                      onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Hero Description (collection page intro)</label>
                  <textarea
                    rows={3}
                    className={INPUT_CLASS} style={{ borderColor: BORDER, resize: "vertical" }}
                    value={editForm.hero_description}
                    onChange={e => setEditForm(p => ({ ...p, hero_description: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => saveEdit(col.id)}
                    disabled={saving}
                    className="px-6 py-2 rounded-full text-sm font-semibold text-white transition cursor-pointer disabled:opacity-60"
                    style={{ background: "#C9B06B" }}
                  >
                    {saving ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
