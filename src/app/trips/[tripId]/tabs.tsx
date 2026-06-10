"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MapPin, Wallet, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function TripNavTabs({ tripId }: { tripId: string }) {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Overview",
      href: `/trips/${tripId}`,
      icon: LayoutDashboard,
      active: pathname === `/trips/${tripId}`,
    },
    {
      name: "Places",
      href: `/trips/${tripId}/places`,
      icon: MapPin,
      active: pathname === `/trips/${tripId}/places`,
    },
    {
      name: "Budget",
      href: `/trips/${tripId}/budget`,
      icon: Wallet,
      active: pathname === `/trips/${tripId}/budget`,
    },
    {
      name: "Todos",
      href: `/trips/${tripId}/todos`,
      icon: CheckSquare,
      active: pathname === `/trips/${tripId}/todos`,
    },
  ];

  return (
    <div className="flex border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={cn(
              "flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-all duration-200",
              tab.active
                ? "border-amber-500 text-amber-500"
                : "border-transparent text-slate-400 hover:text-slate-200"
            )}
          >
            <Icon size={15} />
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
