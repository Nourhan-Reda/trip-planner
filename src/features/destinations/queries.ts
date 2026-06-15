import { prisma } from "@/lib/prisma";
import { buildDiscoveryDestinations } from "./discovery";
import type {
  CommunityDestination,
  DestinationSectionData,
  DiscoveryDestination,
} from "./types";
import { buildTripRecommendationGroups } from "./utils";

function buildCommunityDestinations(
  tripsWithPlaces: {
    destination: string;
    _count: { places: number };
  }[]
): CommunityDestination[] {
  const destinationMap = new Map<string, CommunityDestination>();

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

  return Array.from(destinationMap.values())
    .sort((a, b) => b.tripCount - a.tripCount)
    .slice(0, 6);
}

export function buildDestinationSectionData(
  userTrips: { id: string; title: string; destination: string }[],
  tripsWithPlaces: {
    destination: string;
    _count: { places: number };
  }[]
): DestinationSectionData {
  if (userTrips.length > 0) {
    return {
      mode: "personalized",
      tripGroups: buildTripRecommendationGroups(userTrips),
      totalTripCount: userTrips.length,
    };
  }

  return {
    mode: "community",
    destinations: buildCommunityDestinations(tripsWithPlaces),
  };
}

export async function fetchTripsForDestinationSection(userId: string | null) {
  const [tripsWithPlaces, userTrips] = await Promise.all([
    prisma.trip.findMany({
      where: userId ? { userId } : undefined,
      select: {
        destination: true,
        _count: { select: { places: true } },
      },
    }),
    userId
      ? prisma.trip.findMany({
          where: { userId },
          select: { id: true, title: true, destination: true },
          orderBy: { startDate: "desc" },
        })
      : Promise.resolve([]),
  ]);

  const discoveryDestinations = buildDiscoveryDestinations(
    userTrips.map((trip) => trip.destination)
  );

  return {
    tripsWithPlaces,
    userTrips,
    sectionData: buildDestinationSectionData(userTrips, tripsWithPlaces),
    discoveryDestinations,
  };
}

export type DestinationPageData = {
  sectionData: DestinationSectionData;
  discoveryDestinations: DiscoveryDestination[];
};
