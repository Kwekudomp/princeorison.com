import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import AdminShell from "@/components/admin/AdminShell";
import NewsletterClient from "@/components/admin/NewsletterClient";
import type { NewsletterRow } from "@/lib/database.types";

export default async function AdminNewsletterPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const { data } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: eq } = await supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new");

  return (
    <AdminShell userEmail={user.email ?? ""} newEnquiries={(eq as unknown as { count: number })?.count ?? 0}>
      <NewsletterClient initialSubscribers={(data ?? []) as NewsletterRow[]} />
    </AdminShell>
  );
}
