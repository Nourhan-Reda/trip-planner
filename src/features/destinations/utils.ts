import { DESTINATION_CATALOG } from "./catalog";
import type { RecommendedPlace, TripRecommendationGroup } from "./types";

export function resolveDestinationKey(destination: string): string | null {
  const normalized = destination.trim().toLowerCase();

  for (const entry of DESTINATION_CATALOG) {
    const matched = entry.aliases.some(
      (alias) => normalized === alias || normalized.includes(alias)
    );
    if (matched) {
      return entry.key;
    }
  }

  return null;
}

export function getRecommendationsForDestination(
  destination: string
): { key: string; displayName: string; places: RecommendedPlace[] } | null {
  const key = resolveDestinationKey(destination);
  if (!key) return null;

  const entry = DESTINATION_CATALOG.find((item) => item.key === key);
  if (!entry) return null;

  const places = [...entry.places].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return {
    key: entry.key,
    displayName: entry.displayName,
    places,
  };
}

/** Scale recommendations per trip so the section stays scannable with many trips. */
export function getPlacesLimitPerTrip(matchedTripCount: number): number {
  if (matchedTripCount <= 1) return 6;
  if (matchedTripCount === 2) return 4;
  return 3;
}

type UserTripInput = {
  id: string;
  title: string;
  destination: string;
};

export function buildTripRecommendationGroups(
  trips: UserTripInput[]
): TripRecommendationGroup[] {
  if (trips.length === 0) return [];

  const limit = getPlacesLimitPerTrip(trips.length);

  return trips.map((trip) => {
    const catalog = getRecommendationsForDestination(trip.destination);

    if (catalog) {
      return {
        tripId: trip.id,
        tripTitle: trip.title,
        destination: trip.destination,
        displayName: catalog.displayName,
        recommendations: catalog.places.slice(0, limit),
        hasCuratedPicks: true,
      };
    }

    return {
      tripId: trip.id,
      tripTitle: trip.title,
      destination: trip.destination,
      displayName: trip.destination,
      recommendations: [],
      hasCuratedPicks: false,
    };
  });
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80";

const DESTINATION_IMAGES: Record<string, string> = {
  tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
  japan: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
  paris: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
  france: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  indonesia: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  "new york": "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=600&q=80",
  nyc: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=600&q=80",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80",
  italy: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80",
  london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
  uk: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
  barcelona: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80",
  spain: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80",
};

export function getDestinationImage(destination: string): string {
  const key = destination.toLowerCase();
  for (const [alias, image] of Object.entries(DESTINATION_IMAGES)) {
    if (key.includes(alias)) return image;
  }
  return FALLBACK_IMAGE;
}

export const CATEGORY_LABELS: Record<RecommendedPlace["category"], string> = {
  landmark: "Landmark",
  museum: "Museum",
  experience: "Experience",
  restaurant: "Food & Drink",
  nature: "Nature",
};

export const CATEGORY_COLORS: Record<RecommendedPlace["category"], string> = {
  landmark: "#F59E0B",
  museum: "#8B5CF6",
  experience: "#3B82F6",
  restaurant: "#10B981",
  nature: "#06B6D4",
};
