import { supabase } from "./supabase";
import type {
  CollectionRow,
  ProductRow,
  ProductFeatureRow,
  ProductImageRow,
  CollectionWithProducts,
} from "./database.types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const STORAGE_BUCKET = "product-images";

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
