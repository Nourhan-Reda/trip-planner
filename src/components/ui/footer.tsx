import {
  Plane,
  Wallet,
  CheckSquare,
  MapPin,
  Globe,
  Mail,
  MessageCircle,
  Camera,
  PlayCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

const FOOTER_NAV = [
  {
    heading: "Product",
    links: [
      { label: "Destinations", href: "#destinations" },
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Dashboard", href: "/trips" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign up — it's free", href: "/sign-up" },
      { label: "Sign in", href: "/sign-in" },
      { label: "Create a trip", href: "/trips/create" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

const SOCIAL = [
  { Icon: MessageCircle, href: "#", label: "Twitter / X" },
  { Icon: Camera,        href: "#", label: "Instagram" },
  { Icon: PlayCircle,    href: "#", label: "YouTube" },
  { Icon: Mail,          href: "#", label: "Email" },
];

type Props = {
  totalExpenses: number;
  totalTodos: number;
};

export default function Footer({ totalExpenses, totalTodos }: Props) {
  return (
    <footer
      className="mt-4 px-6 pt-16 pb-8 md:px-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto max-w-6xl">

        {/* ── Top row ──────────────────────────────────────────────── */}
        <div className="grid gap-12 md:grid-cols-[1.8fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="text-sm leading-relaxed" style={{ color: "rgba(248,246,241,0.4)" }}>
              Wandr helps you plan every detail of your journey — places,
              budget, and tasks — all in one calm, focused workspace.
            </p>

            {/* Newsletter micro-CTA */}
            <div
              className="flex items-center overflow-hidden rounded-xl"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-white/20"
                style={{ color: "#F8F6F1" }}
              />
              <button
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold transition hover:opacity-90"
                style={{ background: "#F59E0B", color: "#0A0F1E" }}
              >
                Subscribe
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-white/10"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(248,246,241,0.4)",
                  }}
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_NAV.map(({ heading, links }) => (
            <div key={heading}>
              <p
                className="mb-4 text-xs font-bold uppercase tracking-widest"
                style={{ color: "rgba(248,246,241,0.25)" }}
              >
                {heading}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm transition-opacity hover:opacity-80"
                      style={{ color: "rgba(248,246,241,0.5)" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Live stats strip ──────────────────────────────────────── */}
        <div
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          {[
            { Icon: Wallet,      color: "#F59E0B", value: totalExpenses.toLocaleString(), label: "Expenses tracked" },
            { Icon: CheckSquare, color: "#10B981", value: totalTodos.toLocaleString(),    label: "Tasks completed"  },
            { Icon: MapPin,      color: "#3B82F6", value: "100+",                         label: "Places pinned"   },
            { Icon: Globe,       color: "#8B5CF6", value: "40+",                          label: "Countries visited"},
          ].map(({ Icon, color, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-5 py-4"
              style={{ background: "rgba(10,15,30,0.9)" }}
            >
              <Icon size={16} style={{ color, flexShrink: 0 }} />
              <div>
                <p
                  className="text-base font-black leading-none"
                  style={{ color: "#F8F6F1", letterSpacing: "-0.02em" }}
                >
                  {value}
                </p>
                <p className="mt-0.5 text-[11px]" style={{ color: "rgba(248,246,241,0.35)" }}>
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div
          className="mt-8 flex flex-col items-center justify-between gap-3 pt-8 md:flex-row"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "rgba(248,246,241,0.2)" }}>
            © {new Date().getFullYear()} Wandr. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-xs transition-opacity hover:opacity-80"
                style={{ color: "rgba(248,246,241,0.2)" }}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(248,246,241,0.2)" }}>
            <Plane size={12} style={{ color: "#F59E0B" }} />
            Made for travelers, by travelers
          </div>
        </div>

      </div>
    </footer>
  );
}