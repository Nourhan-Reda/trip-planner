export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  tripId: string;
  createdAt: Date;
}

export interface CreateExpenseInput {
  title: string;
  amount: number;
  category: string;
  tripId: string;
}

export interface BudgetSummary {
  totalSpent: number;
  remainingBudget: number;
  budgetPercentage: number;
  isOverBudget: boolean;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}
