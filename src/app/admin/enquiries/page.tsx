import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import AdminShell from "@/components/admin/AdminShell";
import EnquiriesClient from "@/components/admin/EnquiriesClient";
import type { EnquiryRow } from "@/lib/database.types";

export default async function AdminEnquiriesPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
  const newCount = (data ?? []).filter((e: { status: string }) => e.status === "new").length;

  return (
    <AdminShell userEmail={user.email ?? ""} newEnquiries={newCount}>
      <EnquiriesClient initialEnquiries={(data ?? []) as EnquiryRow[]} />
    </AdminShell>
  );
}
