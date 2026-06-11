import { z } from "zod";

export const createTripSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  destination: z.string().min(1, "Destination is required").max(100, "Destination is too long"),
  startDate: z.string().min(1, "Start date is required").transform((val) => new Date(val)),
  endDate: z.string().min(1, "End date is required").transform((val) => new Date(val)),
  budget: z.coerce.number().min(0, "Budget must be a positive number"),
  userId: z.string().min(1, "Please select a user"),
});
