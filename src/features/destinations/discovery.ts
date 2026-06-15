import { DESTINATION_CATALOG } from "./catalog";
import type { DiscoveryDestination } from "./types";
import { resolveDestinationKey } from "./utils";

const PLAN_DESTINATIONS: Record<string, string> = {
  paris: "Paris, France",
  tokyo: "Tokyo, Japan",
  london: "London, UK",
  rome: "Rome, Italy",
  barcelona: "Barcelona, Spain",
  "new-york": "New York, USA",
  bali: "Bali, Indonesia",
  dubai: "Dubai, UAE",
};

const DISCOVERY_TAGLINES: Record<string, string> = {
  paris: "Art, cuisine, and iconic landmarks along the Seine.",
  tokyo: "Neon streets, ancient temples, and world-class food.",
  london: "Royal history, museums, and vibrant neighbourhoods.",
  rome: "Ancient ruins, piazzas, and la dolce vita.",
  barcelona: "Gaudí architecture, beaches, and Catalan culture.",
  "new-york": "Skyscrapers, Broadway, and endless energy.",
  bali: "Rice terraces, temples, and tropical serenity.",
  dubai: "Futuristic skyline, desert adventures, and luxury.",
};

function catalogEntryToDiscovery(
  key: string,
  displayName: string,
  places: (typeof DESTINATION_CATALOG)[number]["places"]
): DiscoveryDestination {
  const featured = places.find((place) => place.featured) ?? places[0];

  return {
    key,
    displayName,
    image: featured.image,
    tagline: DISCOVERY_TAGLINES[key] ?? featured.description,
    highlight: featured.name,
    planDestination: PLAN_DESTINATIONS[key] ?? displayName,
  };
}

export function buildDiscoveryDestinations(
  userTripDestinations: string[]
): DiscoveryDestination[] {
  const plannedKeys = new Set(
    userTripDestinations
      .map((destination) => resolveDestinationKey(destination))
      .filter((key): key is string => key !== null)
  );

  return DESTINATION_CATALOG.filter((entry) => !plannedKeys.has(entry.key)).map(
    (entry) =>
      catalogEntryToDiscovery(entry.key, entry.displayName, entry.places)
  );
}

export function buildCreateTripHref(planDestination: string): string {
  const params = new URLSearchParams({ destination: planDestination });
  return `/trips/create?${params.toString()}`;
}
