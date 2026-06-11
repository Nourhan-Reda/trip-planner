import { Plane, MapPin, Wallet, Users, ArrowRight, ChevronRight } from "lucide-react";

const STEPS = [
  {
    Icon: Plane,
    accent: "#F59E0B",
    title: "Create a trip",
    desc: "Title, destination, dates, and budget — your trip is ready in under a minute.",
  },
  {
    Icon: MapPin,
    accent: "#3B82F6",
    title: "Pin places & tasks",
    desc: "Save spots you want to visit. Build your pre-trip todo checklist.",
  },
  {
    Icon: Wallet,
    accent: "#10B981",
    title: "Track expenses",
    desc: "Log spending by category as you go. Always know where your money went.",
  },
  {
    Icon: Users,
    accent: "#8B5CF6",
    title: "Return & remember",
    desc: "All visited places, completed tasks, and total spend. Your trip, fully documented.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p
            className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: "#F59E0B" }}
          >
            <ChevronRight size={12} />
            How it works
          </p>
          <h2
            className="text-4xl font-black leading-tight"
            style={{ color: "#F8F6F1", letterSpacing: "-0.03em" }}
          >
            Up and running
            <br />
            <span style={{ color: "rgba(248,246,241,0.35)" }}>in four steps.</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ Icon, accent, title, desc }, i) => (
            <div key={title} className="relative">
              {i < STEPS.length - 1 && (
                <div
                  className="absolute -right-2 top-6 z-10 hidden lg:block"
                  style={{ color: "rgba(255,255,255,0.1)" }}
                >
                  <ArrowRight size={16} />
                </div>
              )}
              <div
                className="rounded-3xl p-6"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ background: `${accent}18` }}
                >
                  <Icon size={20} style={{ color: accent }} />
                </div>
                <div
                  className="mb-2 text-xs font-black"
                  style={{ color: "rgba(255,255,255,0.18)", letterSpacing: "0.08em" }}
                >
                  0{i + 1}
                </div>
                <h3 className="mb-2 font-bold" style={{ color: "#F8F6F1" }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(248,246,241,0.45)" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}