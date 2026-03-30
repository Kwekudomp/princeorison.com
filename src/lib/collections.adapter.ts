/**
 * Adapts Supabase CollectionWithProducts rows to the Collection/Product
 * shape used by all existing components (ProductCard, CollectionCard, etc.)
 * This lets us migrate the backend without touching any UI components.
 */

import type { CollectionWithProducts } from "./database.types";
import type { Collection, Product } from "@/data/collections";
import { getImageUrl } from "./collections.service";

export function adaptCollection(row: CollectionWithProducts): Collection {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    heroDescription: row.hero_description ?? "",
    coverImage: getImageUrl(row.cover_image),
    products: row.products.map(adaptProduct),
  };
}

function adaptProduct(
  p: CollectionWithProducts["products"][number]
): Product {
  return {
    id: p.id,
    name: p.name,
    description: p.description ?? "",
    features: p.features.map((f) => f.feature),
    images: p.images.map((img) => getImageUrl(img.storage_path)),
    whatsappMessage:
      p.whatsapp_message ?? `Hi, I'm interested in the ${p.name}`,
  };
}
