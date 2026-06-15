"use server";

import { requireCurrentUser, requireOwnedTrip } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type AddRecommendedPlaceResult =
  | { success: true; alreadyExists: boolean }
  | { error: string };

export async function addRecommendedPlaceToTripAction(
  tripId: string,
  name: string,
  address: string
): Promise<AddRecommendedPlaceResult> {
  const user = await requireCurrentUser();
  await requireOwnedTrip(tripId, user.id);

  const trimmedName = name.trim();
  const trimmedAddress = address.trim();

  if (!trimmedName) {
    return { error: "Place name is required" };
  }

  try {
    const existing = await prisma.place.findFirst({
      where: {
        tripId,
        name: { equals: trimmedName, mode: "insensitive" },
      },
      select: { id: true },
    });

    if (existing) {
      return { success: true, alreadyExists: true };
    }

    await prisma.place.create({
      data: {
        tripId,
        name: trimmedName,
        address: trimmedAddress || null,
        visited: false,
      },
    });

    revalidatePath(`/trips/${tripId}/places`);
    revalidatePath(`/trips/${tripId}`);
    revalidatePath("/trips");
    revalidatePath("/");

    return { success: true, alreadyExists: false };
  } catch (error) {
    console.error("Failed to add recommended place:", error);
    return { error: "Failed to add place to your trip" };
  }
}
