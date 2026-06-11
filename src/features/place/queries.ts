import { prisma } from "@/lib/prisma";

export async function getPlacesForTrip(tripId: string) {
  return prisma.place.findMany({
    where: { tripId },
    orderBy: { createdAt: "asc" },
  });
}

export async function getPlaceStatsForTrip(tripId: string) {
  const [total, visited] = await Promise.all([
    prisma.place.count({ where: { tripId } }),
    prisma.place.count({ where: { tripId, visited: true } }),
  ]);

  return { total, visited };
}
