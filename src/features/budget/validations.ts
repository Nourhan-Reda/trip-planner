import { z } from "zod";
import { EXPENSE_CATEGORIES } from "./constants";

export const createExpenseSchema = z.object({
  title: z.string().min(1, "Expense title is required").max(100, "Title is too long"),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  category: z.enum(EXPENSE_CATEGORIES, { message: "Please select a valid category" }),
  tripId: z.string().min(1, "Trip ID is required"),
});

export const updateTripBudgetSchema = z.object({
  tripId: z.string().min(1, "Trip ID is required"),
  budget: z.coerce.number().min(0, "Budget must be zero or greater"),
});
