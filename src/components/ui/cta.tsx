import { Plane, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollLink from "@/components/ui/ScrollLink";
import { DISCOVER_DESTINATIONS_HASH } from "@/features/destinations/constants";

const PHOTOS = [
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&q=60",
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300&q=60",
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=300&q=60",
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=60",
];

export default function Cta() {
  return (
    <section className="px-6 py-10 md:px-10">
      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-8 py-20 text-center"
        style={{
          background: "linear-gradient(135deg, #1a1200 0%, #2d1f00 50%, #1a0e00 100%)",
          border: "1px solid rgba(245,158,11,0.2)",
        }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: 600,
            height: 300,
            background: "radial-gradient(ellipse, rgba(245,158,11,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Background photo strip */}
        <div className="pointer-events-none absolute inset-0 flex overflow-hidden opacity-10">
          {PHOTOS.map((src, i) => (
            <img key={i} src={src} alt="" className="h-full flex-1 object-cover" />
          ))}
        </div>

        <div className="relative z-10">
          <p
            className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: "#F59E0B" }}
          >
            <Plane size={12} />
            Ready for takeoff?
          </p>
          <h2
            className="mb-4 text-5xl font-black leading-none md:text-6xl"
            style={{ color: "#F8F6F1", letterSpacing: "-0.04em" }}
          >
            Your next adventure
            <br />
            starts here.
          </h2>
          <p
            className="mx-auto mb-10 max-w-md text-sm leading-relaxed"
            style={{ color: "rgba(248,246,241,0.5)" }}
          >
            Free to start. No credit card. Just better trips.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/trips/create"
              className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition hover:opacity-90"
              style={{ background: "#F59E0B", color: "#0A0F1E" }}
            >
              Start planning free
              <ArrowRight size={16} />
            </Link>
            <ScrollLink
              href={DISCOVER_DESTINATIONS_HASH}
              className="flex items-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-medium transition hover:bg-white/5"
              style={{ borderColor: "rgba(245,158,11,0.25)", color: "rgba(248,246,241,0.6)" }}
            >
              Browse destinations
            </ScrollLink>
          </div>
        </div>
      </div>
    </section>
  );
}