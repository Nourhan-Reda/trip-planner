"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const NAV_LINKS = [
  { label: "Destinations", href: "#destinations" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/auth/login");
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        background: "rgba(10,15,30,0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Logo />

      <div className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-sm transition-colors hover:opacity-80"
            style={{ color: "rgba(248,246,241,0.5)" }}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/trips"
          className="text-sm transition-colors hover:opacity-80"
          style={{ color: "rgba(248,246,241,0.6)" }}
        >
          Dashboard
        </Link>

        <Link
          href="/trips/create"
          className="rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-90"
          style={{
            background: "#F59E0B",
            color: "#0A0F1E",
          }}
        >
          Get Started
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Login
            </Link>

            <Link
              href="/auth/signup"
              className="rounded-lg border border-amber-500 px-4 py-2 text-sm font-semibold transition hover:opacity-90"
              style={{
                color: "#F59E0B",
              }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}