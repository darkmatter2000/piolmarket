import { Bell, Search, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = ["Dashboard", "Publier", "Anti-arnaque", "Engine Room"];

export default function DashboardHeader() {
  return (
    <div className="border-b border-white/10 bg-[#0D1829]">
      <div className="section-container flex flex-col gap-4 py-4">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-slate-500 font-semibold">Observatoire</div>
              <div className="mt-1 text-sm font-semibold text-white">IMMOBILIER CAMEROUNAIS</div>
            </div>
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
              v0.14
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1 rounded-full bg-white/5 p-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150",
                  tab === "Dashboard"
                    ? "bg-emerald-500 text-[#070E1A] shadow-sm shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-between sm:justify-end">
            <div className="relative w-full max-w-xs">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                aria-label="Rechercher"
                placeholder="Rechercher..."
                className="w-full rounded-3xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <Bell size={20} />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300 hover:bg-white/10"
            >
              <UserCircle size={20} />
              <span className="text-sm font-semibold">Admin</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-400">
            Observatoire &gt; Dashboard B2B &gt; Marché — vue agrégée
          </p>
          <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1.5 text-sm font-semibold text-slate-300">
            Plan Pro · 5 sièges
          </span>
        </div>

        <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 px-5 py-4 text-slate-300">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm leading-6">
              ⚠ Prix demandés, et non prix de transaction effectifs. Source : annonces publiques + contributions directes · révisions hebdomadaires.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                FCFA
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                Indice base 100
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
