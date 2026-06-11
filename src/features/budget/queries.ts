import { prisma } from "@/lib/prisma";
import { computeBudgetSummary, computeCategoryBreakdown } from "./utils";

export async function getExpensesForTrip(tripId: string) {
  return prisma.expense.findMany({
    where: { tripId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getTripBudgetData(tripId: string) {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    select: {
      id: true,
      budget: true,
      expenses: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!trip) return null;

  const summary = computeBudgetSummary(trip.budget, trip.expenses);
  const categoryBreakdown = computeCategoryBreakdown(trip.expenses);

  return {
    tripId: trip.id,
    budget: trip.budget,
    expenses: trip.expenses,
    summary,
    categoryBreakdown,
  };
}

export async function getBudgetStatsForTrip(tripId: string) {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    select: {
      budget: true,
      expenses: { select: { amount: true } },
    },
  });

  if (!trip) return null;

  return {
    budget: trip.budget,
    ...computeBudgetSummary(trip.budget, trip.expenses),
  };
}
