import { Globe, MapPin, Plane, TrendingUp } from "lucide-react";
import Link from "next/link";
import type {
  CommunityDestination,
  DestinationSectionData,
} from "@/features/destinations/types";
import { getDestinationImage } from "@/features/destinations/utils";
import { PersonalizedDestinations } from "@/components/ui/RecommendedPlaceCard";

function CommunityDestinationCard({
  destination,
  tripCount,
  placesCount,
  index,
}: {
  destination: string;
  tripCount: number;
  placesCount: number;
  index: number;
}) {
  const imageUrl = getDestinationImage(destination);
  const isFeatured = index === 0;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl ${
        isFeatured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      style={{ height: isFeatured ? 420 : 200 }}
    >
      <img
        src={imageUrl}
        alt={destination}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        }}
      />

      {tripCount >= 3 && (
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
          {destination}
        </h3>
        <div className="mt-2 flex items-center gap-3">
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "rgba(248,246,241,0.65)" }}
          >
            <Plane size={11} />
            {tripCount} {tripCount === 1 ? "trip" : "trips"}
          </span>
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "rgba(248,246,241,0.65)" }}
          >
            <MapPin size={11} />
            {placesCount} places
          </span>
        </div>
      </div>
    </div>
  );
}

function CommunityDestinations({
  destinations,
}: {
  destinations: CommunityDestination[];
}) {
  return (
    <>
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
        <p
          className="max-w-xs text-sm leading-relaxed"
          style={{ color: "rgba(248,246,241,0.4)" }}
        >
          Real places from trips planned by our community, ranked by popularity.
        </p>
      </div>

      {destinations.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-20 text-center"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <Globe
            size={36}
            style={{ color: "rgba(248,246,241,0.2)", marginBottom: 12 }}
          />
          <p
            className="font-semibold"
            style={{ color: "rgba(248,246,241,0.5)" }}
          >
            No destinations yet
          </p>
          <p
            className="mt-1 text-sm"
            style={{ color: "rgba(248,246,241,0.3)" }}
          >
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
          {destinations.map((dest, index) => (
            <CommunityDestinationCard
              key={dest.destination}
              destination={dest.destination}
              tripCount={dest.tripCount}
              placesCount={dest.placesCount}
              index={index}
            />
          ))}
        </div>
      )}
    </>
  );
}

type Props = {
  sectionData: DestinationSectionData;
};

export default function Destinations({ sectionData }: Props) {
  return (
    <section id="destinations" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        {sectionData.mode === "personalized" ? (
          <PersonalizedDestinations
            tripGroups={sectionData.tripGroups}
            totalTripCount={sectionData.totalTripCount}
          />
        ) : (
          <CommunityDestinations destinations={sectionData.destinations} />
        )}
      </div>
    </section>
  );
}
