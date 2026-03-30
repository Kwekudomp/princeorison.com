"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createBrowserSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: "#FFFBF7" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#C9B06B" }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: "#1A1A1A" }}>Admin Portal</h1>
          <p className="text-sm mt-1" style={{ color: "#6B6B6B" }}>Prince Orison Fashion House</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl border p-8 shadow-sm space-y-5" style={{ borderColor: "#E8E4DE" }}>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: "#6B6B6B" }}>
              Email
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              required autoComplete="email"
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition"
              style={{ borderColor: "#E8E4DE" }}
              onFocus={e => (e.target.style.borderColor = "#C9B06B")}
              onBlur={e => (e.target.style.borderColor = "#E8E4DE")}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: "#6B6B6B" }}>
              Password
            </label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              required autoComplete="current-password"
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition"
              style={{ borderColor: "#E8E4DE" }}
              onFocus={e => (e.target.style.borderColor = "#C9B06B")}
              onBlur={e => (e.target.style.borderColor = "#E8E4DE")}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full py-3 rounded-full font-semibold text-sm text-white transition disabled:opacity-60 cursor-pointer"
            style={{ background: "#C9B06B" }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: "#6B6B6B" }}>
          Access restricted to authorised personnel only
        </p>
      </div>
    </main>
  );
}
