import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import AdminShell from "@/components/admin/AdminShell";
import NewArrivalsAdminClient from "@/components/admin/NewArrivalsAdminClient";
import type { ProductRow, CollectionRow } from "@/lib/database.types";

export default async function AdminNewArrivalsPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const [productsRes, collectionsRes, settingsRes, enquiriesRes] = await Promise.all([
    supabase
      .from("products")
      .select("id, collection_id, name, is_new_arrival, arrival_label, is_published, display_order")
      .eq("is_published", true)
      .order("display_order", { ascending: true }),
    supabase
      .from("collections")
      .select("id, slug, name")
      .eq("is_published", true)
      .order("display_order", { ascending: true }),
    supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["new_arrivals_title", "new_arrivals_subtitle"]),
    supabase
      .from("enquiries")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  const settings = Object.fromEntries(
    (settingsRes.data ?? []).map((s: { key: string; value: string | null }) => [s.key, s.value ?? ""])
  );

  return (
    <AdminShell userEmail={user.email ?? ""} newEnquiries={(enquiriesRes.data as unknown as { count: number })?.count ?? 0}>
      <NewArrivalsAdminClient
        initialProducts={(productsRes.data ?? []) as ProductRow[]}
        collections={(collectionsRes.data ?? []) as CollectionRow[]}
        initialTitle={settings["new_arrivals_title"] ?? "New Arrivals"}
        initialSubtitle={settings["new_arrivals_subtitle"] ?? ""}
      />
    </AdminShell>
  );
}
