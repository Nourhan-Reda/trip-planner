import { TripCreateForm } from "./form";
import { Plane, ChevronLeft } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function CreateTripPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string }>;
}) {
  const { destination } = await searchParams;
  const defaultDestination = destination?.trim() ?? "";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0F1E", fontFamily: "'Inter', sans-serif" }}>
      {/* Navigation */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-8 py-4"
        style={{
          background: "rgba(10,15,30,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "#F59E0B" }}>
            <Plane size={16} className="text-white" style={{ transform: "rotate(45deg)" }} />
          </div>
          <span className="text-lg font-bold" style={{ color: "#F8F6F1", letterSpacing: "-0.02em" }}>
            Wandr
          </span>
        </Link>

        <Link
          href="/trips"
          className="flex items-center gap-1.5 text-sm font-semibold transition"
          style={{ color: "rgba(248,246,241,0.6)" }}
        >
          <ChevronLeft size={16} />
          Back to trips
        </Link>
      </nav>

      {/* Form Container */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div
          className="max-w-xl w-full rounded-3xl p-8 transition duration-300"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="mb-8">
            <p
              className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              style={{ color: "#F59E0B" }}
            >
              <Plane size={12} style={{ transform: "rotate(45deg)" }} />
              Start Planning
            </p>
            <h1 className="text-3xl font-black tracking-tight" style={{ color: "#F8F6F1", letterSpacing: "-0.03em" }}>
              Plan a new adventure
            </h1>
            <p className="mt-1.5 text-xs text-slate-400">
              Set up your destination workspace. Fill in details and start mapping items.
            </p>
          </div>

          <TripCreateForm defaultDestination={defaultDestination} />
        </div>
      </main>
    </div>
  );
}
