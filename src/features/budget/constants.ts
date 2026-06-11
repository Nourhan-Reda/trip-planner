export const EXPENSE_CATEGORIES = [
  "Accommodation",
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const CATEGORY_COLORS: Record<string, string> = {
  Accommodation: "#8B5CF6",
  Food: "#F59E0B",
  Transport: "#3B82F6",
  Shopping: "#EC4899",
  Entertainment: "#10B981",
  Other: "#64748B",
};
