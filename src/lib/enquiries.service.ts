import { supabase } from "./supabase";

export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string | null;
  collection_interest?: string | null;
  event_type?: "wedding" | "casual" | "formal" | "political" | "other" | null;
  event_date?: string | null;
  message?: string | null;
  source?: string;
}

export async function submitEnquiry(
  data: EnquiryPayload
): Promise<{ success: boolean; error?: string }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("enquiries") as any).insert({
    ...data,
    status: "new",
  });
  if (error) return { success: false, error: (error as { message: string }).message };
  return { success: true };
}

export async function subscribeNewsletter(
  email: string,
  source = "website"
): Promise<{ success: boolean; error?: string }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("newsletter_subscribers") as any).upsert(
    { email, source, is_active: true },
    { onConflict: "email" }
  );
  if (error) return { success: false, error: (error as { message: string }).message };
  return { success: true };
}
