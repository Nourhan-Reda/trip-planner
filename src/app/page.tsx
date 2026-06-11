export const revalidate = 3600;

import {
  MapPin,
  Wallet,
  CheckSquare,
  LayoutDashboard,
  Plane,
  Star,
  ArrowRight,
  Globe,
  TrendingUp,
  Users,
  ChevronRight,
  Share2,
  Heart,
  Code2,
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

// ─── Data fetching ──────────────────────────────────────────────────────────

async function getHomeData() {
  const [totalTrips, totalPlaces, totalExpenses, totalTodos, tripsWithPlaces] =
    await Promise.all([
      prisma.trip.count(),
      prisma.place.count(),
      prisma.expense.count(),
      prisma.todo.count(),
      prisma.trip.findMany({
        select: {
          id: true,
          destination: true,
          _count: { select: { places: true, expenses: true, todos: true } },
        },
      }),
    ]);

  const destinationMap = new Map<
    string,
    { destination: string; tripCount: number; placesCount: number }
  >();
  for (const trip of tripsWithPlaces) {
    const key = trip.destination.trim().toLowerCase();
    if (destinationMap.has(key)) {
      const existing = destinationMap.get(key)!;
      existing.tripCount += 1;
      existing.placesCount += trip._count.places;
    } else {
      destinationMap.set(key, {
        destination: trip.destination,
        tripCount: 1,
        placesCount: trip._count.places,
      });
    }
  }

  const popularDestinations = Array.from(destinationMap.values())
    .sort((a, b) => b.tripCount - a.tripCount)
    .slice(0, 6);

  const featuredTrip = await prisma.trip.findFirst({
    select: { id: true },
    orderBy: { startDate: "desc" },
  });

  return {
    totalTrips,
    totalPlaces,
    totalExpenses,
    totalTodos,
    popularDestinations,
    featuredTripId: featuredTrip?.id ?? null,
  };
}

// ─── Unsplash image map ─────────────────────────────────────────────────────

const DESTINATION_IMAGES: Record<string, string> = {
  tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
  japan: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
  paris: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
  france: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  indonesia: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  "new york": "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=600&q=80",
  usa: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80",
  italy: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80",
  london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
  uk: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
  barcelona: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80",
  spain: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80",
  amsterdam: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80",
  istanbul: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
  maldives: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
  greece: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80",
  santorini: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
};

function getDestinationImage(destination: string): string {
  const key = destination.toLowerCase();
  for (const [k, v] of Object.entries(DESTINATION_IMAGES)) {
    if (key.includes(k)) return v;
  }
  return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80";
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const { totalTrips, totalPlaces, totalExpenses, totalTodos, popularDestinations, featuredTripId } =
    await getHomeData();

  return (
    <div className="min-h-screen" style={{ background: "#0A0F1E", fontFamily: "'Inter', sans-serif" }}>
      <NavBar />
      <HeroSection totalTrips={totalTrips} totalPlaces={totalPlaces} />
      <DestinationsSection destinations={popularDestinations} />
      <FeaturesSection featuredTripId={featuredTripId} />
      <HowItWorksSection />
      <CtaSection />
      <FooterSection totalExpenses={totalExpenses} totalTodos={totalTodos} />
    </div>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{ background: "rgba(10,15,30,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <Link href="/" className="flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: "#F59E0B" }}
        >
          <Plane size={16} className="text-white" style={{ transform: "rotate(45deg)" }} />
        </div>
        <span className="text-lg font-bold" style={{ color: "#F8F6F1", letterSpacing: "-0.02em" }}>
          Wandr
        </span>
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        {["Destinations", "Features", "How it works"].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
            className="text-sm transition-colors"
            style={{ color: "rgba(248,246,241,0.5)" }}
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/trips"
          className="text-sm hover:text-white transition-colors"
          style={{ color: "rgba(248,246,241,0.6)" }}
        >
          Dashboard
        </Link>
        <Link
          href="/trips/create"
          className="rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-90"
          style={{ background: "#F59E0B", color: "#0A0F1E" }}
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection({ totalTrips, totalPlaces }: { totalTrips: number; totalPlaces: number }) {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.12) 0%, transparent 60%), #0A0F1E",
      }}
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating photo collage */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70"
          alt=""
          className="absolute rounded-2xl object-cover opacity-20"
          style={{ width: 220, height: 160, top: "15%", left: "5%", transform: "rotate(-6deg)" }}
        />
        <img
          src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=70"
          alt=""
          className="absolute rounded-2xl object-cover opacity-20"
          style={{ width: 180, height: 240, top: "8%", right: "8%", transform: "rotate(5deg)" }}
        />
        <img
          src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=70"
          alt=""
          className="absolute rounded-2xl object-cover opacity-15"
          style={{ width: 160, height: 120, bottom: "20%", left: "3%", transform: "rotate(4deg)" }}
        />
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=70"
          alt=""
          className="absolute rounded-2xl object-cover opacity-15"
          style={{ width: 200, height: 150, bottom: "18%", right: "4%", transform: "rotate(-4deg)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center">
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
          style={{ borderColor: "rgba(245,158,11,0.3)", color: "#F59E0B", background: "rgba(245,158,11,0.08)" }}
        >
          <Star size={12} fill="currentColor" />
          The smarter way to plan travel
        </div>

        <h1
          className="mb-6 text-6xl font-black leading-none tracking-tight md:text-8xl"
          style={{ color: "#F8F6F1", letterSpacing: "-0.04em" }}
        >
          Plan trips
          <br />
          <span style={{ color: "#F59E0B", fontStyle: "italic" }}>without</span>
          <br />
          the chaos.
        </h1>

        <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed" style={{ color: "rgba(248,246,241,0.5)" }}>
          One workspace for every trip — places, budget, todos, and memories.
          Built for travelers who want to explore more and stress less.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/trips/create"
            className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition hover:opacity-90"
            style={{ background: "#F59E0B", color: "#0A0F1E" }}
          >
            Start planning free
            <ArrowRight size={16} />
          </Link>
          <Link
            href="#destinations"
            className="flex items-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-medium transition hover:bg-white/5"
            style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(248,246,241,0.7)" }}
          >
            <Globe size={16} />
            Explore destinations
          </Link>
        </div>

        {/* Stats bar */}
        <div
          className="mx-auto mt-16 grid max-w-sm grid-cols-2 gap-px overflow-hidden rounded-2xl sm:max-w-md"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {[
            { value: totalTrips.toLocaleString(), label: "Trips planned", icon: Plane },
            { value: totalPlaces.toLocaleString(), label: "Places saved", icon: MapPin },
          ].map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center py-5"
              style={{ background: "rgba(10,15,30,0.9)" }}
            >
              <Icon size={16} style={{ color: "#F59E0B", marginBottom: 6 }} />
              <span className="text-2xl font-black" style={{ color: "#F8F6F1", letterSpacing: "-0.03em" }}>
                {value}
              </span>
              <span className="mt-0.5 text-xs" style={{ color: "rgba(248,246,241,0.4)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "rgba(248,246,241,0.2)" }}>
        <ChevronRight size={20} style={{ transform: "rotate(90deg)" }} />
      </div>
    </section>
  );
}

// ─── Destinations ─────────────────────────────────────────────────────────────

type Destination = { destination: string; tripCount: number; placesCount: number };

function DestinationsSection({ destinations }: { destinations: Destination[] }) {
  return (
    <section id="destinations" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              style={{ color: "#F59E0B" }}
            >
              <TrendingUp size={12} />
              Popular right now
            </p>
            <h2
              className="text-4xl font-black leading-tight"
              style={{ color: "#F8F6F1", letterSpacing: "-0.03em" }}
            >
              Top destinations
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed" style={{ color: "rgba(248,246,241,0.4)" }}>
            Real places from trips planned by our community, ranked by popularity.
          </p>
        </div>

        {destinations.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-20 text-center"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <Globe size={36} style={{ color: "rgba(248,246,241,0.2)", marginBottom: 12 }} />
            <p className="font-semibold" style={{ color: "rgba(248,246,241,0.5)" }}>No destinations yet</p>
            <p className="mt-1 text-sm" style={{ color: "rgba(248,246,241,0.3)" }}>
              Be the first to plan a trip!
            </p>
            <Link
              href="/trips/create"
              className="mt-5 rounded-xl px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
              style={{ background: "#F59E0B", color: "#0A0F1E" }}
            >
              Plan your first trip
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {destinations.map((dest, i) => (
              <DestinationCard key={dest.destination} dest={dest} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function DestinationCard({ dest, index }: { dest: Destination; index: number }) {
  const imageUrl = getDestinationImage(dest.destination);
  const isFeatured = index === 0;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl ${isFeatured ? "md:col-span-2 md:row-span-2" : ""}`}
      style={{ height: isFeatured ? 420 : 200 }}
    >
      {/* Photo */}
      <img
        src={imageUrl}
        alt={dest.destination}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }}
      />

      {/* Trending badge */}
      {dest.tripCount >= 3 && (
        <div
          className="absolute right-4 top-4 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
          style={{ background: "#F59E0B", color: "#0A0F1E" }}
        >
          <TrendingUp size={10} />
          Trending
        </div>
      )}

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3
          className={`font-black leading-tight ${isFeatured ? "text-3xl" : "text-lg"}`}
          style={{ color: "#F8F6F1", letterSpacing: "-0.02em" }}
        >
          {dest.destination}
        </h3>
        <div className="mt-2 flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(248,246,241,0.65)" }}>
            <Plane size={11} />
            {dest.tripCount} {dest.tripCount === 1 ? "trip" : "trips"}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(248,246,241,0.65)" }}>
            <MapPin size={11} />
            {dest.placesCount} places
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function getFeatureHrefs(featuredTripId: string | null) {
  if (!featuredTripId) {
    return {
      places: "/trips/create",
      budget: "/trips/create",
      todos: "/trips/create",
      trips: "/trips",
    };
  }

  const tripBase = `/trips/${featuredTripId}`;
  return {
    places: `${tripBase}/places`,
    budget: `${tripBase}/budget`,
    todos: `${tripBase}/todos`,
    trips: "/trips",
  };
}

function FeaturesSection({ featuredTripId }: { featuredTripId: string | null }) {
  const hrefs = getFeatureHrefs(featuredTripId);

  const FEATURES = [
    {
      icon: MapPin,
      accent: "#3B82F6",
      bg: "rgba(59,130,246,0.1)",
      title: "Place tracking",
      desc: "Pin every spot — restaurants, landmarks, hidden gems — with address and visited status.",
      href: hrefs.places,
    },
    {
      icon: Wallet,
      accent: "#F59E0B",
      bg: "rgba(245,158,11,0.1)",
      title: "Budget management",
      desc: "Log expenses by category on the go. See real-time spend vs your trip budget.",
      href: hrefs.budget,
    },
    {
      icon: CheckSquare,
      accent: "#10B981",
      bg: "rgba(16,185,129,0.1)",
      title: "Smart todos",
      desc: "From visa applications to packing lists — a per-trip checklist that keeps you on track.",
      href: hrefs.todos,
    },
    {
      icon: LayoutDashboard,
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
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <Link
                key={f.title}
                href={f.href}
                className="group block rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.06]"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ background: f.bg }}
                >
                  <Icon size={20} style={{ color: f.accent }} />
                </div>
                <h3 className="mb-2 font-bold flex items-center justify-between" style={{ color: "#F8F6F1" }}>
                  {f.title}
                  <ArrowRight
                    size={14}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    style={{ color: "#F59E0B" }}
                  />
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(248,246,241,0.45)" }}>
                  {f.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── How it works ──────────────────────────────────────────────────────────────

const STEPS = [
  {
    icon: Plane,
    accent: "#F59E0B",
    title: "Create a trip",
    desc: "Title, destination, dates, and budget — your trip is ready in under a minute.",
  },
  {
    icon: MapPin,
    accent: "#3B82F6",
    title: "Pin places & tasks",
    desc: "Save spots you want to visit. Build your pre-trip todo checklist.",
  },
  {
    icon: Wallet,
    accent: "#10B981",
    title: "Track expenses",
    desc: "Log spending by category as you go. Always know where your money went.",
  },
  {
    icon: Users,
    accent: "#885DEC",
    title: "Return & remember",
    desc: "All visited places, completed tasks, and total spend. Your trip, fully documented.",
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p
            className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: "#F59E0B" }}
          >
            <ChevronRight size={12} />
            How it works
          </p>
          <h2
            className="text-4xl font-black leading-tight"
            style={{ color: "#F8F6F1", letterSpacing: "-0.03em" }}
          >
            Up and running
            <br />
            <span style={{ color: "rgba(248,246,241,0.35)" }}>in four steps.</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative">
              {/* Connector */}
              {i < STEPS.length - 1 && (
                <div
                  className="absolute -right-2 top-6 z-10 hidden lg:block"
                  style={{ color: "rgba(255,255,255,0.1)" }}
                >
                  <ArrowRight size={16} />
                </div>
              )}
              <div
                className="rounded-3xl p-6"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ background: `${step.accent}18` }}
                >
                  <step.icon size={20} style={{ color: step.accent }} />
                </div>
                <div
                  className="mb-2 text-xs font-black"
                  style={{ color: "rgba(255,255,255,0.18)", letterSpacing: "0.08em" }}
                >
                  0{i + 1}
                </div>
                <h3 className="mb-2 font-bold" style={{ color: "#F8F6F1" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(248,246,241,0.45)" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="px-6 py-10 md:px-10">
      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-8 py-20 text-center"
        style={{
          background: "linear-gradient(135deg, #1a1200 0%, #2d1f00 50%, #1a0e00 100%)",
          border: "1px solid rgba(245,158,11,0.2)",
        }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: 600,
            height: 300,
            background: "radial-gradient(ellipse, rgba(245,158,11,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Background photo strip */}
        <div className="pointer-events-none absolute inset-0 flex overflow-hidden opacity-10">
          {[
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&q=60",
            "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300&q=60",
            "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=300&q=60",
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=60",
          ].map((src, i) => (
            <img key={i} src={src} alt="" className="h-full flex-1 object-cover" />
          ))}
        </div>

        <div className="relative z-10">
          <p
            className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: "#F59E0B" }}
          >
            <Plane size={12} />
            Ready for takeoff?
          </p>
          <h2
            className="mb-4 text-5xl font-black leading-none md:text-6xl"
            style={{ color: "#F8F6F1", letterSpacing: "-0.04em" }}
          >
            Your next adventure
            <br />
            starts here.
          </h2>
          <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed" style={{ color: "rgba(248,246,241,0.5)" }}>
            Free to start. No credit card. Just better trips.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/trips/create"
              className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition hover:opacity-90"
              style={{ background: "#F59E0B", color: "#0A0F1E" }}
            >
              Start planning free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="#destinations"
              className="flex items-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-medium transition hover:bg-white/5"
              style={{ borderColor: "rgba(245,158,11,0.25)", color: "rgba(248,246,241,0.6)" }}
            >
              Browse destinations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function FooterSection({ totalExpenses, totalTodos }: { totalExpenses: number; totalTodos: number }) {
  return (
    <footer
      className="mt-4 px-6 py-12 md:px-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-3 flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "#F59E0B" }}
              >
                <Plane size={16} className="text-white" style={{ transform: "rotate(45deg)" }} />
              </div>
              <span className="text-lg font-bold" style={{ color: "#F8F6F1", letterSpacing: "-0.02em" }}>
                Wandr
              </span>
            </Link>
            <p className="text-xs" style={{ color: "rgba(248,246,241,0.3)" }}>
              Built with Next.js · Prisma · Supabase
            </p>
          </div>

          {/* Live stats */}
          <div
            className="flex items-center gap-6 rounded-2xl px-6 py-3"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(248,246,241,0.45)" }}>
              <Wallet size={13} style={{ color: "#F59E0B" }} />
              {totalExpenses.toLocaleString()} expenses tracked
            </div>
            <div className="h-3 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(248,246,241,0.45)" }}>
              <CheckSquare size={13} style={{ color: "#10B981" }} />
              {totalTodos.toLocaleString()} todos done
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {[Share2, Heart, Code2].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(248,246,241,0.4)" }}
              >
                <Icon size={15} />
              </Link>
            ))}
          </div>
        </div>

        <div
          className="mt-8 pt-8 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(248,246,241,0.2)" }}
        >
          © {new Date().getFullYear()} Wandr. All rights reserved.
        </div>
      </div>
    </footer>
  );
}