"use client";

import { useActionState } from "react";
import { createTripAction, CreateTripState } from "@/features/trip/actions";
import { Plane, Calendar, MapPin, Wallet, ArrowRight } from "lucide-react";
import Link from "next/link";

export function TripCreateForm() {
  const [state, formAction, isPending] = useActionState(createTripAction, null);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded-xl p-4 text-sm font-semibold border text-red-400 border-red-500/20 bg-red-500/5">
          {state.error}
        </div>
      )}

      {/* Trip Title */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "rgba(248,246,241,0.8)" }}>
          Trip Title
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
            <Plane size={18} style={{ transform: "rotate(45deg)" }} />
          </div>
          <input
            type="text"
            name="title"
            placeholder="e.g. Summer Vacation in Europe"
            className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            style={{
              background: "rgba(255,255,255,0.02)",
              borderColor: "rgba(255,255,255,0.08)",
              color: "#F8F6F1",
            }}
            required
          />
        </div>
        {state?.errors?.title && (
          <p className="mt-1 text-xs text-red-400">{state.errors.title[0]}</p>
        )}
      </div>

      {/* Destination */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "rgba(248,246,241,0.8)" }}>
          Destination
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
            <MapPin size={18} />
          </div>
          <input
            type="text"
            name="destination"
            placeholder="e.g. Paris, France"
            className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            style={{
              background: "rgba(255,255,255,0.02)",
              borderColor: "rgba(255,255,255,0.08)",
              color: "#F8F6F1",
            }}
            required
          />
        </div>
        {state?.errors?.destination && (
          <p className="mt-1 text-xs text-red-400">{state.errors.destination[0]}</p>
        )}
      </div>

      {/* Dates Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "rgba(248,246,241,0.8)" }}>
            Start Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
              <Calendar size={18} />
            </div>
            <input
              type="date"
              name="startDate"
              className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 [color-scheme:dark]"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.08)",
                color: "#F8F6F1",
              }}
              required
            />
          </div>
          {state?.errors?.startDate && (
            <p className="mt-1 text-xs text-red-400">{state.errors.startDate[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "rgba(248,246,241,0.8)" }}>
            End Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
              <Calendar size={18} />
            </div>
            <input
              type="date"
              name="endDate"
              className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 [color-scheme:dark]"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.08)",
                color: "#F8F6F1",
              }}
              required
            />
          </div>
          {state?.errors?.endDate && (
            <p className="mt-1 text-xs text-red-400">{state.errors.endDate[0]}</p>
          )}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "rgba(248,246,241,0.8)" }}>
          Budget (USD)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
            <Wallet size={18} />
          </div>
          <input
            type="number"
            name="budget"
            min="0"
            placeholder="e.g. 1500"
            className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            style={{
              background: "rgba(255,255,255,0.02)",
              borderColor: "rgba(255,255,255,0.08)",
              color: "#F8F6F1",
            }}
            required
          />
        </div>
        {state?.errors?.budget && (
          <p className="mt-1 text-xs text-red-400">{state.errors.budget[0]}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Link
          href="/trips"
          className="rounded-xl px-5 py-3 text-sm font-semibold transition hover:bg-white/5"
          style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(248,246,241,0.6)" }}
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition hover:opacity-90 disabled:opacity-50"
          style={{ background: "#F59E0B", color: "#0A0F1E" }}
        >
          {isPending ? "Planning..." : "Plan Trip"}
          <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}
