import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import AdminShell from "@/components/admin/AdminShell";
import VideosCMSClient from "@/components/admin/VideosCMSClient";
import type { VideoRow } from "@/lib/database.types";

export default async function AdminVideosPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const { data } = await supabase.from("videos").select("*").order("display_order", { ascending: true });

  const { data: eq } = await supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new");

  return (
    <AdminShell userEmail={user.email ?? ""} newEnquiries={(eq as unknown as { count: number })?.count ?? 0}>
      <VideosCMSClient initialVideos={(data ?? []) as VideoRow[]} />
    </AdminShell>
  );
}
