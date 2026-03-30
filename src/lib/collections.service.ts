import { supabase } from "./supabase";
import type {
  CollectionRow,
  ProductRow,
  ProductFeatureRow,
  ProductImageRow,
  CollectionWithProducts,
  VideoRow,
} from "./database.types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const STORAGE_BUCKET = "product-images";
const VIDEO_BUCKET = "videos";

/** Resolve a storage_path to a public URL */
export function getImageUrl(storagePath: string | null | undefined): string {
  if (!storagePath) return "";
  // Already a rooted path (legacy /images/... files during transition)
  if (storagePath.startsWith("/") || storagePath.startsWith("http")) {
    return storagePath;
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${storagePath}`;
}

/** Fetch all published collections with their products, features, and images */
export async function fetchCollections(): Promise<CollectionWithProducts[]> {
  const colRes = await supabase
    .from("collections")
    .select("id, slug, name, description, hero_description, cover_image, display_order, is_published, is_bespoke, created_at, updated_at")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (colRes.error) throw colRes.error;

  const collections = (colRes.data ?? []) as CollectionRow[];
  if (collections.length === 0) return [];

  const collectionIds = collections.map((c) => c.id);

  const prodRes = await supabase
    .from("products")
    .select("id, collection_id, name, description, whatsapp_message, display_order, is_published, created_at, updated_at")
    .in("collection_id", collectionIds)
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (prodRes.error) throw prodRes.error;

  const products = (prodRes.data ?? []) as ProductRow[];
  const productIds = products.map((p) => p.id);

  const [featuresRes, imagesRes] = await Promise.all([
    productIds.length > 0
      ? supabase
          .from("product_features")
          .select("id, product_id, feature, sort_order")
          .in("product_id", productIds)
          .order("sort_order", { ascending: true })
      : Promise.resolve({ data: [] as ProductFeatureRow[], error: null }),
    productIds.length > 0
      ? supabase
          .from("product_images")
          .select("id, product_id, storage_path, alt_text, sort_order, is_cover, created_at")
          .in("product_id", productIds)
          .order("sort_order", { ascending: true })
      : Promise.resolve({ data: [] as ProductImageRow[], error: null }),
  ]);

  if (featuresRes.error) throw featuresRes.error;
  if (imagesRes.error) throw imagesRes.error;

  const features = (featuresRes.data ?? []) as ProductFeatureRow[];
  const images = (imagesRes.data ?? []) as ProductImageRow[];

  return collections.map((col) => ({
    ...col,
    products: products
      .filter((p) => p.collection_id === col.id)
      .map((p) => ({
        ...p,
        features: features.filter((f) => f.product_id === p.id),
        images: images.filter((i) => i.product_id === p.id),
      })),
  }));
}

/** Fetch a single published collection by slug */
export async function fetchCollectionBySlug(
  slug: string
): Promise<CollectionWithProducts | null> {
  const all = await fetchCollections();
  return all.find((c) => c.slug === slug) ?? null;
}

// ── New Arrivals ──────────────────────────────────────────────

export interface NewArrivalItem {
  id: string;
  name: string;
  collection: string;
  collectionSlug: string;
  image: string;
  tag: "New" | "Featured" | "Season" | "Limited";
}

/**
 * Fetch products marked as new arrivals, joined with their collection slug/name
 * and first product image. Returns up to `limit` items.
 */
export async function fetchNewArrivals(limit = 6): Promise<NewArrivalItem[]> {
  const prodRes = await supabase
    .from("products")
    .select("id, collection_id, name, is_new_arrival, arrival_label, display_order")
    .eq("is_published", true)
    .eq("is_new_arrival", true)
    .order("display_order", { ascending: true })
    .limit(limit);

  if (prodRes.error) throw prodRes.error;
  const products = (prodRes.data ?? []) as (ProductRow & { arrival_label: string })[];
  if (products.length === 0) return [];

  const productIds = products.map((p) => p.id);
  const collectionIds = [...new Set(products.map((p) => p.collection_id))];

  const [imagesRes, colRes] = await Promise.all([
    supabase
      .from("product_images")
      .select("product_id, storage_path, sort_order")
      .in("product_id", productIds)
      .order("sort_order", { ascending: true }),
    supabase
      .from("collections")
      .select("id, slug, name")
      .in("id", collectionIds),
  ]);

  if (imagesRes.error) throw imagesRes.error;
  if (colRes.error) throw colRes.error;

  const images = (imagesRes.data ?? []) as { product_id: string; storage_path: string; sort_order: number }[];
  const cols = (colRes.data ?? []) as { id: string; slug: string; name: string }[];

  return products.map((p) => {
    const img = images.find((i) => i.product_id === p.id);
    const col = cols.find((c) => c.id === p.collection_id);
    return {
      id: p.id,
      name: p.name,
      collection: col?.name ?? "",
      collectionSlug: col?.slug ?? "",
      image: getImageUrl(img?.storage_path ?? null),
      tag: (p.arrival_label ?? "New") as NewArrivalItem["tag"],
    };
  });
}

// ── Videos ────────────────────────────────────────────────────

export function getVideoUrl(storagePath: string | null | undefined): string {
  if (!storagePath) return "";
  if (storagePath.startsWith("/") || storagePath.startsWith("http")) return storagePath;
  return `${SUPABASE_URL}/storage/v1/object/public/${VIDEO_BUCKET}/${storagePath}`;
}

/** Fetch the single featured video for the homepage VideoSection */
export async function fetchFeaturedVideo(): Promise<VideoRow | null> {
  const res = await supabase
    .from("videos")
    .select("id, title, caption, storage_path, thumbnail_path, duration_seconds, category, display_order, is_published, is_featured, created_at, updated_at")
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("display_order", { ascending: true })
    .limit(1);

  if (res.error) throw res.error;
  const videos = (res.data ?? []) as VideoRow[];
  return videos[0] ?? null;
}

/** Fetch all published videos (for a future /videos gallery page) */
export async function fetchVideos(category?: VideoRow["category"]): Promise<VideoRow[]> {
  let query = supabase
    .from("videos")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (category) {
    query = query.eq("category", category);
  }

  const res = await query;
  if (res.error) throw res.error;
  return (res.data ?? []) as VideoRow[];
}
