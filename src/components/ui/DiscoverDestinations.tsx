import { ArrowRight, Compass, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import type { DiscoveryDestination } from "@/features/destinations/types";
import { buildCreateTripHref } from "@/features/destinations/discovery";
import { DISCOVER_DESTINATIONS_SECTION_ID } from "@/features/destinations/constants";

function DiscoveryCard({
  destination,
  featured = false,
}: {
  destination: DiscoveryDestination;
  featured?: boolean;
}) {
  const createHref = buildCreateTripHref(destination.planDestination);

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        height: featured ? 420 : 280,
      }}
    >
      <img
        src={destination.image}
        alt={destination.displayName}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <div
        className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold"
        style={{
          background: "rgba(245,158,11,0.15)",
          color: "#F59E0B",
          border: "1px solid rgba(245,158,11,0.3)",
        }}
      >
        <span className="flex items-center gap-1">
          <Sparkles size={10} />
          New to explore
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className="mb-1 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "rgba(248,246,241,0.45)" }}
        >
          {destination.highlight}
        </p>
        <h3
          className={`font-black leading-tight ${featured ? "text-3xl" : "text-xl"}`}
          style={{ color: "#F8F6F1", letterSpacing: "-0.02em" }}
        >
          {destination.displayName}
        </h3>
        <p
          className={`mt-2 leading-relaxed ${featured ? "text-sm" : "text-xs line-clamp-2"}`}
          style={{ color: "rgba(248,246,241,0.6)" }}
        >
          {destination.tagline}
        </p>

        <Link
          href={createHref}
          className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition hover:opacity-90"
          style={{ background: "#F59E0B", color: "#0A0F1E" }}
        >
          Plan a trip to {destination.displayName}
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

type Props = {
  destinations: DiscoveryDestination[];
  hasExistingTrips: boolean;
};

export default function DiscoverDestinations({
  destinations,
  hasExistingTrips,
}: Props) {
  return (
    <section
      id={DISCOVER_DESTINATIONS_SECTION_ID}
      className="scroll-mt-24 px-6 py-24 md:px-10"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              style={{ color: "#F59E0B" }}
            >
              <Compass size={12} />
              Discover
            </p>
            <h2
              className="text-4xl font-black leading-tight"
              style={{ color: "#F8F6F1", letterSpacing: "-0.03em" }}
            >
              {hasExistingTrips
                ? "Your next adventure"
                : "Browse destinations"}
            </h2>
            <p className="mt-2 text-sm" style={{ color: "rgba(248,246,241,0.4)" }}>
              {hasExistingTrips
                ? "Fresh cities and experiences you haven't planned yet."
                : "Get inspired and start planning your first trip."}
            </p>
          </div>
          <p
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: "rgba(248,246,241,0.4)" }}
          >
            Pick a destination to open the trip planner with the location
            pre-filled — ready for dates and budget.
          </p>
        </div>

        {destinations.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-20 text-center"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <MapPin
              size={36}
              style={{ color: "rgba(248,246,241,0.2)", marginBottom: 12 }}
            />
            <p
              className="font-semibold"
              style={{ color: "rgba(248,246,241,0.5)" }}
            >
              You&apos;re covering all our featured destinations
            </p>
            <p
              className="mt-1 max-w-md text-sm"
              style={{ color: "rgba(248,246,241,0.3)" }}
            >
              Start a custom trip to anywhere else on your bucket list.
            </p>
            <Link
              href="/trips/create"
              className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-90"
              style={{ background: "#F59E0B", color: "#0A0F1E" }}
            >
              Plan a custom trip
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {destinations.map((destination, index) => (
              <DiscoveryCard
                key={destination.key}
                destination={destination}
                featured={index === 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
