import { prisma } from "@/lib/prisma";
import { Plane, Calendar, MapPin, Wallet, CheckSquare, Plus, ArrowRight, User as UserIcon } from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // Dynamic page to ensure up-to-date trip details

const DESTINATION_IMAGES: Record<string, string> = {
  tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
  japan: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
  paris: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
  france: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  indonesia: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  "new york": "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=600&q=80",
  usa: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80",
  italy: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80",
  london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
  uk: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
  barcelona: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80",
  spain: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80",
  amsterdam: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80",
  istanbul: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
  maldives: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
  greece: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80",
  santorini: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
};

function getDestinationImage(destination: string): string {
  const key = destination.toLowerCase();
  for (const [k, v] of Object.entries(DESTINATION_IMAGES)) {
    if (key.includes(k)) return v;
  }
  return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function TripsPage() {
  const trips = await prisma.trip.findMany({
    include: {
      _count: {
        select: {
          places: true,
          expenses: true,
          todos: true,
        },
      },
      todos: {
        select: {
          completed: true,
        },
      },
      expenses: {
        select: {
          amount: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      startDate: "asc",
    },
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0F1E", fontFamily: "'Inter', sans-serif" }}>
      {/* Navigation */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-8 py-4"
        style={{
          background: "rgba(10,15,30,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "#F59E0B" }}>
            <Plane size={16} className="text-white" style={{ transform: "rotate(45deg)" }} />
          </div>
          <span className="text-lg font-bold" style={{ color: "#F8F6F1", letterSpacing: "-0.02em" }}>
            Wandr
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/trips/create"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition"
            style={{ background: "#F59E0B", color: "#0A0F1E" }}
          >
            <Plus size={16} />
            Plan new trip
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight" style={{ color: "#F8F6F1", letterSpacing: "-0.03em" }}>
              My Trips
            </h1>
            <p className="mt-2 text-sm" style={{ color: "rgba(248,246,241,0.5)" }}>
              Manage your upcoming, active, and completed itineraries.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-amber-500 uppercase tracking-wider">
            Total Trips: {trips.length}
          </div>
        </div>

        {trips.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-24 text-center"
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl mb-6"
              style={{ background: "rgba(245,158,11,0.08)" }}
            >
              <Plane size={28} style={{ color: "#F59E0B", transform: "rotate(45deg)" }} />
            </div>
            <h3 className="text-xl font-bold" style={{ color: "#F8F6F1" }}>No trips planned yet</h3>
            <p className="mt-2 text-sm max-w-xs leading-relaxed" style={{ color: "rgba(248,246,241,0.4)" }}>
              Create your first travel workspace to start organizing places, managing budgets, and building checklists.
            </p>
            <Link
              href="/trips/create"
              className="mt-6 flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition hover:opacity-90"
              style={{ background: "#F59E0B", color: "#0A0F1E" }}
            >
              <Plus size={16} />
              Plan your first trip
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => {
              const image = getDestinationImage(trip.destination);
              const completedTodos = trip.todos.filter((t) => t.completed).length;
              const totalTodos = trip._count.todos;
              const todoPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
              const totalSpent = trip.expenses.reduce((sum, e) => sum + e.amount, 0);
              const budgetPercentage = Math.min(Math.round((totalSpent / trip.budget) * 100), 100);

              return (
                <Link
                  key={trip.id}
                  href={`/trips/${trip.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Photo Banner */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={image}
                      alt={trip.destination}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(10,15,30,1) 0%, rgba(10,15,30,0.4) 70%, transparent 100%)",
                      }}
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold uppercase tracking-wider mb-1">
                        <MapPin size={12} />
                        {trip.destination}
                      </div>
                      <h2
                        className="text-2xl font-black leading-tight group-hover:text-amber-400 transition-colors"
                        style={{ color: "#F8F6F1", letterSpacing: "-0.02em" }}
                      >
                        {trip.title}
                      </h2>
                    </div>
                  </div>

                  {/* Trip Details & Stats */}
                  <div className="flex-1 p-5 flex flex-col justify-between gap-5">
                    {/* Date and Planner */}
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={13} style={{ color: "#3B82F6" }} />
                        <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-1 font-medium text-slate-300">
                        <UserIcon size={12} />
                        <span>{trip.user.name.split(" ")[0]}</span>
                      </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-4">
                      {/* Todos Progress */}
                      <div>
                        <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                          <span className="flex items-center gap-1" style={{ color: "rgba(248,246,241,0.6)" }}>
                            <CheckSquare size={13} className="text-emerald-500" />
                            Checklist Progress
                          </span>
                          <span style={{ color: "#F8F6F1" }}>
                            {completedTodos}/{totalTodos} ({todoPercentage}%)
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${totalTodos > 0 ? todoPercentage : 0}%`,
                              background: "#10B981",
                            }}
                          />
                        </div>
                      </div>

                      {/* Budget Progress */}
                      <div>
                        <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                          <span className="flex items-center gap-1" style={{ color: "rgba(248,246,241,0.6)" }}>
                            <Wallet size={13} className="text-amber-500" />
                            Budget Utilized
                          </span>
                          <span style={{ color: "#F8F6F1" }}>
                            ${totalSpent.toLocaleString()} / ${trip.budget.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${budgetPercentage}%`,
                              background: budgetPercentage > 90 ? "#EF4444" : "#F59E0B",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer Stats summary */}
                    <div
                      className="pt-4 flex items-center justify-between border-t"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      <span className="text-xs text-slate-500 font-medium">
                        {trip._count.places} {trip._count.places === 1 ? "place" : "places"} saved
                      </span>
                      <span className="text-xs flex items-center gap-1 font-bold text-amber-500 transition-transform group-hover:translate-x-1">
                        Go to dashboard
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
