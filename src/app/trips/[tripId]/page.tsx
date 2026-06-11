import { getBudgetStatsForTrip } from "@/features/budget/queries";
import { formatCurrency } from "@/features/budget/utils";
import { getPlaceStatsForTrip } from "@/features/place/queries";
import { getTodoStatsForTrip } from "@/features/todo/queries";
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

  const [trip, todoStats, budgetStats, placeStats] = await Promise.all([
    prisma.trip.findUnique({
      where: { id: tripId },
      select: { id: true },
    }),
    getTodoStatsForTrip(tripId),
    getBudgetStatsForTrip(tripId),
    getPlaceStatsForTrip(tripId),
  ]);

  if (!trip || !budgetStats) {
    notFound();
  }

  const { total: totalTodos, completed: completedTodos } = todoStats;
  const todoPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const { total: totalPlaces, visited: visitedPlaces } = placeStats;
  const placePercentage = totalPlaces > 0 ? Math.round((visitedPlaces / totalPlaces) * 100) : 0;

  const { totalSpent, budgetPercentage } = budgetStats;
  const tripBudget = budgetStats.budget;

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
      title: "Place tracking",
      desc: "Map out the sights, food joints, and events you want to hit.",
      stats: `${visitedPlaces} of ${totalPlaces} places visited`,
      percentage: placePercentage,
      color: "#3B82F6", // Blue
      icon: MapPin,
      link: `/trips/${tripId}/places`,
      linkText: "Manage places",
    },
    {
      title: "Budget management",
      desc: "Log your spends and stay within your planned trip allowance.",
      stats: `${formatCurrency(totalSpent)} of ${formatCurrency(tripBudget)} spent`,
      percentage: budgetPercentage,
      color: "#F59E0B", // Amber
      icon: Wallet,
      link: `/trips/${tripId}/budget`,
      linkText: "Manage budget",
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
            <Link
              key={card.title}
              href={card.link}
              className="group rounded-3xl p-6 flex flex-col justify-between gap-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.04]"
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
                <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
                  {card.title}
                </h3>
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

                <span
                  className="flex items-center gap-1.5 text-xs font-bold transition group-hover:gap-2"
                  style={{ color: card.color }}
                >
                  {card.linkText}
                  <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
