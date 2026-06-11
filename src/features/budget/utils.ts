import type { BudgetSummary, CategoryBreakdown } from "./types";

type ExpenseAmount = { amount: number };
type ExpenseWithCategory = ExpenseAmount & { category: string };

export function computeBudgetSummary(budget: number, expenses: ExpenseAmount[]): BudgetSummary {
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = budget - totalSpent;
  const budgetPercentage =
    budget > 0
      ? Math.min(Math.round((totalSpent / budget) * 100), 100)
      : totalSpent > 0
        ? 100
        : 0;

  return {
    totalSpent,
    remainingBudget,
    budgetPercentage,
    isOverBudget: remainingBudget < 0,
  };
}

export function computeCategoryBreakdown(expenses: ExpenseWithCategory[]): CategoryBreakdown[] {
  if (expenses.length === 0) return [];

  const totals = expenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
    return acc;
  }, {});

  const totalSpent = Object.values(totals).reduce((sum, amount) => sum + amount, 0);

  return Object.entries(totals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
