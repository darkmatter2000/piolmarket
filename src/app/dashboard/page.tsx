import CityFilter from "@/components/dashboard/CityFilter";
import KpiCards from "@/components/dashboard/KpiCards";
import MarketTicker from "@/components/dashboard/MarketTicker";
import NeighborhoodWatchlist from "@/components/dashboard/NeighborhoodWatchlist";
import { PriceHistoryChart } from "@/components/dashboard/PriceHistoryChart";
import { MARKET_HISTORY } from "@/lib/utils/mock-market-data";

export default function DashboardPage() {
  const douala = MARKET_HISTORY.sale.douala;

  return (
    <div className="min-h-screen bg-[#070E1A] py-10 text-slate-200">
      <div className="section-container">
        <div className="mx-auto max-w-6xl space-y-6">
          <MarketTicker />

          <div className="rounded-2xl border border-white/10 bg-[#0D1829] p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">
                  Terminal Marché · B2B
                </p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Vue agrégée du marché immobilier camerounais
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                  Indices de prix demandés, watchlist par quartier et historique de tendance — pensé comme un terminal de marché pour piloter la stratégie d'acquisition et de pricing.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-slate-400">
                Données mockées · Indice base 100 · Prix demandés (non transactionnels)
              </div>
            </div>
          </div>

          <CityFilter />

          <KpiCards />

          <section className="rounded-2xl border border-white/10 bg-[#0D1829] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                Indice prix demandés / m² — {douala.label} (vente)
              </h2>
              <span
                className={
                  douala.change_pct >= 0
                    ? "rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400"
                    : "rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400"
                }
              >
                {douala.change_pct >= 0 ? "▲" : "▼"} {douala.change_pct >= 0 ? "+" : ""}
                {douala.change_pct.toFixed(2)}% / mois
              </span>
            </div>
            <PriceHistoryChart data={douala.history} color="#00C48C" />
          </section>

          <NeighborhoodWatchlist />
        </div>
      </div>
    </div>
  );
}
