"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { MapPin, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { addRecommendedPlaceToTripAction } from "@/features/destinations/actions";
import type {
  RecommendedPlace,
  TripRecommendationGroup,
} from "@/features/destinations/types";
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  getDestinationImage,
} from "@/features/destinations/utils";

type CardProps = {
  place: RecommendedPlace;
  tripId: string;
  featured?: boolean;
};

export function RecommendedPlaceCard({
  place,
  tripId,
  featured = false,
}: CardProps) {
  const [added, setAdded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const accent = CATEGORY_COLORS[place.category];

  const handleAddToTrip = () => {
    startTransition(async () => {
      const result = await addRecommendedPlaceToTripAction(
        tripId,
        place.name,
        place.address
      );

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      setAdded(true);
      toast.success(
        result.alreadyExists
          ? `${place.name} is already on your trip`
          : `${place.name} added to your trip`
      );
    });
  };

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        height: featured ? 420 : 320,
      }}
    >
      <img
        src={place.image}
        alt={place.name}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      <div
        className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold"
        style={{
          background: `${accent}22`,
          color: accent,
          border: `1px solid ${accent}44`,
        }}
      >
        {CATEGORY_LABELS[place.category]}
      </div>

      {place.priceHint && (
        <div
          className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold"
          style={{ background: "rgba(10,15,30,0.75)", color: "#F8F6F1" }}
        >
          {place.priceHint}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3
          className={`font-black leading-tight ${featured ? "text-3xl" : "text-xl"}`}
          style={{ color: "#F8F6F1", letterSpacing: "-0.02em" }}
        >
          {place.name}
        </h3>

        <p
          className={`mt-2 leading-relaxed ${featured ? "text-sm" : "text-xs line-clamp-2"}`}
          style={{ color: "rgba(248,246,241,0.65)" }}
        >
          {place.description}
        </p>

        <p
          className="mt-2 flex items-center gap-1 text-xs"
          style={{ color: "rgba(248,246,241,0.45)" }}
        >
          <MapPin size={11} />
          {place.address}
        </p>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddToTrip}
            disabled={isPending || added}
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              background: added ? "rgba(16,185,129,0.2)" : "#F59E0B",
              color: added ? "#10B981" : "#0A0F1E",
              border: added ? "1px solid rgba(16,185,129,0.4)" : "none",
            }}
          >
            <Plus size={12} />
            {added ? "Added to trip" : isPending ? "Adding…" : "Add to trip"}
          </button>
        </div>
      </div>
    </article>
  );
}

function TripDestinationGroup({
  group,
  featuredFirstCard,
}: {
  group: TripRecommendationGroup;
  featuredFirstCard: boolean;
}) {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3
            className="text-2xl font-black leading-tight"
            style={{ color: "#F8F6F1", letterSpacing: "-0.02em" }}
          >
            {group.displayName}
          </h3>
          <p className="mt-1 text-sm" style={{ color: "rgba(248,246,241,0.4)" }}>
            For{" "}
            <span style={{ color: "#F59E0B" }}>{group.tripTitle}</span>
            <span style={{ color: "rgba(248,246,241,0.25)" }}>
              {" "}
              · {group.destination}
            </span>
          </p>
        </div>
        <Link
          href={`/trips/${group.tripId}/places`}
          className="text-xs font-semibold transition hover:opacity-80"
          style={{ color: "#F59E0B" }}
        >
          View trip places →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {group.hasCuratedPicks ? (
          group.recommendations.map((place, index) => (
            <RecommendedPlaceCard
              key={`${group.tripId}-${place.id}`}
              place={place}
              tripId={group.tripId}
              featured={featuredFirstCard && index === 0}
            />
          ))
        ) : (
          <div
            className="relative overflow-hidden rounded-3xl sm:col-span-2 md:col-span-3"
            style={{
              border: "1px dashed rgba(255,255,255,0.12)",
              minHeight: 200,
            }}
          >
            <img
              src={getDestinationImage(group.destination)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-20"
            />
            <div className="relative flex flex-col items-center justify-center px-6 py-12 text-center">
              <p
                className="font-semibold"
                style={{ color: "rgba(248,246,241,0.6)" }}
              >
                Curated picks for {group.destination} are coming soon
              </p>
              <p
                className="mt-2 max-w-md text-sm"
                style={{ color: "rgba(248,246,241,0.35)" }}
              >
                This trip is on your list — head to your trip places to start
                building your own itinerary.
              </p>
              <Link
                href={`/trips/${group.tripId}/places`}
                className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-90"
                style={{ background: "#F59E0B", color: "#0A0F1E" }}
              >
                <Plus size={14} />
                Add places to this trip
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type PersonalizedSectionProps = {
  tripGroups: TripRecommendationGroup[];
  totalTripCount: number;
};

export function PersonalizedDestinations({
  tripGroups,
  totalTripCount,
}: PersonalizedSectionProps) {
  const isSingleTrip = totalTripCount === 1;
  const singleGroup = tripGroups[0];

  const title = isSingleTrip
    ? `Explore ${singleGroup.displayName}`
    : "Your trip destinations";

  const subtitle = isSingleTrip
    ? `Curated for ${singleGroup.tripTitle}`
    : `Suggestions across all ${totalTripCount} of your trips`;

  return (
    <>
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p
            className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: "#F59E0B" }}
          >
            <Sparkles size={12} />
            Picked for your trips
          </p>
          <h2
            className="text-4xl font-black leading-tight"
            style={{ color: "#F8F6F1", letterSpacing: "-0.03em" }}
          >
            {title}
          </h2>
          <p className="mt-2 text-sm" style={{ color: "rgba(248,246,241,0.4)" }}>
            {subtitle}
          </p>
        </div>
        <p
          className="max-w-sm text-sm leading-relaxed"
          style={{ color: "rgba(248,246,241,0.4)" }}
        >
          Landmarks and experiences matched to each of your trips. Save them
          directly to the right trip with one click.
        </p>
      </div>

      <div className="flex flex-col gap-14">
        {tripGroups.map((group) => (
          <TripDestinationGroup
            key={group.tripId}
            group={group}
            featuredFirstCard={isSingleTrip}
          />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/trips"
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
          style={{ color: "#F59E0B" }}
        >
          View all your trips
          <MapPin size={14} />
        </Link>
      </div>
    </>
  );
}
