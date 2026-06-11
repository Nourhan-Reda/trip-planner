import {
  MapPin,
  Wallet,
  CheckSquare,
  LayoutDashboard,
  Star,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

function getFeatureHrefs(featuredTripId: string | null) {
  if (!featuredTripId) {
    return {
      places: "/trips/create",
      budget: "/trips/create",
      todos: "/trips/create",
      trips: "/trips",
    };
  }
  const base = `/trips/${featuredTripId}`;
  return {
    places: `${base}/places`,
    budget: `${base}/budget`,
    todos: `${base}/todos`,
    trips: "/trips",
  };
}

type Props = { featuredTripId: string | null };

export default function Features({ featuredTripId }: Props) {
  const hrefs = getFeatureHrefs(featuredTripId);

  const FEATURES = [
    {
      Icon: MapPin,
      accent: "#3B82F6",
      bg: "rgba(59,130,246,0.1)",
      title: "Place tracking",
      desc: "Pin every spot — restaurants, landmarks, hidden gems — with address and visited status.",
      href: hrefs.places,
    },
    {
      Icon: Wallet,
      accent: "#F59E0B",
      bg: "rgba(245,158,11,0.1)",
      title: "Budget management",
      desc: "Log expenses by category on the go. See real-time spend vs your trip budget.",
      href: hrefs.budget,
    },
    {
      Icon: CheckSquare,
      accent: "#10B981",
      bg: "rgba(16,185,129,0.1)",
      title: "Smart todos",
      desc: "From visa applications to packing lists — a per-trip checklist that keeps you on track.",
      href: hrefs.todos,
    },
    {
      Icon: LayoutDashboard,
      accent: "#8B5CF6",
      bg: "rgba(139,92,246,0.1)",
      title: "Multi-trip workspace",
      desc: "All your trips in one dashboard. Past, present, and future adventures, organized.",
      href: hrefs.trips,
    },
  ];

  return (
    <section
      id="features"
      className="px-6 py-24 md:px-10"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p
            className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: "#F59E0B" }}
          >
            <Star size={12} />
            Features
          </p>
          <h2
            className="text-4xl font-black leading-tight"
            style={{ color: "#F8F6F1", letterSpacing: "-0.03em" }}
          >
            Everything you need,
            <br />
            <span style={{ color: "rgba(248,246,241,0.35)" }}>nothing you don&apos;t.</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ Icon, accent, bg, title, desc, href }) => (
            <Link
              key={title}
              href={href}
              className="group block rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.06]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{ background: bg }}
              >
                <Icon size={20} style={{ color: accent }} />
              </div>
              <h3
                className="mb-2 flex items-center justify-between font-bold"
                style={{ color: "#F8F6F1" }}
              >
                {title}
                <ArrowRight
                  size={14}
                  className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                  style={{ color: "#F59E0B" }}
                />
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(248,246,241,0.45)" }}>
                {desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}