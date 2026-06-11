"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createPlaceSchema } from "./validations";

function revalidatePlacePaths(tripId: string) {
  revalidatePath(`/trips/${tripId}/places`);
  revalidatePath(`/trips/${tripId}`);
  revalidatePath("/trips");
  revalidatePath("/");
}

export async function createPlaceAction(formData: {
  tripId: string;
  name: string;
  address?: string;
}) {
  const validated = createPlaceSchema.safeParse(formData);

  if (!validated.success) {
    return { error: validated.error.issues[0]?.message || "Invalid place input" };
  }

  try {
    const place = await prisma.place.create({
      data: {
        name: validated.data.name,
        address: validated.data.address ?? null,
        visited: false,
        tripId: validated.data.tripId,
      },
    });

    revalidatePlacePaths(validated.data.tripId);
    return { success: true, place };
  } catch (error) {
    console.error("Failed to create place:", error);
    return { error: "Failed to save place in the database" };
  }
}

export async function togglePlaceVisitedAction(placeId: string, visited: boolean, tripId: string) {
  try {
    const place = await prisma.place.update({
      where: { id: placeId },
      data: { visited },
    });

    revalidatePlacePaths(tripId);
    return { success: true, place };
  } catch (error) {
    console.error("Failed to toggle place status:", error);
    return { error: "Failed to update place status" };
  }
}

export async function deletePlaceAction(placeId: string, tripId: string) {
  try {
    await prisma.place.delete({
      where: { id: placeId },
    });

    revalidatePlacePaths(tripId);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete place:", error);
    return { error: "Failed to delete place" };
  }
}
