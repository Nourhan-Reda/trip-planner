import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MapPin, Plus } from "lucide-react";

export const revalidate = 0; // Dynamic data

export default async function TripPlacesPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      places: true,
    },
  });

  if (!trip) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-slate-200">Places to Visit</h2>
          <p className="text-sm text-slate-500 mt-1">Discover, save, and track key spots during your journey.</p>
        </div>
        <button
          className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition hover:opacity-90 bg-amber-500 text-slate-900 opacity-50 cursor-not-allowed"
          disabled
        >
          <Plus size={14} />
          Add place
        </button>
      </div>

      {trip.places.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-16 text-center"
          style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.01)" }}
        >
          <MapPin size={32} className="text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-slate-400">No places saved yet</h3>
          <p className="text-xs text-slate-500 mt-1">Add restaurants, landmarks, and accommodations to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {trip.places.map((place) => (
            <div
              key={place.id}
              className="flex items-center justify-between p-4 rounded-2xl border"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">{place.name}</h4>
                  {place.address && <p className="text-xs text-slate-500 mt-0.5">{place.address}</p>}
                </div>
              </div>
              <span className={place.visited ? "text-xs font-bold text-emerald-400" : "text-xs font-bold text-slate-500"}>
                {place.visited ? "Visited" : "To Visit"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
