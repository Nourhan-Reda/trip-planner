import { prisma } from "@/lib/prisma";

export async function getTodosForTrip(tripId: string) {
  return prisma.todo.findMany({
    where: {
      tripId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getTodoStatsForTrip(tripId: string) {
  const [total, completed] = await Promise.all([
    prisma.todo.count({
      where: { tripId },
    }),
    prisma.todo.count({
      where: { tripId, completed: true },
    }),
  ]);

  return { total, completed };
}
