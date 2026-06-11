"use client";

import { useState, useTransition } from "react";
import {
  createPlaceAction,
  deletePlaceAction,
  togglePlaceVisitedAction,
} from "@/features/place/actions";
import type { Place } from "@/features/place/types";
import { CheckCircle2, Circle, MapPin, Plus, Trash2, X } from "lucide-react";
import { toast, Toaster } from "sonner";

type SerializedPlace = Omit<Place, "createdAt"> & { createdAt: string };

export function PlaceList({
  initialPlaces,
  tripId,
}: {
  initialPlaces: SerializedPlace[];
  tripId: string;
}) {
  const [places, setPlaces] = useState<Place[]>(
    initialPlaces.map((place) => ({
      ...place,
      createdAt: new Date(place.createdAt),
    }))
  );
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isAdding, startAddingTransition] = useTransition();

  const visitedCount = places.filter((place) => place.visited).length;
  const totalCount = places.length;
  const percentage = totalCount > 0 ? Math.round((visitedCount / totalCount) * 100) : 0;

  const toVisit = places.filter((place) => !place.visited);
  const visited = places.filter((place) => place.visited);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      tripId,
      name: name.trim(),
      address: address.trim() || undefined,
    };

    setName("");
    setAddress("");
    setShowForm(false);

    startAddingTransition(async () => {
      const result = await createPlaceAction(payload);

      if (result.error) {
        toast.error(result.error);
        setName(payload.name);
        setAddress(payload.address ?? "");
        setShowForm(true);
        return;
      }

      if (result.place) {
        const newPlace: Place = {
          id: result.place.id,
          name: result.place.name,
          address: result.place.address,
          visited: result.place.visited,
          tripId: result.place.tripId,
          createdAt: new Date(result.place.createdAt),
        };
        setPlaces((prev) => [...prev, newPlace]);
        toast.success("Place added");
      }
    });
  };

  const handleToggleVisited = async (id: string, currentVisited: boolean) => {
    const nextVisited = !currentVisited;

    setPlaces((prev) =>
      prev.map((place) => (place.id === id ? { ...place, visited: nextVisited } : place))
    );

    const result = await togglePlaceVisitedAction(id, nextVisited, tripId);

    if (result.error) {
      setPlaces((prev) =>
        prev.map((place) => (place.id === id ? { ...place, visited: currentVisited } : place))
      );
      toast.error(result.error);
    } else {
      toast.success(nextVisited ? "Marked as visited" : "Marked as to visit");
    }
  };

  const handleDelete = async (id: string) => {
    const placeToDelete = places.find((place) => place.id === id);
    if (!placeToDelete) return;

    setPlaces((prev) => prev.filter((place) => place.id !== id));

    const result = await deletePlaceAction(id, tripId);

    if (result.error) {
      setPlaces((prev) => {
        const reverted = [...prev, placeToDelete];
        return reverted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      });
      toast.error(result.error);
    } else {
      toast.success("Place removed");
    }
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
          <h2 className="text-xl font-bold text-slate-200">Places to Visit</h2>
          <p className="text-sm text-slate-500 mt-1">
            Discover, save, and track key spots during your journey.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition hover:opacity-90 bg-amber-500 text-slate-900 shrink-0"
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? "Cancel" : "Add place"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="rounded-3xl p-5 space-y-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <h3 className="text-sm font-bold text-slate-300">New place</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Place name (e.g. Eiffel Tower)"
              className="sm:col-span-2 px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 placeholder-slate-500"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.08)",
                color: "#F8F6F1",
              }}
              disabled={isAdding}
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address or area (optional)"
              className="sm:col-span-2 px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 placeholder-slate-500"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.08)",
                color: "#F8F6F1",
              }}
              disabled={isAdding}
            />
          </div>
          <button
            type="submit"
            disabled={isAdding || !name.trim()}
            className="flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition hover:opacity-90 disabled:opacity-30 bg-amber-500 text-slate-900"
          >
            <Plus size={16} />
            Save place
          </button>
        </form>
      )}

      <div
        className="rounded-3xl p-6"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex justify-between items-center text-sm font-semibold mb-2">
          <span className="text-slate-300">Visit Progress</span>
          <span className="text-blue-400 font-bold">
            {visitedCount} of {totalCount} places visited ({percentage}%)
          </span>
        </div>
        <div
          className="h-2 w-full rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 bg-blue-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {places.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-16 text-center"
          style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.01)" }}
        >
          <MapPin size={32} className="text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-slate-400">No places saved yet</h3>
          <p className="text-xs text-slate-500 mt-1">
            Tap &quot;Add place&quot; to save restaurants, landmarks, and accommodations.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {toVisit.length > 0 && (
            <PlaceSection
              title="To Visit"
              places={toVisit}
              onToggle={handleToggleVisited}
              onDelete={handleDelete}
            />
          )}
          {visited.length > 0 && (
            <PlaceSection
              title="Visited"
              places={visited}
              onToggle={handleToggleVisited}
              onDelete={handleDelete}
              visited
            />
          )}
        </div>
      )}
    </div>
  );
}

function PlaceSection({
  title,
  places,
  onToggle,
  onDelete,
  visited = false,
}: {
  title: string;
  places: Place[];
  onToggle: (id: string, visited: boolean) => void;
  onDelete: (id: string) => void;
  visited?: boolean;
}) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {places.map((place) => (
          <div
            key={place.id}
            className="group flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 hover:bg-white/5"
            style={{
              background: visited ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.02)",
              borderColor: visited ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)",
            }}
          >
            <button
              type="button"
              onClick={() => onToggle(place.id, place.visited)}
              className="flex items-start gap-3 text-left flex-1 min-w-0"
            >
              {visited ? (
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Circle size={18} className="text-slate-500 hover:text-blue-400 transition-colors shrink-0 mt-0.5" />
              )}
              <div className="min-w-0">
                <h4
                  className={`text-sm font-semibold truncate ${
                    visited ? "text-slate-500 line-through decoration-slate-600" : "text-slate-200"
                  }`}
                >
                  {place.name}
                </h4>
                {place.address && (
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{place.address}</p>
                )}
              </div>
            </button>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <span
                className={`text-xs font-bold ${visited ? "text-emerald-400" : "text-slate-500"}`}
              >
                {visited ? "Visited" : "To Visit"}
              </span>
              <button
                type="button"
                onClick={() => onDelete(place.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
                aria-label={`Delete ${place.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
