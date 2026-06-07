import { AlertTriangle, Bell, Search, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = ["Dashboard", "Publier", "Anti-arnaque", "Engine Room"];

export default function DashboardHeader() {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="section-container flex flex-col gap-4 py-4">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-slate-500 font-semibold">Observatoire</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">IMMOBILIER CAMEROUNAIS</div>
            </div>
            <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              v0.14
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1 rounded-full bg-slate-100 p-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150",
                  tab === "Dashboard"
                    ? "bg-slate-950 text-white shadow-sm shadow-slate-200/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-between sm:justify-end">
            <div className="relative w-full max-w-xs">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                aria-label="Rechercher"
                placeholder="Rechercher..."
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald/50 focus:ring-2 focus:ring-emerald/10"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <Bell size={20} />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-700 hover:bg-slate-50"
            >
              <UserCircle size={20} />
              <span className="text-sm font-semibold">Admin</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-600">
            Observatoire &gt; Dashboard B2B &gt; Marché — vue agrégée
          </p>
          <span className="inline-flex items-center rounded-full bg-slate-900/5 px-3 py-1.5 text-sm font-semibold text-slate-700">
            Plan Pro · 5 sièges
          </span>
        </div>

        <div className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-slate-800">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm leading-6">
              ⚠ Prix demandés, et non prix de transaction effectifs. Source : annonces publiques + contributions directes · révisions hebdomadaires.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm shadow-slate-200/80">
                FCFA
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm shadow-slate-200/80">
                Indice base 100
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
