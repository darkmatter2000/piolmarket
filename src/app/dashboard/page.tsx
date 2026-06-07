import { TrendingUp, TrendingDown, Minus, BarChart3, Info } from "lucide-react";
import { cn, formatPrice, getTrendColor, getTrendLabel } from "@/lib/utils";

// Mock market data — will come from Supabase price_snapshots
const MARKET_DATA = {
  douala: {
    label: "Douala",
    rental: {
      median_sqm: 4200,
      change_pct: 2.8,
      sample_count: 1842,
      neighborhoods: [
        { name: "Bonanjo", median_sqm: 6100, change_pct: 3.2 },
        { name: "Akwa", median_sqm: 5800, change_pct: 1.9 },
        { name: "Makepe", median_sqm: 3900, change_pct: 2.1 },
        { name: "Bonapriso", median_sqm: 5200, change_pct: 4.1 },
        { name: "Logpom", median_sqm: 2800, change_pct: -0.5 },
      ],
    },
    sale: {
      median_sqm: 420000,
      change_pct: 1.4,
      sample_count: 964,
      neighborhoods: [
        { name: "Bonanjo", median_sqm: 680000, change_pct: 2.1 },
        { name: "Akwa", median_sqm: 590000, change_pct: 0.8 },
        { name: "Makepe", median_sqm: 380000, change_pct: 3.5 },
        { name: "Bonapriso", median_sqm: 540000, change_pct: 1.2 },
        { name: "Logpom", median_sqm: 280000, change_pct: -1.1 },
      ],
    },
  },
  yaounde: {
    label: "Yaoundé",
    rental: {
      median_sqm: 3800,
      change_pct: 1.6,
      sample_count: 1210,
      neighborhoods: [
        { name: "Bastos", median_sqm: 7200, change_pct: 2.8 },
        { name: "Omnisport", median_sqm: 4800, change_pct: 1.5 },
        { name: "Nlongkak", median_sqm: 3600, change_pct: 0.9 },
        { name: "Mvan", median_sqm: 2400, change_pct: -0.3 },
      ],
    },
    sale: {
      median_sqm: 390000,
      change_pct: 0.9,
      sample_count: 680,
      neighborhoods: [
        { name: "Bastos", median_sqm: 920000, change_pct: 1.4 },
        { name: "Omnisport", median_sqm: 580000, change_pct: 0.7 },
        { name: "Nlongkak", median_sqm: 360000, change_pct: 1.1 },
        { name: "Mvan", median_sqm: 240000, change_pct: -0.8 },
      ],
    },
  },
  kribi: {
    label: "Kribi",
    rental: {
      median_sqm: 2900,
      change_pct: 5.8,
      sample_count: 312,
      neighborhoods: [
        { name: "Centre-ville", median_sqm: 3800, change_pct: 6.2 },
        { name: "Plage", median_sqm: 5200, change_pct: 8.1 },
      ],
    },
    sale: {
      median_sqm: 210000,
      change_pct: 6.1,
      sample_count: 198,
      neighborhoods: [
        { name: "Centre-ville", median_sqm: 280000, change_pct: 5.8 },
        { name: "Plage", median_sqm: 420000, change_pct: 9.2 },
      ],
    },
  },
};

function TrendIcon({ pct }: { pct: number }) {
  if (pct > 1) return <TrendingUp size={14} className="text-emerald" />;
  if (pct < -1) return <TrendingDown size={14} className="text-red-400" />;
  return <Minus size={14} className="text-amber-400" />;
}

function NeighborhoodRow({
  name,
  median_sqm,
  change_pct,
  isRental,
  maxVal,
}: {
  name: string;
  median_sqm: number;
  change_pct: number;
  isRental: boolean;
  maxVal: number;
}) {
  const barWidth = Math.round((median_sqm / maxVal) * 100);
  return (
    <div className="flex items-center gap-4 py-2.5 border-b border-dark-border/40 last:border-0">
      <span className="text-sm text-gray-300 w-32 shrink-0">{name}</span>
      <div className="flex-1 relative h-2 bg-dark-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald/60 to-emerald rounded-full transition-all"
          style={{ width: `${barWidth}%` }}
        />
      </div>
      <span className="text-sm font-medium text-white w-36 text-right shrink-0">
        {formatPrice(median_sqm, "XAF", true)}/m²
        {isRental && <span className="text-gray-500 text-xs">/mois</span>}
      </span>
      <span className={cn("text-xs font-medium w-16 text-right shrink-0 flex items-center justify-end gap-1", getTrendColor(change_pct))}>
        <TrendIcon pct={change_pct} />
        {getTrendLabel(change_pct)}
      </span>
    </div>
  );
}

export const metadata = {
  title: "Indices de prix — MoneyPiol",
  description: "Indices de prix immobiliers demandés pour Douala, Yaoundé et Kribi.",
};

export default function DashboardPage() {
  return (
    <div className="bg-dark-bg min-h-screen">
      {/* Header */}
      <div className="border-b border-dark-border/40 py-8">
        <div className="section-container">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-syne text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <BarChart3 size={28} className="text-emerald" />
                Indices de Prix
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Prix demandés médians — mis à jour en continu
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-amber-400 bg-amber/8 border border-amber/20 px-3 py-2 rounded-lg">
              <Info size={14} />
              Prix demandés, pas de transaction
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-8 space-y-8">
        {/* City sections */}
        {Object.entries(MARKET_DATA).map(([cityKey, cityData]) => (
          <div key={cityKey} className="space-y-5">
            {/* City header */}
            <div className="flex items-center gap-3">
              <h2 className="font-syne text-xl font-bold">{cityData.label}</h2>
              <div className="h-px flex-1 bg-dark-border" />
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Rental */}
              <div className="card p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="badge-indigo text-xs">Location</span>
                    <div className="mt-2">
                      <div className="font-syne text-2xl font-bold text-white">
                        {formatPrice(cityData.rental.median_sqm, "XAF", true)}/m²
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5">médiane mensuelle</div>
                    </div>
                  </div>
                  <div className={cn("flex items-center gap-1 text-sm font-semibold", getTrendColor(cityData.rental.change_pct))}>
                    <TrendIcon pct={cityData.rental.change_pct} />
                    {getTrendLabel(cityData.rental.change_pct)} / mois
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  Basé sur {cityData.rental.sample_count.toLocaleString("fr-FR")} annonces
                </div>

                {/* Neighborhoods */}
                <div className="mt-4 pt-4 border-t border-dark-border">
                  <div className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Par quartier</div>
                  {cityData.rental.neighborhoods.map((n) => {
                    const maxVal = Math.max(...cityData.rental.neighborhoods.map((x) => x.median_sqm));
                    return (
                      <NeighborhoodRow
                        key={n.name}
                        name={n.name}
                        median_sqm={n.median_sqm}
                        change_pct={n.change_pct}
                        isRental={true}
                        maxVal={maxVal}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Sale */}
              <div className="card p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="badge-amber text-xs">Vente</span>
                    <div className="mt-2">
                      <div className="font-syne text-2xl font-bold text-white">
                        {formatPrice(cityData.sale.median_sqm, "XAF", true)}/m²
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5">médiane de vente</div>
                    </div>
                  </div>
                  <div className={cn("flex items-center gap-1 text-sm font-semibold", getTrendColor(cityData.sale.change_pct))}>
                    <TrendIcon pct={cityData.sale.change_pct} />
                    {getTrendLabel(cityData.sale.change_pct)} / mois
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  Basé sur {cityData.sale.sample_count.toLocaleString("fr-FR")} annonces
                </div>

                {/* Neighborhoods */}
                <div className="mt-4 pt-4 border-t border-dark-border">
                  <div className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Par quartier</div>
                  {cityData.sale.neighborhoods.map((n) => {
                    const maxVal = Math.max(...cityData.sale.neighborhoods.map((x) => x.median_sqm));
                    return (
                      <NeighborhoodRow
                        key={n.name}
                        name={n.name}
                        median_sqm={n.median_sqm}
                        change_pct={n.change_pct}
                        isRental={false}
                        maxVal={maxVal}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Disclaimer */}
        <div className="card p-4 flex items-start gap-3 border-amber/20 bg-amber/5">
          <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-400 leading-relaxed">
            <strong className="text-amber-400">Données de prix demandés.</strong> Les indices affichés
            reflètent les prix demandés dans les annonces immobilières collectées, et non les prix
            effectifs de transaction. Ces données sont fournies à titre indicatif pour suivre les
            tendances relatives du marché. MoneyPiol n&apos;est pas un conseiller financier ou immobilier.
          </p>
        </div>
      </div>
    </div>
  );
}
