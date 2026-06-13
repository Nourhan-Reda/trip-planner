export const revalidate = 3600;

import { getCurrentPrismaUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Destination } from "@/types/Destination ";

import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import Destinations from "@/components/ui/Destination";
import Features from "@/components/ui/Features ";
import HowItWorks from "@/components/ui/Howitworks";
import Cta from "@/components/ui/cta";
import Footer from "@/components/ui/footer";

// ─── Data fetching ──────────────────────────────────────────────────────────

async function getHomeData(): Promise<{
  totalTrips: number;
  totalPlaces: number;
  totalExpenses: number;
  totalTodos: number;
  popularDestinations: Destination[];
  featuredTripId: string | null;
}> {
  const currentUser = await getCurrentPrismaUser();

  const [totalTrips, totalPlaces, totalExpenses, totalTodos, tripsWithPlaces, featuredTrip] =
    await Promise.all([
      currentUser
        ? prisma.trip.count({ where: { userId: currentUser.id } })
        : prisma.trip.count(),
      currentUser
        ? prisma.place.count({ where: { trip: { userId: currentUser.id } } })
        : prisma.place.count(),
      currentUser
        ? prisma.expense.count({ where: { trip: { userId: currentUser.id } } })
        : prisma.expense.count(),
      currentUser
        ? prisma.todo.count({ where: { trip: { userId: currentUser.id } } })
        : prisma.todo.count(),
      prisma.trip.findMany({
        where: currentUser ? { userId: currentUser.id } : undefined,
        select: {
          id: true,
          destination: true,
          _count: { select: { places: true, expenses: true, todos: true } },
        },
      }),
      prisma.trip.findFirst({
        where: currentUser ? { userId: currentUser.id } : undefined,
        select: { id: true },
        orderBy: { startDate: "desc" },
      }),
    ]);

  const destinationMap = new Map<string, Destination>();
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

  const popularDestinations = Array.from(destinationMap.values())
    .sort((a, b) => b.tripCount - a.tripCount)
    .slice(0, 6);

  return {
    totalTrips,
    totalPlaces,
    totalExpenses,
    totalTodos,
    popularDestinations,
    featuredTripId: featuredTrip?.id ?? null,
  };
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const {
    totalTrips,
    totalPlaces,
    totalExpenses,
    totalTodos,
    popularDestinations,
    featuredTripId,
  } = await getHomeData();

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0A0F1E", fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar />
      <Hero totalTrips={totalTrips} totalPlaces={totalPlaces} />
      <Destinations destinations={popularDestinations} />
      <Features featuredTripId={featuredTripId} />
      <HowItWorks />
      <Cta />
      <Footer totalExpenses={totalExpenses} totalTodos={totalTodos} />
    </div>
  );
}