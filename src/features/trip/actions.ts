"use server";

import { requireCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTripSchema } from "./validations";

export type CreateTripState = {
  errors?: {
    title?: string[];
    destination?: string[];
    startDate?: string[];
    endDate?: string[];
    budget?: string[];
  };
  error?: string;
  success?: boolean;
};

export async function createTripAction(
  prevState: CreateTripState | null,
  formData: FormData
): Promise<CreateTripState> {
  const user = await requireCurrentUser();

  const title = formData.get("title") as string;
  const destination = formData.get("destination") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const budget = formData.get("budget") as string;

  const validated = createTripSchema.safeParse({
    title,
    destination,
    startDate,
    endDate,
    budget,
  });

  if (!validated.success) {
    const fieldErrors = validated.error.flatten().fieldErrors;
    return {
      errors: {
        title: fieldErrors.title,
        destination: fieldErrors.destination,
        startDate: fieldErrors.startDate,
        endDate: fieldErrors.endDate,
        budget: fieldErrors.budget,
      },
    };
  }

  const { title: t, destination: d, startDate: sd, endDate: ed, budget: b } = validated.data;

  if (ed < sd) {
    return {
      errors: {
        endDate: ["End date must be on or after start date"],
      },
    };
  }

  let createdTripId = "";
  try {
    const trip = await prisma.trip.create({
      data: {
        title: t,
        destination: d,
        startDate: sd,
        endDate: ed,
        budget: b,
        userId: user.id,
      },
    });
    createdTripId = trip.id;
  } catch (err) {
    console.error("Failed to create trip:", err);
    return {
      error: "Failed to create trip in the database. Please try again.",
    };
  }

  revalidatePath("/trips");
  revalidatePath("/");
  redirect(`/trips/${createdTripId}`);
}
