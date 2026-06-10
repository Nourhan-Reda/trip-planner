import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1, "Task title is required").max(100, "Task title is too long"),
  tripId: z.string().min(1, "Trip ID is required"),
});

export const updateTodoSchema = z.object({
  id: z.string().min(1, "Todo ID is required"),
  title: z.string().min(1, "Task title is required").max(100, "Task title is too long").optional(),
  completed: z.boolean().optional(),
});
