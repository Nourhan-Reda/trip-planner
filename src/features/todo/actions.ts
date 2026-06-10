"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createTodoSchema } from "./validations";

export async function createTodoAction(formData: { tripId: string; title: string }) {
  const validated = createTodoSchema.safeParse(formData);

  if (!validated.success) {
    return { error: validated.error.issues[0]?.message || "Invalid task input" };
  }

  try {
    const todo = await prisma.todo.create({
      data: {
        title: validated.data.title,
        tripId: validated.data.tripId,
        completed: false,
      },
    });

    revalidatePath(`/trips/${validated.data.tripId}/todos`);
    revalidatePath(`/trips/${validated.data.tripId}`);
    revalidatePath("/trips");
    revalidatePath("/");
    
    return { success: true, todo };
  } catch (error) {
    console.error("Failed to create todo:", error);
    return { error: "Failed to create task in the database" };
  }
}

export async function toggleTodoAction(todoId: string, completed: boolean, tripId: string) {
  try {
    const todo = await prisma.todo.update({
      where: { id: todoId },
      data: { completed },
    });

    revalidatePath(`/trips/${tripId}/todos`);
    revalidatePath(`/trips/${tripId}`);
    revalidatePath("/trips");
    revalidatePath("/");

    return { success: true, todo };
  } catch (error) {
    console.error("Failed to toggle todo status:", error);
    return { error: "Failed to update task status" };
  }
}

export async function deleteTodoAction(todoId: string, tripId: string) {
  try {
    await prisma.todo.delete({
      where: { id: todoId },
    });

    revalidatePath(`/trips/${tripId}/todos`);
    revalidatePath(`/trips/${tripId}`);
    revalidatePath("/trips");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete todo:", error);
    return { error: "Failed to delete task" };
  }
}
