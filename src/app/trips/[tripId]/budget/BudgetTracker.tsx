"use client";

import { useMemo, useState, useTransition } from "react";
import {
  createExpenseAction,
  deleteExpenseAction,
  updateTripBudgetAction,
} from "@/features/budget/actions";
import { EXPENSE_CATEGORIES, CATEGORY_COLORS } from "@/features/budget/constants";
import type { BudgetSummary, CategoryBreakdown, Expense } from "@/features/budget/types";
import {
  computeBudgetSummary,
  computeCategoryBreakdown,
  formatCurrency,
} from "@/features/budget/utils";
import { DollarSign, Pencil, Plus, Trash2, Wallet, X } from "lucide-react";
import { toast, Toaster } from "sonner";

type SerializedExpense = Omit<Expense, "createdAt"> & { createdAt: string };

interface BudgetTrackerProps {
  tripId: string;
  initialBudget: number;
  initialExpenses: SerializedExpense[];
}

export function BudgetTracker({ tripId, initialBudget, initialExpenses }: BudgetTrackerProps) {
  const [budget, setBudget] = useState(initialBudget);
  const [expenses, setExpenses] = useState<Expense[]>(
    initialExpenses.map((expense) => ({
      ...expense,
      createdAt: new Date(expense.createdAt),
    }))
  );
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showBudgetEditor, setShowBudgetEditor] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [budgetInput, setBudgetInput] = useState(String(initialBudget));
  const [isAdding, startAddingTransition] = useTransition();
  const [isUpdatingBudget, startBudgetTransition] = useTransition();

  const summary: BudgetSummary = useMemo(
    () => computeBudgetSummary(budget, expenses),
    [budget, expenses]
  );

  const categoryBreakdown: CategoryBreakdown[] = useMemo(
    () => computeCategoryBreakdown(expenses),
    [expenses]
  );

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = Number(amount);
    if (!title.trim() || !amount || Number.isNaN(parsedAmount)) return;

    const payload = {
      tripId,
      title: title.trim(),
      amount: parsedAmount,
      category,
    };

    setTitle("");
    setAmount("");
    setCategory(EXPENSE_CATEGORIES[0]);
    setShowExpenseForm(false);

    startAddingTransition(async () => {
      const result = await createExpenseAction(payload);

      if (result.error) {
        toast.error(result.error);
        setTitle(payload.title);
        setAmount(String(payload.amount));
        setCategory(payload.category);
        setShowExpenseForm(true);
        return;
      }

      if (result.expense) {
        const newExpense: Expense = {
          id: result.expense.id,
          title: result.expense.title,
          amount: result.expense.amount,
          category: result.expense.category,
          tripId: result.expense.tripId,
          createdAt: new Date(result.expense.createdAt),
        };
        setExpenses((prev) => [newExpense, ...prev]);
        toast.success("Expense logged");
      }
    });
  };

  const handleDeleteExpense = async (id: string) => {
    const expenseToDelete = expenses.find((expense) => expense.id === id);
    if (!expenseToDelete) return;

    setExpenses((prev) => prev.filter((expense) => expense.id !== id));

    const result = await deleteExpenseAction(id, tripId);

    if (result.error) {
      setExpenses((prev) =>
        [expenseToDelete, ...prev].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        )
      );
      toast.error(result.error);
    } else {
      toast.success("Expense removed");
    }
  };

  const handleUpdateBudget = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedBudget = Number(budgetInput);
    if (Number.isNaN(parsedBudget)) return;

    startBudgetTransition(async () => {
      const result = await updateTripBudgetAction({ tripId, budget: parsedBudget });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.budget !== undefined) {
        setBudget(result.budget);
        setShowBudgetEditor(false);
        toast.success("Trip budget updated");
      }
    });
  };

  return (
    <div className="space-y-6">
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#1E293B",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#F8F6F1",
          },
        }}
      />

      <div className="flex justify-between items-end gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-200">Budget Tracker</h2>
          <p className="text-sm text-slate-500 mt-1">
            Log expenses, categorize spending, and stay within your trip allowance.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowExpenseForm((prev) => !prev)}
          className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition hover:opacity-90 bg-amber-500 text-slate-900 shrink-0"
        >
          {showExpenseForm ? <X size={14} /> : <Plus size={14} />}
          {showExpenseForm ? "Cancel" : "Log expense"}
        </button>
      </div>

      {showExpenseForm && (
        <form
          onSubmit={handleAddExpense}
          className="rounded-3xl p-5 space-y-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <h3 className="text-sm font-bold text-slate-300">New expense</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What did you spend on?"
              className="sm:col-span-2 px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 placeholder-slate-500"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.08)",
                color: "#F8F6F1",
              }}
              disabled={isAdding}
            />
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount (USD)"
              className="px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 placeholder-slate-500"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.08)",
                color: "#F8F6F1",
              }}
              disabled={isAdding}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.08)",
                color: "#F8F6F1",
              }}
              disabled={isAdding}
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} style={{ background: "#0A0F1E" }}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={isAdding || !title.trim() || !amount}
            className="flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition hover:opacity-90 disabled:opacity-30 bg-amber-500 text-slate-900"
          >
            <Plus size={16} />
            Add expense
          </button>
        </form>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div
          className="p-5 rounded-2xl border flex flex-col gap-2"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Total Budget</span>
            <button
              type="button"
              onClick={() => {
                setBudgetInput(String(budget));
                setShowBudgetEditor((prev) => !prev);
              }}
              className="p-1 text-slate-500 hover:text-amber-500 rounded-lg hover:bg-amber-500/10 transition-all"
              aria-label="Edit budget"
            >
              <Pencil size={12} />
            </button>
          </div>
          <span className="text-2xl font-black text-slate-200">{formatCurrency(budget)}</span>
        </div>

        <div
          className="p-5 rounded-2xl border flex flex-col gap-2"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <span className="text-xs text-slate-400 font-semibold">Total Spent</span>
          <span className="text-2xl font-black text-amber-500">{formatCurrency(summary.totalSpent)}</span>
        </div>

        <div
          className="p-5 rounded-2xl border flex flex-col gap-2"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <span className="text-xs text-slate-400 font-semibold">Remaining Balance</span>
          <span
            className={`text-2xl font-black ${summary.isOverBudget ? "text-red-400" : "text-emerald-400"}`}
          >
            {formatCurrency(summary.remainingBudget)}
          </span>
        </div>
      </div>

      {showBudgetEditor && (
        <form
          onSubmit={handleUpdateBudget}
          className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center"
        >
          <input
            type="number"
            min="0"
            step="1"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            style={{
              background: "rgba(255,255,255,0.02)",
              borderColor: "rgba(255,255,255,0.08)",
              color: "#F8F6F1",
            }}
            disabled={isUpdatingBudget}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isUpdatingBudget}
              className="rounded-xl px-4 py-3 text-sm font-bold bg-amber-500 text-slate-900 hover:opacity-90 disabled:opacity-30"
            >
              Save budget
            </button>
            <button
              type="button"
              onClick={() => setShowBudgetEditor(false)}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div
        className="p-5 rounded-2xl border flex flex-col gap-2.5"
        style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-slate-400">Budget Usage</span>
          <span className="text-slate-200">{summary.budgetPercentage}%</span>
        </div>
        <div
          className="h-2 w-full rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              summary.budgetPercentage > 90 ? "bg-red-500" : "bg-amber-500"
            }`}
            style={{ width: `${summary.budgetPercentage}%` }}
          />
        </div>
        {summary.isOverBudget && (
          <p className="text-xs text-red-400 font-medium">
            You are {formatCurrency(Math.abs(summary.remainingBudget))} over budget.
          </p>
        )}
      </div>

      {categoryBreakdown.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1">
            Spending by category
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {categoryBreakdown.map((item) => {
              const color = CATEGORY_COLORS[item.category] ?? "#64748B";
              return (
                <div
                  key={item.category}
                  className="p-4 rounded-2xl border"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-200">{item.category}</span>
                    <span className="text-sm font-bold" style={{ color }}>
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                  <div
                    className="h-1.5 w-full rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%`, background: color }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 mt-1.5 inline-block">
                    {item.percentage}% of total spend
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1">Expense Log</h3>

        {expenses.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-12 text-center"
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.01)" }}
          >
            <Wallet size={28} className="text-slate-600 mb-2" />
            <h4 className="text-sm font-semibold text-slate-400">No expenses logged yet</h4>
            <p className="text-xs text-slate-500 mt-1">
              Tap &quot;Log expense&quot; to start tracking your trip spending.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {expenses.map((expense) => {
              const color = CATEGORY_COLORS[expense.category] ?? "#64748B";
              return (
                <div
                  key={expense.id}
                  className="group flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 hover:bg-white/5"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="h-8 w-8 flex items-center justify-center rounded-lg shrink-0"
                      style={{ background: `${color}20`, color }}
                    >
                      <DollarSign size={14} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-200 truncate">{expense.title}</h4>
                      <span
                        className="text-xs text-slate-500 px-2 py-0.5 rounded-full font-medium mt-1 inline-block"
                        style={{ background: `${color}15`, color }}
                      >
                        {expense.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-bold text-slate-200">
                      -{formatCurrency(expense.amount)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
                      aria-label={`Delete ${expense.title}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
