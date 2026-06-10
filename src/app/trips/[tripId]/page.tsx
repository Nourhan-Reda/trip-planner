import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CheckSquare, MapPin, Wallet, ArrowRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // Dynamic data

export default async function TripOverviewPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      todos: true,
      places: true,
      expenses: true,
    },
  });

  if (!trip) {
    notFound();
  }

  // Todos stats
  const totalTodos = trip.todos.length;
  const completedTodos = trip.todos.filter((t) => t.completed).length;
  const todoPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  // Places stats
  const totalPlaces = trip.places.length;
  const visitedPlaces = trip.places.filter((p) => p.visited).length;
  const placePercentage = totalPlaces > 0 ? Math.round((visitedPlaces / totalPlaces) * 100) : 0;

  // Budget stats
  const totalSpent = trip.expenses.reduce((sum, e) => sum + e.amount, 0);
  const budgetPercentage = Math.min(Math.round((totalSpent / trip.budget) * 100), 100);

  const cards = [
    {
      title: "Smart Checklist",
      desc: "Prepare for your trip and stay on track with task items.",
      stats: `${completedTodos} of ${totalTodos} tasks completed`,
      percentage: todoPercentage,
      color: "#10B981", // Emerald
      icon: CheckSquare,
      link: `/trips/${tripId}/todos`,
      linkText: "Manage checklist",
    },
    {
      title: "Places to Visit",
      desc: "Map out the sights, food joints, and events you want to hit.",
      stats: `${visitedPlaces} of ${totalPlaces} places visited`,
      percentage: placePercentage,
      color: "#3B82F6", // Blue
      icon: MapPin,
      link: `/trips/${tripId}/places`,
      linkText: "Explore places",
    },
    {
      title: "Budget & Expenses",
      desc: "Log your spends and stay within your planned trip allowance.",
      stats: `$${totalSpent.toLocaleString()} of $${trip.budget.toLocaleString()} spent`,
      percentage: budgetPercentage,
      color: "#F59E0B", // Amber
      icon: Wallet,
      link: `/trips/${tripId}/budget`,
      linkText: "Track budget",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-200">Trip Overview</h2>
        <p className="text-sm text-slate-500 mt-1">Here is a snapshot of your travel planning progress.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-3xl p-6 flex flex-col justify-between gap-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div>
                <div
                  className="h-10 w-10 flex items-center justify-center rounded-xl mb-4"
                  style={{ background: `${card.color}15` }}
                >
                  <Icon size={18} style={{ color: card.color }} />
                </div>
                <h3 className="text-lg font-bold text-slate-200">{card.title}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{card.desc}</p>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="text-slate-400">{card.stats}</span>
                  <span style={{ color: card.color }}>{card.percentage}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full overflow-hidden mb-4" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${card.percentage}%`,
                      background: card.color,
                    }}
                  />
                </div>

                <Link
                  href={card.link}
                  className="flex items-center gap-1.5 text-xs font-bold transition hover:opacity-80"
                  style={{ color: card.color }}
                >
                  {card.linkText}
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
