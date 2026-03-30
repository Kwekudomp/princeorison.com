import { redirect, notFound } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import AdminShell from "@/components/admin/AdminShell";
import CollectionEditorClient from "@/components/admin/CollectionEditorClient";
import type { CollectionRow, ProductRow, ProductImageRow, ProductFeatureRow } from "@/lib/database.types";

export default async function CollectionEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const { data: col } = await supabase.from("collections").select("*").eq("slug", slug).single();
  if (!col) notFound();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("collection_id", col.id)
    .order("display_order", { ascending: true });

  const productIds = (products ?? []).map((p: ProductRow) => p.id);

  const [imagesRes, featuresRes] = await Promise.all([
    productIds.length > 0
      ? supabase.from("product_images").select("*").in("product_id", productIds).order("sort_order")
      : Promise.resolve({ data: [] }),
    productIds.length > 0
      ? supabase.from("product_features").select("*").in("product_id", productIds).order("sort_order")
      : Promise.resolve({ data: [] }),
  ]);

  const images = (imagesRes.data ?? []) as ProductImageRow[];
  const features = (featuresRes.data ?? []) as ProductFeatureRow[];

  const { data: enquiriesCount } = await supabase
    .from("enquiries")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");

  return (
    <AdminShell userEmail={user.email ?? ""} newEnquiries={(enquiriesCount as unknown as { count: number })?.count ?? 0}>
      <CollectionEditorClient
        collection={col as CollectionRow}
        initialProducts={(products ?? []) as ProductRow[]}
        initialImages={images}
        initialFeatures={features}
      />
    </AdminShell>
  );
}
