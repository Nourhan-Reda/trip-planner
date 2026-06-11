import { getPlacesForTrip } from "@/features/place/queries";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PlaceList } from "./PlaceList";

export const revalidate = 0;

export default async function TripPlacesPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  const [trip, places] = await Promise.all([
    prisma.trip.findUnique({
      where: { id: tripId },
      select: { id: true },
    }),
    getPlacesForTrip(tripId),
  ]);

  if (!trip) {
    notFound();
  }

  const serializedPlaces = places.map((place) => ({
    id: place.id,
    name: place.name,
    address: place.address,
    visited: place.visited,
    tripId: place.tripId,
    createdAt: place.createdAt.toISOString(),
  }));

  return <PlaceList initialPlaces={serializedPlaces} tripId={tripId} />;
}
