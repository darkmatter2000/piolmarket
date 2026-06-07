"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const CITIES = ["Douala", "Yaoundé", "Kribi", "Bafoussam", "Limbé"] as const;
const NEIGHBORHOODS = [
  { id: "all", label: "Tous", count: 1919 },
  { id: "bonapriso", label: "Bonapriso", count: 231 },
  { id: "akwa", label: "Akwa", count: 370 },
  { id: "bonanjo", label: "Bonanjo", count: 132 },
  { id: "bali", label: "Bali", count: 164 },
  { id: "makepe", label: "Makepe", count: 280 },
  { id: "bonamoussadi", label: "Bonamoussadi", count: 332 },
  { id: "logpom", label: "Logpom", count: 174 },
  { id: "deido", label: "Deido", count: 236 },
] as const;

type City = (typeof CITIES)[number];
type Neighborhood = (typeof NEIGHBORHOODS)[number];

export default function CityFilter() {
  const [activeCity, setActiveCity] = useState<City>("Douala");
  const [activeNeighborhood, setActiveNeighborhood] = useState<Neighborhood["id"]>("all");

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0D1829] p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Ville
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {CITIES.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setActiveCity(city)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition",
                    activeCity === city
                      ? "bg-emerald-500 text-[#070E1A] shadow-sm shadow-emerald-500/20"
                      : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-3 text-sm text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse-slow" />
            <span className="font-semibold text-slate-200">LIVE</span>
            <span>maj. il y a 47 s · 1 919 annonces actives</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {NEIGHBORHOODS.map((neighborhood) => (
              <button
                key={neighborhood.id}
                type="button"
                onClick={() => setActiveNeighborhood(neighborhood.id)}
                className={cn(
                  "rounded-full border px-3 py-2 text-sm font-medium transition",
                  activeNeighborhood === neighborhood.id
                    ? "bg-emerald-500 text-[#070E1A] border-emerald-500"
                    : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white"
                )}
              >
                {neighborhood.label}
                {neighborhood.id !== "all" ? ` ${neighborhood.count}` : ""}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
