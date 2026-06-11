import { Globe, MapPin, Plane, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { Destination } from "@/types/Destination ";

// ─── Unsplash image map ──────────────────────────────────────────────────────

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

export function getDestinationImage(destination: string): string {
  const key = destination.toLowerCase();
  for (const [k, v] of Object.entries(DESTINATION_IMAGES)) {
    if (key.includes(k)) return v;
  }
  return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80";
}

// ─── Destination Card ────────────────────────────────────────────────────────

function DestinationCard({ dest, index }: { dest: Destination; index: number }) {
  const imageUrl = getDestinationImage(dest.destination);
  const isFeatured = index === 0;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl ${isFeatured ? "md:col-span-2 md:row-span-2" : ""}`}
      style={{ height: isFeatured ? 420 : 200 }}
    >
      <img
        src={imageUrl}
        alt={dest.destination}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        }}
      />

      {dest.tripCount >= 3 && (
        <div
          className="absolute right-4 top-4 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
          style={{ background: "#F59E0B", color: "#0A0F1E" }}
        >
          <TrendingUp size={10} />
          Trending
        </div>
      )}

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

// ─── Section ─────────────────────────────────────────────────────────────────

type Props = { destinations: Destination[] };

export default function Destinations({ destinations }: Props) {
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
            <p className="font-semibold" style={{ color: "rgba(248,246,241,0.5)" }}>
              No destinations yet
            </p>
            <p className="mt-1 text-sm" style={{ color: "rgba(248,246,241,0.3)" }}>
              Be the first to plan a trip!
            </p>
            <Link
              href="/trips/create"
              className="mt-5 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-90"
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