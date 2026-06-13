"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/trips";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Welcome back ✈️");
    router.refresh();
    router.push(redirectTo);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050816] px-6">
      <div className="w-full max-w-md">
        <div
          className="rounded-3xl border p-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <h1 className="mb-2 text-center text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mb-8 text-center text-gray-400">
            Continue planning your next adventure.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-500"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-500"
              required
            />

            <button
              disabled={loading}
              className="w-full rounded-xl bg-amber-500 py-3 font-semibold text-black transition hover:bg-amber-400 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            donot have an account?{" "}
            <Link href="/auth/signup" className="font-semibold text-amber-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
