import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import AdminShell from "@/components/admin/AdminShell";
import CollectionsCMSClient from "@/components/admin/CollectionsCMSClient";
import type { CollectionRow } from "@/lib/database.types";

export default async function AdminCollectionsPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;

  const { data: enquiriesData } = await supabase
    .from("enquiries")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");

  return (
    <AdminShell userEmail={user.email ?? ""} newEnquiries={(enquiriesData as unknown as { count: number })?.count ?? 0}>
      <CollectionsCMSClient
        initialCollections={(data ?? []) as CollectionRow[]}
        userEmail={user.email ?? ""}
      />
    </AdminShell>
  );
}
