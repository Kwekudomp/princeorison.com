import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  // Fetch stats in parallel
  const [enquiriesRes, productsRes, videosRes, newsletterRes, newArrivalsRes] = await Promise.all([
    supabase.from("enquiries").select("id, status, name, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("videos").select("id", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("is_new_arrival", true).eq("is_published", true),
  ]);

  const newEnquiries = (enquiriesRes.data ?? []).filter(e => e.status === "new").length;
  const recentEnquiries = enquiriesRes.data ?? [];

  const stats = [
    { label: "Published Products", value: productsRes.count ?? 0, href: "/admin/collections", color: "#C9B06B" },
    { label: "New Arrivals", value: newArrivalsRes.count ?? 0, href: "/admin/collections", color: "#8B7A3D" },
    { label: "Videos", value: videosRes.count ?? 0, href: "/admin/videos", color: "#C9B06B" },
    { label: "Newsletter", value: newsletterRes.count ?? 0, href: "/admin/newsletter", color: "#8B7A3D" },
  ];

  const quickLinks = [
    {
      href: "/admin/collections",
      label: "Collections & Products",
      desc: "Edit collections, add/remove products, upload images, toggle new arrivals",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      href: "/admin/videos",
      label: "Videos & Reels",
      desc: "Upload showcase videos, set homepage featured reel",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      href: "/admin/enquiries",
      label: "Enquiries",
      desc: "View consultation requests from the website contact form",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      badge: newEnquiries,
    },
    {
      href: "/admin/newsletter",
      label: "Newsletter Subscribers",
      desc: "View and export email subscribers",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <AdminShell userEmail={user.email ?? ""} newEnquiries={newEnquiries}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-semibold" style={{ color: "#1A1A1A" }}>Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: "#6B6B6B" }}>Welcome back. Here&apos;s what&apos;s happening on your site.</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-5 border cursor-pointer hover:shadow-md transition-shadow" style={{ borderColor: "#E8E4DE" }}>
              <p className="text-3xl font-display font-semibold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs mt-1 font-medium uppercase tracking-wider" style={{ color: "#6B6B6B" }}>{s.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick nav */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {quickLinks.map(q => (
            <Link key={q.href} href={q.href} className="bg-white rounded-2xl p-6 border flex gap-4 items-start hover:shadow-md transition-shadow cursor-pointer group" style={{ borderColor: "#E8E4DE" }}>
              <span className="mt-0.5 transition-colors" style={{ color: "#C9B06B" }}>{q.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>{q.label}</p>
                  {q.badge != null && q.badge > 0 && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#C9B06B", color: "#1A1A1A" }}>
                      {q.badge} new
                    </span>
                  )}
                </div>
                <p className="text-xs mt-1" style={{ color: "#6B6B6B" }}>{q.desc}</p>
              </div>
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#C9B06B" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Recent enquiries */}
        {recentEnquiries.length > 0 && (
          <div className="bg-white rounded-2xl border p-6" style={{ borderColor: "#E8E4DE" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>Recent Enquiries</h2>
              <Link href="/admin/enquiries" className="text-xs font-medium transition" style={{ color: "#C9B06B" }}>View all</Link>
            </div>
            <div className="space-y-3">
              {recentEnquiries.map(e => (
                <div key={e.id} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "#F5F1EB" }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#1A1A1A" }}>{e.name}</p>
                    <p className="text-xs" style={{ color: "#6B6B6B" }}>{new Date(e.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    e.status === "new" ? "bg-amber-100 text-amber-800" :
                    e.status === "replied" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {e.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View site link */}
        <div className="mt-6 text-center">
          <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm transition" style={{ color: "#6B6B6B" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View live site
          </a>
        </div>
      </div>
    </AdminShell>
  );
}
