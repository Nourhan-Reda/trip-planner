import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Plane, ChevronLeft, MapPin, Calendar, Wallet } from "lucide-react";
import Link from "next/link";
import { TripNavTabs } from "./tabs";

const DESTINATION_IMAGES: Record<string, string> = {
  tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80",
  japan: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80",
  paris: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80",
  france: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
  indonesia: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
  "new york": "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=1200&q=80",
  usa: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200&q=80",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
  rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80",
  italy: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80",
  london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80",
  uk: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80",
  barcelona: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&q=80",
  spain: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=80",
  amsterdam: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&q=80",
  istanbul: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80",
  maldives: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
  greece: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80",
  santorini: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80",
};

function getDestinationImage(destination: string): string {
  const key = destination.toLowerCase();
  for (const [k, v] of Object.entries(DESTINATION_IMAGES)) {
    if (key.includes(k)) return v;
  }
  return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80";
}

function formatDateRange(start: Date, end: Date) {
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const yearFormatter = new Intl.DateTimeFormat("en-US", { year: "numeric" });
  
  return `${formatter.format(new Date(start))} - ${formatter.format(new Date(end))}, ${yearFormatter.format(new Date(end))}`;
}

export default async function TripLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      user: true,
    },
  });

  if (!trip) {
    notFound();
  }

  const bgImage = getDestinationImage(trip.destination);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0F1E", fontFamily: "'Inter', sans-serif" }}>
      {/* Navigation */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-8 py-4"
        style={{
          background: "rgba(10,15,30,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "#F59E0B" }}>
            <Plane size={16} className="text-white" style={{ transform: "rotate(45deg)" }} />
          </div>
          <span className="text-lg font-bold" style={{ color: "#F8F6F1", letterSpacing: "-0.02em" }}>
            Wandr
          </span>
        </Link>

        <Link
          href="/trips"
          className="flex items-center gap-1.5 text-sm font-semibold transition"
          style={{ color: "rgba(248,246,241,0.6)" }}
        >
          <ChevronLeft size={16} />
          All trips
        </Link>
      </nav>

      {/* Trip Header Banner */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={bgImage}
          alt={trip.destination}
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, #0A0F1E 0%, rgba(10,15,30,0.5) 80%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-6 left-6 right-6 max-w-6xl mx-auto w-full px-6">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">
            <MapPin size={13} />
            {trip.destination}
          </div>
          <h1
            className="text-4xl md:text-5xl font-black tracking-tight"
            style={{ color: "#F8F6F1", letterSpacing: "-0.03em" }}
          >
            {trip.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar size={15} style={{ color: "#3B82F6" }} />
              <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Wallet size={15} style={{ color: "#10B981" }} />
              <span>Budget: ${trip.budget.toLocaleString()}</span>
            </div>
            <div className="text-slate-500">
              Planned by: <span className="font-semibold text-slate-300">{trip.user.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="max-w-6xl w-full mx-auto px-12 mt-6">
        <TripNavTabs tripId={tripId} />
      </div>

      {/* Tab Page Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-12 py-8">
        {children}
      </main>
    </div>
  );
}
