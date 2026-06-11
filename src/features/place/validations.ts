import { z } from "zod";

export const createPlaceSchema = z.object({
  name: z.string().min(1, "Place name is required").max(100, "Place name is too long"),
  address: z
    .string()
    .max(200, "Address is too long")
    .optional()
    .transform((value) => (value?.trim() ? value.trim() : undefined)),
  tripId: z.string().min(1, "Trip ID is required"),
});
