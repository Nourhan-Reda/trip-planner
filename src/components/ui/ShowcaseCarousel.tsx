"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Images,
  LayoutDashboard,
  MapPin,
  Wallet,
} from "lucide-react";

const AUTOPLAY_MS = 6000;

const SLIDES = [
  {
    tag: "Place tracking",
    title: "Pin every spot on your map",
    description:
      "Save restaurants, landmarks, and hidden gems — mark them visited as you explore each city.",
    image:
      "https://i.pinimg.com/736x/8e/87/d6/8e87d68bf73e1ea9a510cfe60a9c29a8.jpg",
    Icon: MapPin,
    accent: "#3B82F6",
    cta: "Start pinning places",
    href: "/trips/create",
  },
  {
    tag: "Budget management",
    title: "Know exactly where your money goes",
    description:
      "Log expenses by category in real time and stay on track against your trip budget.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80",
    Icon: Wallet,
    accent: "#F59E0B",
    cta: "Track your budget",
    href: "/trips/create",
  },
  {
    tag: "Smart todos",
    title: "Never forget a pre-trip task",
    description:
      "Visa applications, packing lists, reservations — a per-trip checklist that keeps you organized.",
    image:
      "https://i.pinimg.com/1200x/c2/d9/45/c2d945b1055a5cfcb43de82140a15957.jpg",
    Icon: CheckSquare,
    accent: "#10B981",
    cta: "Build your checklist",
    href: "/trips/create",
  },
  {
    tag: "Multi-trip workspace",
    title: "All your adventures in one place",
    description:
      "Past, present, and future trips — organized in a calm dashboard built for travelers.",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80",
    Icon: LayoutDashboard,
    accent: "#8B5CF6",
    cta: "Open dashboard",
    href: "/trips",
  },
] as const;

export default function ShowcaseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + SLIDES.length) % SLIDES.length);
  }, []);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const slide = SLIDES[activeIndex];
  const SlideIcon = slide.Icon;

  return (
    <section id="showcase" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p
            className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: "#F59E0B" }}
          >
            <Images size={12} />
            Trip showcase
          </p>
          <h2
            className="text-4xl font-black leading-tight"
            style={{ color: "#F8F6F1", letterSpacing: "-0.03em" }}
          >
            Plan smarter,
            <br />
            <span style={{ color: "rgba(248,246,241,0.35)" }}>
              travel with confidence.
            </span>
          </h2>
        </div>

        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="grid md:grid-cols-2">
            {/* Image panel */}
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[420px]">
              {SLIDES.map((item, index) => (
                <img
                  key={item.tag}
                  src={item.image}
                  alt=""
                  aria-hidden={index !== activeIndex}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
                  style={{ opacity: index === activeIndex ? 1 : 0 }}
                />
              ))}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, transparent 40%, rgba(10,15,30,0.85) 100%)",
                }}
              />
              <div
                className="absolute left-5 top-5 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold"
                style={{
                  background: `${slide.accent}22`,
                  color: slide.accent,
                  border: `1px solid ${slide.accent}44`,
                }}
              >
                <SlideIcon size={12} />
                {slide.tag}
              </div>
            </div>

            {/* Content panel */}
            <div className="flex flex-col justify-center p-8 md:p-10">
              <div key={activeIndex} className="transition-opacity duration-500">
                <h3
                  className="mb-4 text-2xl font-black leading-tight md:text-3xl"
                  style={{ color: "#F8F6F1", letterSpacing: "-0.02em" }}
                >
                  {slide.title}
                </h3>
                <p
                  className="mb-8 text-sm leading-relaxed md:text-base"
                  style={{ color: "rgba(248,246,241,0.5)" }}
                >
                  {slide.description}
                </p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-90"
                  style={{ background: slide.accent, color: "#0A0F1E" }}
                >
                  {slide.cta}
                  <ChevronRight size={16} />
                </Link>
              </div>

              {/* Controls */}
              <div className="mt-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {SLIDES.map((item, index) => (
                    <button
                      key={item.tag}
                      type="button"
                      aria-label={`Go to slide ${index + 1}: ${item.title}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                      onClick={() => goTo(index)}
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: index === activeIndex ? 24 : 8,
                        background:
                          index === activeIndex
                            ? "#F59E0B"
                            : "rgba(255,255,255,0.15)",
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous slide"
                    onClick={goPrev}
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-white/10"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(248,246,241,0.7)",
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next slide"
                    onClick={goNext}
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-white/10"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(248,246,241,0.7)",
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
