export const dynamic = "force-dynamic";

import { getCurrentPrismaUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchTripsForDestinationSection } from "@/features/destinations/queries";

import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import Destinations from "@/components/ui/Destination";
import Features from "@/components/ui/Features ";
import ShowcaseCarousel from "@/components/ui/ShowcaseCarousel";
import Cta from "@/components/ui/cta";
import Footer from "@/components/ui/footer";

// ─── Data fetching ──────────────────────────────────────────────────────────

async function getHomeData(): Promise<{
  totalTrips: number;
  totalPlaces: number;
  totalExpenses: number;
  totalTodos: number;
  destinationSection: Awaited<
    ReturnType<typeof fetchTripsForDestinationSection>
  >["sectionData"];
  featuredTripId: string | null;
}> {
  const currentUser = await getCurrentPrismaUser();

  const [
    totalTrips,
    totalPlaces,
    totalExpenses,
    totalTodos,
    destinationData,
    featuredTrip,
  ] = await Promise.all([
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
    fetchTripsForDestinationSection(currentUser?.id ?? null),
    prisma.trip.findFirst({
      where: currentUser ? { userId: currentUser.id } : undefined,
      select: { id: true },
      orderBy: { startDate: "desc" },
    }),
  ]);

  return {
    totalTrips,
    totalPlaces,
    totalExpenses,
    totalTodos,
    destinationSection: destinationData.sectionData,
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
    destinationSection,
    featuredTripId,
  } = await getHomeData();

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0A0F1E", fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar />
      <Hero totalTrips={totalTrips} totalPlaces={totalPlaces} />
      <Destinations sectionData={destinationSection} />
      <Features featuredTripId={featuredTripId} />
      <ShowcaseCarousel />
      <Cta />
      <Footer totalExpenses={totalExpenses} totalTodos={totalTodos} />
    </div>
  );
}