"use client";

import { useState, useTransition } from "react";
import { Todo } from "@/features/todo/types";
import { toggleTodoAction, deleteTodoAction, createTodoAction } from "@/features/todo/actions";
import { CheckSquare, Square, Trash2, Plus, ListTodo, AlertCircle } from "lucide-react";
import { toast, Toaster } from "sonner";
import { cn } from "@/lib/utils";

export function TodoList({ initialTodos, tripId }: { initialTodos: any[]; tripId: string }) {
  const [todos, setTodos] = useState<Todo[]>(
    initialTodos.map((t) => ({
      ...t,
      createdAt: new Date(t.createdAt),
    }))
  );
  const [newTitle, setNewTitle] = useState("");
  const [isAdding, startAddingTransition] = useTransition();

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggle = async (id: string, currentCompleted: boolean) => {
    const nextCompleted = !currentCompleted;
    
    // Optimistic update
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: nextCompleted } : t))
    );

    const result = await toggleTodoAction(id, nextCompleted, tripId);
    
    if (result.error) {
      // Revert on error
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: currentCompleted } : t))
      );
      toast.error(result.error);
    } else {
      toast.success(nextCompleted ? "Task completed!" : "Task marked as active");
    }
  };

  const handleDelete = async (id: string) => {
    const todoToDelete = todos.find((t) => t.id === id);
    if (!todoToDelete) return;

    // Optimistic update
    setTodos((prev) => prev.filter((t) => t.id !== id));

    const result = await deleteTodoAction(id, tripId);
    
    if (result.error) {
      // Revert on error
      setTodos((prev) => {
        const reverted = [...prev, todoToDelete];
        return reverted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      });
      toast.error(result.error);
    } else {
      toast.success("Task deleted");
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const titleToSend = newTitle.trim();
    setNewTitle("");

    startAddingTransition(async () => {
      const result = await createTodoAction({ tripId, title: titleToSend });
      
      if (result.error) {
        toast.error(result.error);
        setNewTitle(titleToSend); // restore
      } else if (result.todo) {
        const newTodo: Todo = {
          id: result.todo.id,
          title: result.todo.title,
          completed: result.todo.completed,
          tripId: result.todo.tripId,
          createdAt: new Date(result.todo.createdAt),
        };
        setTodos((prev) => [...prev, newTodo]);
        toast.success("Task added!");
      }
    });
  };

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div className="space-y-6">
      {/* Toast notifications handler */}
      <Toaster position="bottom-right" theme="dark" toastOptions={{
        style: { background: "#1E293B", border: "1px solid rgba(255,255,255,0.08)", color: "#F8F6F1" }
      }} />

      {/* Progress Card */}
      <div
        className="rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex-1">
          <div className="flex justify-between items-center text-sm font-semibold mb-2">
            <span className="text-slate-300">Completion Progress</span>
            <span className="text-emerald-400 font-bold">{completedCount} of {totalCount} tasks done ({percentage}%)</span>
          </div>
          <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full transition-all duration-500 bg-emerald-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Add Task Input Form */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new checklist item (e.g., Book flights, Renew passport...)"
          className="flex-1 px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 placeholder-slate-500"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.08)",
            color: "#F8F6F1",
          }}
          disabled={isAdding}
        />
        <button
          type="submit"
          disabled={isAdding || !newTitle.trim()}
          className="flex items-center justify-center rounded-xl p-3 text-sm font-bold transition hover:opacity-90 disabled:opacity-30 bg-amber-500 text-slate-900"
        >
          <Plus size={20} />
        </button>
      </form>

      {/* Tasks Lists */}
      {todos.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-16 text-center"
          style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.01)" }}
        >
          <ListTodo size={32} className="text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-slate-400">No tasks on this checklist yet</h3>
          <p className="text-xs text-slate-500 mt-1">Start by adding items above to keep your trip organized.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Tasks */}
          {activeTodos.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1">Active Tasks</h3>
              <div className="space-y-2">
                {activeTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="group flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 hover:bg-white/5"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderColor: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <button
                      onClick={() => handleToggle(todo.id, todo.completed)}
                      className="flex items-center gap-3 text-left flex-1"
                    >
                      <Square size={18} className="text-slate-500 hover:text-amber-500 transition-colors shrink-0" />
                      <span className="text-sm font-medium text-slate-200">{todo.title}</span>
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTodos.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1">Completed</h3>
              <div className="space-y-2">
                {completedTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="group flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 hover:bg-white/5"
                    style={{
                      background: "rgba(255,255,255,0.01)",
                      borderColor: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <button
                      onClick={() => handleToggle(todo.id, todo.completed)}
                      className="flex items-center gap-3 text-left flex-1"
                    >
                      <CheckSquare size={18} className="text-emerald-500 shrink-0" />
                      <span className="text-sm font-medium text-slate-500 line-through decoration-slate-600">{todo.title}</span>
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
