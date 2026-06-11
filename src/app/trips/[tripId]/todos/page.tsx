import { getTodosForTrip } from "@/features/todo/queries";
import { TodoList } from "./TodoList";

export const revalidate = 0; // Ensure data is fetched fresh

export default async function TripTodosPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const todos = await getTodosForTrip(tripId);

  // Serialize dates to avoid warnings passing from Server to Client component
  const serializedTodos = todos.map((t) => ({
    id: t.id,
    title: t.title,
    completed: t.completed,
    tripId: t.tripId,
    createdAt: t.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-200">Trip Checklist</h2>
        <p className="text-sm text-slate-500 mt-1">Manage, add, and complete tasks for this trip.</p>
      </div>

      <TodoList initialTodos={serializedTodos} tripId={tripId} />
    </div>
  );
}
