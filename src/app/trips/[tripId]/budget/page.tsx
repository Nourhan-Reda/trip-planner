import { getTripBudgetData } from "@/features/budget/queries";
import { notFound } from "next/navigation";
import { BudgetTracker } from "./BudgetTracker";

export const revalidate = 0;

export default async function TripBudgetPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const budgetData = await getTripBudgetData(tripId);

  if (!budgetData) {
    notFound();
  }

  const serializedExpenses = budgetData.expenses.map((expense) => ({
    id: expense.id,
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    tripId: expense.tripId,
    createdAt: expense.createdAt.toISOString(),
  }));

  return (
    <BudgetTracker
      tripId={tripId}
      initialBudget={budgetData.budget}
      initialExpenses={serializedExpenses}
    />
  );
}
