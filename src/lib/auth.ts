import type { User as SupabaseUser } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function getAuthUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function ensurePrismaUser(authUser: SupabaseUser) {
  if (!authUser.email) {
    throw new Error("Authenticated user is missing an email address");
  }

  const email = authUser.email.toLowerCase();

  const name =
    (authUser.user_metadata?.name as string | undefined)?.trim() ||
    email.split("@")[0];

  const existingBySupabase = await prisma.user.findFirst({
    where: { supabaseId: authUser.id },
  });

  if (existingBySupabase) {
    return prisma.user.update({
      where: { id: existingBySupabase.id },
      data: { email, name },
    });
  }

  const existingByEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingByEmail) {
    return prisma.user.update({
      where: { id: existingByEmail.id },
      data: { supabaseId: authUser.id, name },
    });
  }

  return prisma.user.create({
    data: {
      supabaseId: authUser.id,
      email,
      name,
    },
  });
}

export async function getCurrentPrismaUser() {
  const authUser = await getAuthUser();
  if (!authUser) {
    return null;
  }

  return ensurePrismaUser(authUser);
}

export async function requireCurrentUser() {
  const user = await getCurrentPrismaUser();
  if (!user) {
    redirect("/auth/login");
  }

  return user;
}

export async function getOwnedTrip(tripId: string, userId: string) {
  return prisma.trip.findFirst({
    where: { id: tripId, userId },
  });
}

export async function requireOwnedTrip(tripId: string, userId: string) {
  const trip = await getOwnedTrip(tripId, userId);
  if (!trip) {
    redirect("/trips");
  }

  return trip;
}
