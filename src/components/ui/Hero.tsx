import { Plane, MapPin, Star, ArrowRight, Globe, ChevronRight } from "lucide-react";
import Link from "next/link";
import ScrollLink, { DiscoverHashScroll } from "@/components/ui/ScrollLink";
import { DISCOVER_DESTINATIONS_HASH } from "@/features/destinations/constants";

const FLOATING_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70",
    style: { width: 220, height: 160, top: "15%", left: "5%", transform: "rotate(-6deg)", opacity: 0.2 },
  },
  {
    src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=70",
    style: { width: 180, height: 240, top: "8%", right: "8%", transform: "rotate(5deg)", opacity: 0.2 },
  },
  {
    src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=70",
    style: { width: 160, height: 120, bottom: "20%", left: "3%", transform: "rotate(4deg)", opacity: 0.15 },
  },
  {
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=70",
    style: { width: 200, height: 150, bottom: "18%", right: "4%", transform: "rotate(-4deg)", opacity: 0.15 },
  },
];

type HeroProps = {
  totalTrips: number;
  totalPlaces: number;
};

export default function Hero({ totalTrips, totalPlaces }: HeroProps) {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.12) 0%, transparent 60%), #0A0F1E",
      }}
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating photos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {FLOATING_PHOTOS.map((photo, i) => (
          <img
            key={i}
            src={photo.src}
            alt=""
            className="absolute rounded-2xl object-cover"
            style={photo.style}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center">
        {/* Badge */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
          style={{
            borderColor: "rgba(245,158,11,0.3)",
            color: "#F59E0B",
            background: "rgba(245,158,11,0.08)",
          }}
        >
          <Star size={12} fill="currentColor" />
          The smarter way to plan travel
        </div>

        {/* Headline */}
        <h1
          className="mb-6 text-6xl font-black leading-none tracking-tight md:text-8xl"
          style={{ color: "#F8F6F1", letterSpacing: "-0.04em" }}
        >
          Plan trips
          <br />
          <span style={{ color: "#F59E0B", fontStyle: "italic" }}>without</span>
          <br />
          the chaos.
        </h1>

        <p
          className="mx-auto mb-10 max-w-lg text-base leading-relaxed"
          style={{ color: "rgba(248,246,241,0.5)" }}
        >
          One workspace for every trip — places, budget, todos, and memories.
          Built for travelers who want to explore more and stress less.
        </p>

        {/* CTAs */}
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
            style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(248,246,241,0.7)" }}
          >
            <Globe size={16} />
            Explore destinations
          </ScrollLink>
        </div>

        {/* Stats */}
        <div
          className="mx-auto mt-16 grid max-w-sm grid-cols-2 gap-px overflow-hidden rounded-2xl sm:max-w-md"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {[
            { value: totalTrips.toLocaleString(), label: "Trips planned", Icon: Plane },
            { value: totalPlaces.toLocaleString(), label: "Places saved", Icon: MapPin },
          ].map(({ value, label, Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center py-5"
              style={{ background: "rgba(10,15,30,0.9)" }}
            >
              <Icon size={16} style={{ color: "#F59E0B", marginBottom: 6 }} />
              <span
                className="text-2xl font-black"
                style={{ color: "#F8F6F1", letterSpacing: "-0.03em" }}
              >
                {value}
              </span>
              <span className="mt-0.5 text-xs" style={{ color: "rgba(248,246,241,0.4)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: "rgba(248,246,241,0.2)" }}
      >
        <ChevronRight size={20} style={{ transform: "rotate(90deg)" }} />
      </div>
    </section>
  );
}