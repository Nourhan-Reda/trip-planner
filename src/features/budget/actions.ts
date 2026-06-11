"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createExpenseSchema, updateTripBudgetSchema } from "./validations";

function revalidateBudgetPaths(tripId: string) {
  revalidatePath(`/trips/${tripId}/budget`);
  revalidatePath(`/trips/${tripId}`, "layout");
  revalidatePath(`/trips/${tripId}`);
  revalidatePath("/trips");
  revalidatePath("/");
}

export async function createExpenseAction(formData: {
  tripId: string;
  title: string;
  amount: number;
  category: string;
}) {
  const validated = createExpenseSchema.safeParse(formData);

  if (!validated.success) {
    return { error: validated.error.issues[0]?.message || "Invalid expense input" };
  }

  try {
    const expense = await prisma.expense.create({
      data: {
        title: validated.data.title,
        amount: validated.data.amount,
        category: validated.data.category,
        tripId: validated.data.tripId,
      },
    });

    revalidateBudgetPaths(validated.data.tripId);
    return { success: true, expense };
  } catch (error) {
    console.error("Failed to create expense:", error);
    return { error: "Failed to log expense in the database" };
  }
}

export async function deleteExpenseAction(expenseId: string, tripId: string) {
  try {
    await prisma.expense.delete({
      where: { id: expenseId },
    });

    revalidateBudgetPaths(tripId);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete expense:", error);
    return { error: "Failed to delete expense" };
  }
}

export async function updateTripBudgetAction(formData: { tripId: string; budget: number }) {
  const validated = updateTripBudgetSchema.safeParse(formData);

  if (!validated.success) {
    return { error: validated.error.issues[0]?.message || "Invalid budget input" };
  }

  try {
    const trip = await prisma.trip.update({
      where: { id: validated.data.tripId },
      data: { budget: validated.data.budget },
    });

    revalidateBudgetPaths(validated.data.tripId);
    return { success: true, budget: trip.budget };
  } catch (error) {
    console.error("Failed to update trip budget:", error);
    return { error: "Failed to update trip budget" };
  }
}
