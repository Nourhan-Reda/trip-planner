import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Wallet, Plus, DollarSign } from "lucide-react";

export const revalidate = 0; // Dynamic data

export default async function TripBudgetPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      expenses: true,
    },
  });

  if (!trip) {
    notFound();
  }

  const totalSpent = trip.expenses.reduce((sum, e) => sum + e.amount, 0);
  const remainingBudget = trip.budget - totalSpent;
  const budgetPercentage = Math.min(Math.round((totalSpent / trip.budget) * 100), 100);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-slate-200">Budget Tracker</h2>
          <p className="text-sm text-slate-500 mt-1">Keep an eye on expenses and categorize spends.</p>
        </div>
        <button
          className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition hover:opacity-90 bg-amber-500 text-slate-900 opacity-50 cursor-not-allowed"
          disabled
        >
          <Plus size={14} />
          Log expense
        </button>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Total Budget Card */}
        <div
          className="p-5 rounded-2xl border flex flex-col gap-2"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <span className="text-xs text-slate-400 font-semibold">Total Budget</span>
          <span className="text-2xl font-black text-slate-200">${trip.budget.toLocaleString()}</span>
        </div>

        {/* Total Spent Card */}
        <div
          className="p-5 rounded-2xl border flex flex-col gap-2"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <span className="text-xs text-slate-400 font-semibold">Total Spent</span>
          <span className="text-2xl font-black text-amber-500">${totalSpent.toLocaleString()}</span>
        </div>

        {/* Balance Card */}
        <div
          className="p-5 rounded-2xl border flex flex-col gap-2"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <span className="text-xs text-slate-400 font-semibold">Remaining Balance</span>
          <span className={`text-2xl font-black ${remainingBudget >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            ${remainingBudget.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Budget Progress Bar */}
      <div
        className="p-5 rounded-2xl border flex flex-col gap-2.5"
        style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-slate-400">Budget Usage</span>
          <span className="text-slate-200">{budgetPercentage}%</span>
        </div>
        <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className={`h-full rounded-full transition-all duration-500 ${budgetPercentage > 90 ? "bg-red-500" : "bg-amber-500"}`}
            style={{ width: `${budgetPercentage}%` }}
          />
        </div>
      </div>

      {/* Expense list */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1">Expense Log</h3>

        {trip.expenses.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-12 text-center"
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.01)" }}
          >
            <Wallet size={28} className="text-slate-600 mb-2" />
            <h4 className="text-sm font-semibold text-slate-400">No expenses logged yet</h4>
          </div>
        ) : (
          <div className="space-y-2">
            {trip.expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 rounded-2xl border"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.05)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                    <DollarSign size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{expense.title}</h4>
                    <span className="text-2xs text-slate-500 bg-slate-500/10 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">
                      {expense.category}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-200">
                  -${expense.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
