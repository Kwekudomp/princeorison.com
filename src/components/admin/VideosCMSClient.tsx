"use client";

import { useState, useRef } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import type { VideoRow } from "@/lib/database.types";

const BORDER = "#E8E4DE";
const INPUT_CLASS = "w-full border rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none transition";
const LABEL_CLASS = "block text-xs font-semibold tracking-widest uppercase mb-1.5";

type VideoForm = {
  title: string;
  caption: string;
  category: VideoRow["category"];
  display_order: string;
};

const EMPTY_FORM: VideoForm = { title: "", caption: "", category: "showcase", display_order: "0" };

export default function VideosCMSClient({ initialVideos }: { initialVideos: VideoRow[] }) {
  const [videos, setVideos] = useState<VideoRow[]>(initialVideos);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<VideoForm>(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [saving, setSaving] = useState(false);
  const [togglingFeatured, setTogglingFeatured] = useState<string | null>(null);
  const [togglingPublished, setTogglingPublished] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  const videoFileRef = useRef<HTMLInputElement>(null);
  const thumbnailFileRef = useRef<HTMLInputElement>(null);
  const pendingVideoPath = useRef<string>("");
  const pendingThumbPath = useRef<string>("");

  function flash(text: string) { setMsg(text); setTimeout(() => setMsg(""), 3000); }

  async function uploadVideo(file: File) {
    setUploading(true);
    setUploadProgress("Uploading video…");
    const supabase = createBrowserSupabase();
    const ext = file.name.split(".").pop();
    const path = `videos/${Date.now()}.${ext}`;
    const { data: { publicUrl } } = await (async () => {
      const { error } = await supabase.storage.from("videos").upload(path, file, { upsert: false });
      if (error) { flash("Video upload failed: " + error.message); setUploading(false); setUploadProgress(""); return { data: { publicUrl: "" } }; }
      return supabase.storage.from("videos").getPublicUrl(path);
    })();
    pendingVideoPath.current = publicUrl;
    setUploadProgress(publicUrl ? "Video ready." : "");
    setUploading(false);
  }

  async function uploadThumbnail(file: File) {
    const supabase = createBrowserSupabase();
    const ext = file.name.split(".").pop();
    const path = `thumbnails/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("videos").upload(path, file, { upsert: false });
    if (error) { flash("Thumbnail upload failed."); return; }
    const { data: { publicUrl } } = supabase.storage.from("videos").getPublicUrl(path);
    pendingThumbPath.current = publicUrl;
    flash("Thumbnail uploaded.");
  }

  async function saveVideo() {
    if (!form.title.trim() || !pendingVideoPath.current) {
      flash("Please upload a video and enter a title.");
      return;
    }
    setSaving(true);
    const supabase = createBrowserSupabase();
    const { data, error } = await supabase.from("videos").insert({
      title: form.title,
      caption: form.caption || null,
      storage_path: pendingVideoPath.current,
      thumbnail_path: pendingThumbPath.current || null,
      category: form.category,
      display_order: parseInt(form.display_order) || 0,
      is_published: true,
      is_featured: videos.length === 0, // auto-feature first video
    }).select().single();

    if (error || !data) { flash("Error saving: " + error?.message); setSaving(false); return; }
    setVideos(prev => [...prev, data as VideoRow]);
    setForm(EMPTY_FORM);
    pendingVideoPath.current = "";
    pendingThumbPath.current = "";
    setShowForm(false);
    setSaving(false);
    flash("Video added!");
  }

  async function setFeatured(id: string) {
    setTogglingFeatured(id);
    const supabase = createBrowserSupabase();
    // Unfeature all, then feature the selected one
    for (const v of videos) {
      await supabase.from("videos").update({ is_featured: v.id === id }).eq("id", v.id);
    }
    setVideos(prev => prev.map(v => ({ ...v, is_featured: v.id === id })));
    setTogglingFeatured(null);
    flash("Featured video updated.");
  }

  async function togglePublished(v: VideoRow) {
    setTogglingPublished(v.id);
    const supabase = createBrowserSupabase();
    await supabase.from("videos").update({ is_published: !v.is_published }).eq("id", v.id);
    setVideos(prev => prev.map(vid => vid.id === v.id ? { ...vid, is_published: !vid.is_published } : vid));
    setTogglingPublished(null);
  }

  async function deleteVideo(v: VideoRow) {
    if (!confirm(`Delete "${v.title}"? This cannot be undone.`)) return;
    const supabase = createBrowserSupabase();
    await supabase.from("videos").delete().eq("id", v.id);
    setVideos(prev => prev.filter(vid => vid.id !== v.id));
    flash("Video deleted.");
  }

  const CATEGORY_LABELS: Record<VideoRow["category"], string> = {
    showcase: "Showcase", lookbook: "Lookbook", "behind-the-scenes": "Behind the Scenes", reel: "Reel",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: "#1A1A1A" }}>Videos & Reels</h1>
          <p className="text-sm mt-1" style={{ color: "#6B6B6B" }}>Upload showcase videos. One can be set as the homepage featured reel.</p>
        </div>
        <div className="flex items-center gap-3">
          {msg && <span className="text-sm font-medium" style={{ color: "#C9B06B" }}>{msg}</span>}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white cursor-pointer"
              style={{ background: "#C9B06B" }}
            >
              + Upload Video
            </button>
          )}
        </div>
      </div>

      {/* Upload form */}
      {showForm && (
        <div className="bg-white rounded-2xl border p-6 mb-6 space-y-5" style={{ borderColor: BORDER }}>
          <h2 className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>Upload New Video</h2>

          {/* Video file */}
          <div>
            <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Video File *  (MP4, WebM, MOV — max 100MB)</label>
            <div className="flex items-center gap-3">
              <input ref={videoFileRef} type="file" accept="video/mp4,video/webm,video/quicktime" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) uploadVideo(f); }} />
              <button
                onClick={() => videoFileRef.current?.click()}
                disabled={uploading}
                className="px-4 py-2.5 rounded-xl border text-sm font-medium cursor-pointer disabled:opacity-60 transition"
                style={{ borderColor: "#C9B06B", color: "#C9B06B" }}
              >
                {uploading ? "Uploading…" : "Choose Video"}
              </button>
              <span className="text-xs" style={{ color: "#6B6B6B" }}>
                {uploadProgress || (pendingVideoPath.current ? "Video selected." : "No file chosen")}
              </span>
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Thumbnail / Poster Image (optional)</label>
            <div className="flex items-center gap-3">
              <input ref={thumbnailFileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) uploadThumbnail(f); }} />
              <button
                onClick={() => thumbnailFileRef.current?.click()}
                className="px-4 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition"
                style={{ borderColor: BORDER, color: "#6B6B6B" }}
              >
                Choose Thumbnail
              </button>
              <span className="text-xs" style={{ color: "#6B6B6B" }}>
                {pendingThumbPath.current ? "Thumbnail selected." : "No thumbnail"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Title *</label>
              <input className={INPUT_CLASS} style={{ borderColor: BORDER }}
                value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div>
              <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Category</label>
              <select className={INPUT_CLASS} style={{ borderColor: BORDER }}
                value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as VideoRow["category"] }))}>
                {Object.entries(CATEGORY_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Caption</label>
            <textarea rows={2} className={INPUT_CLASS} style={{ borderColor: BORDER, resize: "vertical" }}
              value={form.caption} onChange={e => setForm(p => ({ ...p, caption: e.target.value }))} />
          </div>

          <div className="flex gap-3 justify-end">
            <button onClick={() => { setShowForm(false); setForm(EMPTY_FORM); pendingVideoPath.current = ""; pendingThumbPath.current = ""; }}
              className="px-4 py-2 rounded-full text-sm border cursor-pointer" style={{ borderColor: BORDER, color: "#6B6B6B" }}>
              Cancel
            </button>
            <button onClick={saveVideo} disabled={saving || uploading || !pendingVideoPath.current}
              className="px-6 py-2 rounded-full text-sm font-semibold text-white cursor-pointer disabled:opacity-60"
              style={{ background: "#C9B06B" }}>
              {saving ? "Saving…" : "Save Video"}
            </button>
          </div>
        </div>
      )}

      {/* Videos list */}
      {videos.length === 0 && !showForm ? (
        <div className="text-center py-16" style={{ color: "#6B6B6B" }}>
          <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">No videos yet. Upload your first showcase reel.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {videos.map(v => (
            <div key={v.id} className="bg-white rounded-2xl border flex items-center gap-4 px-6 py-4" style={{ borderColor: BORDER }}>
              {/* Thumbnail */}
              <div className="w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-900 flex items-center justify-center">
                {v.thumbnail_path ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.thumbnail_path} alt={v.title} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-6 h-6 opacity-40" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>{v.title}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#F5F1EB", color: "#6B6B6B" }}>
                    {CATEGORY_LABELS[v.category]}
                  </span>
                  {v.is_featured && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#C9B06B", color: "white" }}>
                      Homepage Featured
                    </span>
                  )}
                  {!v.is_published && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Hidden</span>
                  )}
                </div>
                {v.caption && <p className="text-xs mt-0.5 truncate" style={{ color: "#6B6B6B" }}>{v.caption}</p>}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                {!v.is_featured && (
                  <button
                    onClick={() => setFeatured(v.id)}
                    disabled={togglingFeatured === v.id}
                    className="text-xs px-3 py-1.5 rounded-full border font-medium transition cursor-pointer disabled:opacity-50"
                    style={{ borderColor: "#C9B06B", color: "#C9B06B" }}
                  >
                    {togglingFeatured === v.id ? "…" : "Set Featured"}
                  </button>
                )}
                <button
                  onClick={() => togglePublished(v)}
                  disabled={togglingPublished === v.id}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium transition cursor-pointer disabled:opacity-50"
                  style={{ borderColor: BORDER, color: "#6B6B6B" }}
                >
                  {togglingPublished === v.id ? "…" : v.is_published ? "Hide" : "Publish"}
                </button>
                <button
                  onClick={() => deleteVideo(v)}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium transition cursor-pointer"
                  style={{ borderColor: "#fca5a5", color: "#ef4444" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
