"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import type { CollectionRow, ProductRow, ProductImageRow, ProductFeatureRow } from "@/lib/database.types";

const BORDER = "#E8E4DE";
const INPUT_CLASS = "w-full border rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none transition";
const LABEL_CLASS = "block text-xs font-semibold tracking-widest uppercase mb-1.5";

type ProductWithImages = ProductRow & {
  images: ProductImageRow[];
  features: ProductFeatureRow[];
};

const EMPTY_NEW_PRODUCT = {
  name: "",
  description: "",
  whatsapp_message: "",
  features: "",
};

export default function CollectionEditorClient({
  collection,
  initialProducts,
  initialImages,
  initialFeatures,
}: {
  collection: CollectionRow;
  initialProducts: ProductRow[];
  initialImages: ProductImageRow[];
  initialFeatures: ProductFeatureRow[];
}) {
  const [products, setProducts] = useState<ProductWithImages[]>(
    initialProducts.map(p => ({
      ...p,
      images: initialImages.filter(i => i.product_id === p.id),
      features: initialFeatures.filter(f => f.product_id === p.id),
    }))
  );

  // Cover image upload for collection
  const [uploadingCover, setUploadingCover] = useState(false);
  const [coverImage, setCoverImage] = useState(collection.cover_image ?? "");
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Product editing
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editProductForm, setEditProductForm] = useState({ name: "", description: "", whatsapp_message: "", features: "" });
  const [savingProduct, setSavingProduct] = useState(false);

  // New product form
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [newProduct, setNewProduct] = useState(EMPTY_NEW_PRODUCT);
  const [addingProduct, setAddingProduct] = useState(false);

  // Image upload per product
  const [uploadingImageFor, setUploadingImageFor] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const activeProductId = useRef<string | null>(null);

  // Toggling new arrival
  const [togglingArrival, setTogglingArrival] = useState<string | null>(null);

  const [msg, setMsg] = useState("");

  function flash(text: string) {
    setMsg(text);
    setTimeout(() => setMsg(""), 3000);
  }

  // ── Cover image upload ──────────────────────────────────────
  async function uploadCover(file: File) {
    setUploadingCover(true);
    const supabase = createBrowserSupabase();
    const ext = file.name.split(".").pop();
    const path = `collections/${collection.slug}/cover.${ext}`;
    const { error: uploadErr } = await supabase.storage.from("product-images").upload(path, file, { upsert: true });
    if (uploadErr) { flash("Upload failed: " + uploadErr.message); setUploadingCover(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(path);
    await supabase.from("collections").update({ cover_image: publicUrl }).eq("id", collection.id);
    setCoverImage(publicUrl);
    flash("Cover image updated.");
    setUploadingCover(false);
  }

  // ── Edit product ──────────────────────────────────────────
  function startEditProduct(p: ProductWithImages) {
    setEditingProductId(p.id);
    setEditProductForm({
      name: p.name,
      description: p.description ?? "",
      whatsapp_message: p.whatsapp_message ?? "",
      features: p.features.map(f => f.feature).join("\n"),
    });
  }

  async function saveProduct(id: string) {
    setSavingProduct(true);
    const supabase = createBrowserSupabase();
    await supabase.from("products").update({
      name: editProductForm.name,
      description: editProductForm.description,
      whatsapp_message: editProductForm.whatsapp_message,
    }).eq("id", id);

    // Replace features
    await supabase.from("product_features").delete().eq("product_id", id);
    const featureLines = editProductForm.features.split("\n").map(f => f.trim()).filter(Boolean);
    if (featureLines.length > 0) {
      await supabase.from("product_features").insert(
        featureLines.map((feature, idx) => ({ product_id: id, feature, sort_order: idx + 1 }))
      );
    }

    const newFeatures: ProductFeatureRow[] = featureLines.map((feature, idx) => ({
      id: `tmp-${idx}`, product_id: id, feature, sort_order: idx + 1,
    }));

    setProducts(prev => prev.map(p => p.id === id ? {
      ...p,
      name: editProductForm.name,
      description: editProductForm.description,
      whatsapp_message: editProductForm.whatsapp_message,
      features: newFeatures,
    } : p));

    setEditingProductId(null);
    setSavingProduct(false);
    flash("Product saved.");
  }

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product and all its images?")) return;
    const supabase = createBrowserSupabase();
    await supabase.from("products").delete().eq("id", id);
    setProducts(prev => prev.filter(p => p.id !== id));
    flash("Product deleted.");
  }

  async function togglePublishedProduct(p: ProductWithImages) {
    const supabase = createBrowserSupabase();
    await supabase.from("products").update({ is_published: !p.is_published }).eq("id", p.id);
    setProducts(prev => prev.map(pr => pr.id === p.id ? { ...pr, is_published: !pr.is_published } : pr));
  }

  async function toggleNewArrival(p: ProductWithImages) {
    setTogglingArrival(p.id);
    const supabase = createBrowserSupabase();
    await supabase.from("products").update({ is_new_arrival: !p.is_new_arrival }).eq("id", p.id);
    setProducts(prev => prev.map(pr => pr.id === p.id ? { ...pr, is_new_arrival: !pr.is_new_arrival } : pr));
    setTogglingArrival(null);
    flash(p.is_new_arrival ? "Removed from new arrivals." : "Added to new arrivals!");
  }

  async function setArrivalLabel(id: string, label: ProductRow["arrival_label"]) {
    const supabase = createBrowserSupabase();
    await supabase.from("products").update({ arrival_label: label }).eq("id", id);
    setProducts(prev => prev.map(p => p.id === id ? { ...p, arrival_label: label } : p));
  }

  // ── Add product ─────────────────────────────────────────────
  async function addProduct() {
    if (!newProduct.name.trim()) return;
    setAddingProduct(true);
    const supabase = createBrowserSupabase();
    const maxOrder = Math.max(0, ...products.map(p => p.display_order));
    const { data, error } = await supabase.from("products").insert({
      collection_id: collection.id,
      name: newProduct.name,
      description: newProduct.description,
      whatsapp_message: newProduct.whatsapp_message || `Hi, I'm interested in the ${newProduct.name}`,
      display_order: maxOrder + 1,
      is_published: true,
      is_new_arrival: false,
      arrival_label: "New" as const,
    }).select().single();

    if (error || !data) { flash("Error adding product."); setAddingProduct(false); return; }

    const featureLines = newProduct.features.split("\n").map(f => f.trim()).filter(Boolean);
    if (featureLines.length > 0) {
      await supabase.from("product_features").insert(
        featureLines.map((feature, idx) => ({ product_id: data.id, feature, sort_order: idx + 1 }))
      );
    }

    const newFeatures: ProductFeatureRow[] = featureLines.map((feature, idx) => ({
      id: `tmp-${idx}`, product_id: data.id, feature, sort_order: idx + 1,
    }));

    setProducts(prev => [...prev, { ...(data as ProductRow), images: [], features: newFeatures }]);
    setNewProduct(EMPTY_NEW_PRODUCT);
    setShowNewProduct(false);
    setAddingProduct(false);
    flash("Product added!");
  }

  // ── Upload product image ──────────────────────────────────
  async function uploadProductImage(productId: string, file: File) {
    setUploadingImageFor(productId);
    const supabase = createBrowserSupabase();
    const ext = file.name.split(".").pop();
    const path = `products/${collection.slug}/${productId}-${Date.now()}.${ext}`;
    const { error: uploadErr } = await supabase.storage.from("product-images").upload(path, file, { upsert: false });
    if (uploadErr) { flash("Upload failed: " + uploadErr.message); setUploadingImageFor(null); return; }
    const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(path);
    const product = products.find(p => p.id === productId);
    const isCover = !product || product.images.length === 0;
    const { data: imgRow } = await supabase.from("product_images").insert({
      product_id: productId,
      storage_path: publicUrl,
      alt_text: product?.name ?? "",
      sort_order: (product?.images.length ?? 0) + 1,
      is_cover: isCover,
    }).select().single();

    if (imgRow) {
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, images: [...p.images, imgRow as ProductImageRow] } : p));
      // Update collection cover if this is the first image of display_order=1 product
      if (isCover && !coverImage) {
        await supabase.from("collections").update({ cover_image: publicUrl }).eq("id", collection.id);
        setCoverImage(publicUrl);
      }
    }
    setUploadingImageFor(null);
    flash("Image uploaded!");
  }

  async function deleteImage(img: ProductImageRow, productId: string) {
    if (!confirm("Delete this image?")) return;
    const supabase = createBrowserSupabase();
    await supabase.from("product_images").delete().eq("id", img.id);
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, images: p.images.filter(i => i.id !== img.id) } : p));
    flash("Image deleted.");
  }

  async function setCover(img: ProductImageRow, productId: string) {
    const supabase = createBrowserSupabase();
    // Unset all covers for this product
    const product = products.find(p => p.id === productId);
    if (!product) return;
    for (const i of product.images) {
      await supabase.from("product_images").update({ is_cover: i.id === img.id }).eq("id", i.id);
    }
    setProducts(prev => prev.map(p =>
      p.id === productId ? { ...p, images: p.images.map(i => ({ ...i, is_cover: i.id === img.id })) } : p
    ));
    flash("Cover image set.");
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back + header */}
      <div className="flex items-center gap-3 mb-2">
        <Link href="/admin/collections" className="text-sm transition cursor-pointer" style={{ color: "#C9B06B" }}>
          ← Collections
        </Link>
      </div>
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: "#1A1A1A" }}>{collection.name}</h1>
          <p className="text-sm mt-1" style={{ color: "#6B6B6B" }}>Manage products, images, and new arrival flags</p>
        </div>
        {msg && <span className="text-sm font-medium flex-shrink-0" style={{ color: "#C9B06B" }}>{msg}</span>}
      </div>

      {/* Collection cover image */}
      <div className="bg-white rounded-2xl border p-6 mb-6" style={{ borderColor: BORDER }}>
        <h2 className="font-semibold text-sm mb-4" style={{ color: "#1A1A1A" }}>Collection Cover Image</h2>
        <div className="flex items-center gap-5">
          <div className="w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
            {coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverImage} alt="cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: "#F5F1EB" }}>
                <svg className="w-6 h-6 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs mb-2" style={{ color: "#6B6B6B" }}>Shown on the homepage collections grid. Max 5MB, JPEG/PNG/WebP.</p>
            <input ref={coverInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) uploadCover(f); }} />
            <button
              onClick={() => coverInputRef.current?.click()}
              disabled={uploadingCover}
              className="px-4 py-2 rounded-full text-sm font-medium border transition cursor-pointer disabled:opacity-60"
              style={{ borderColor: "#C9B06B", color: "#C9B06B" }}
            >
              {uploadingCover ? "Uploading…" : "Upload Cover"}
            </button>
          </div>
        </div>
      </div>

      {/* Products list */}
      <div className="space-y-4">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: BORDER }}>
            {/* Product row */}
            <div className="flex items-center gap-4 px-6 py-4">
              {/* First image thumbnail */}
              <div className="w-12 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                {product.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.images[0].storage_path} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "#F5F1EB" }}>
                    <svg className="w-4 h-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>{product.name}</p>
                  {!product.is_published && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Hidden</span>
                  )}
                  {product.is_new_arrival && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(201,176,107,0.15)", color: "#8B7A3D" }}>
                      {product.arrival_label}
                    </span>
                  )}
                </div>
                <p className="text-xs mt-0.5 truncate" style={{ color: "#6B6B6B" }}>
                  {product.images.length} image{product.images.length !== 1 ? "s" : ""} · {product.features.length} feature{product.features.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                <button
                  onClick={() => toggleNewArrival(product)}
                  disabled={togglingArrival === product.id}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium transition cursor-pointer disabled:opacity-50"
                  style={{ borderColor: product.is_new_arrival ? "#C9B06B" : BORDER, color: product.is_new_arrival ? "#C9B06B" : "#6B6B6B" }}
                >
                  {togglingArrival === product.id ? "…" : product.is_new_arrival ? "★ Arrival" : "Mark Arrival"}
                </button>
                <button
                  onClick={() => togglePublishedProduct(product)}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium transition cursor-pointer"
                  style={{ borderColor: BORDER, color: "#6B6B6B" }}
                >
                  {product.is_published ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => editingProductId === product.id ? setEditingProductId(null) : startEditProduct(product)}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium transition cursor-pointer"
                  style={{ borderColor: "#C9B06B", color: "#C9B06B" }}
                >
                  {editingProductId === product.id ? "Close" : "Edit"}
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium transition cursor-pointer"
                  style={{ borderColor: "#fca5a5", color: "#ef4444" }}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Edit panel */}
            {editingProductId === product.id && (
              <div className="px-6 pb-6 pt-2 border-t space-y-5" style={{ borderColor: BORDER, background: "#FFFBF7" }}>
                {/* New arrival label */}
                {product.is_new_arrival && (
                  <div>
                    <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Arrival Label</label>
                    <div className="flex gap-2 flex-wrap">
                      {(["New", "Featured", "Season", "Limited"] as const).map(label => (
                        <button
                          key={label}
                          onClick={() => setArrivalLabel(product.id, label)}
                          className="text-xs px-3 py-1.5 rounded-full border font-medium transition cursor-pointer"
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
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Product Name</label>
                    <input className={INPUT_CLASS} style={{ borderColor: BORDER }}
                      value={editProductForm.name}
                      onChange={e => setEditProductForm(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>WhatsApp Message</label>
                    <input className={INPUT_CLASS} style={{ borderColor: BORDER }}
                      value={editProductForm.whatsapp_message}
                      onChange={e => setEditProductForm(p => ({ ...p, whatsapp_message: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Description</label>
                  <textarea rows={2} className={INPUT_CLASS} style={{ borderColor: BORDER, resize: "vertical" }}
                    value={editProductForm.description}
                    onChange={e => setEditProductForm(p => ({ ...p, description: e.target.value }))} />
                </div>
                <div>
                  <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Features (one per line)</label>
                  <textarea rows={4} className={INPUT_CLASS} style={{ borderColor: BORDER, resize: "vertical" }}
                    placeholder="Premium fabric&#10;Tailored fit&#10;Includes matching trousers"
                    value={editProductForm.features}
                    onChange={e => setEditProductForm(p => ({ ...p, features: e.target.value }))} />
                </div>

                {/* Images */}
                <div>
                  <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Product Images</label>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {product.images.map(img => (
                      <div key={img.id} className="relative group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.storage_path} alt="" className="w-20 h-24 object-cover rounded-xl border" style={{ borderColor: img.is_cover ? "#C9B06B" : BORDER }} />
                        {img.is_cover && (
                          <span className="absolute top-1 left-1 text-xs px-1.5 py-0.5 rounded-md font-bold" style={{ background: "#C9B06B", color: "white" }}>Cover</span>
                        )}
                        <div className="absolute inset-0 rounded-xl bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1">
                          {!img.is_cover && (
                            <button onClick={() => setCover(img, product.id)} className="text-xs bg-white px-2 py-1 rounded-lg font-medium cursor-pointer">Cover</button>
                          )}
                          <button onClick={() => deleteImage(img, product.id)} className="text-xs bg-red-500 text-white px-2 py-1 rounded-lg font-medium cursor-pointer">Del</button>
                        </div>
                      </div>
                    ))}

                    {/* Upload button */}
                    <button
                      onClick={() => { activeProductId.current = product.id; imageInputRef.current?.click(); }}
                      disabled={uploadingImageFor === product.id}
                      className="w-20 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-xs gap-1 cursor-pointer transition disabled:opacity-50"
                      style={{ borderColor: "#C9B06B", color: "#C9B06B" }}
                    >
                      {uploadingImageFor === product.id ? (
                        <span>…</span>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                          </svg>
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => saveProduct(product.id)}
                    disabled={savingProduct}
                    className="px-6 py-2 rounded-full text-sm font-semibold text-white cursor-pointer disabled:opacity-60"
                    style={{ background: "#C9B06B" }}
                  >
                    {savingProduct ? "Saving…" : "Save Product"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Hidden image input */}
        <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
          onChange={e => {
            const f = e.target.files?.[0];
            if (f && activeProductId.current) uploadProductImage(activeProductId.current, f);
            if (imageInputRef.current) imageInputRef.current.value = "";
          }} />

        {/* Add product */}
        {showNewProduct ? (
          <div className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: BORDER }}>
            <h3 className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>New Product</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Name *</label>
                <input className={INPUT_CLASS} style={{ borderColor: BORDER }}
                  value={newProduct.name}
                  onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>WhatsApp Message</label>
                <input className={INPUT_CLASS} style={{ borderColor: BORDER }}
                  placeholder={`Hi, I'm interested in the ${newProduct.name || "…"}`}
                  value={newProduct.whatsapp_message}
                  onChange={e => setNewProduct(p => ({ ...p, whatsapp_message: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Description</label>
              <textarea rows={2} className={INPUT_CLASS} style={{ borderColor: BORDER, resize: "vertical" }}
                value={newProduct.description}
                onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} />
            </div>
            <div>
              <label className={LABEL_CLASS} style={{ color: "#6B6B6B" }}>Features (one per line)</label>
              <textarea rows={3} className={INPUT_CLASS} style={{ borderColor: BORDER, resize: "vertical" }}
                value={newProduct.features}
                onChange={e => setNewProduct(p => ({ ...p, features: e.target.value }))} />
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowNewProduct(false)} className="px-4 py-2 rounded-full text-sm font-medium border cursor-pointer" style={{ borderColor: BORDER, color: "#6B6B6B" }}>Cancel</button>
              <button onClick={addProduct} disabled={addingProduct || !newProduct.name.trim()}
                className="px-6 py-2 rounded-full text-sm font-semibold text-white cursor-pointer disabled:opacity-60"
                style={{ background: "#C9B06B" }}>
                {addingProduct ? "Adding…" : "Add Product"}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowNewProduct(true)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed text-sm font-medium transition cursor-pointer"
            style={{ borderColor: "#C9B06B", color: "#C9B06B" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            Add New Product
          </button>
        )}
      </div>
    </div>
  );
}
