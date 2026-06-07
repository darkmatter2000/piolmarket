import { cn } from "@/lib/utils";

interface KpiCard {
  id: string;
  label: string;
  value: string;
  deltaLabel: string;
  deltaPositive: boolean;
  info: string;
  sparkline: number[];
}

const KPI_CARDS: KpiCard[] = [
  {
    id: "price-index",
    label: "INDICE PRIX DEMANDÉS / M²",
    value: "454 k FCFA",
    deltaLabel: "+2.0% vs trimestre précédent",
    deltaPositive: true,
    info: "n=1919 annonces · σ=82k",
    sparkline: [14, 18, 22, 25, 28, 31, 34],
  },
  {
    id: "studio-rent",
    label: "LOYER DEMANDÉ — STUDIO",
    value: "121 k FCFA/mois",
    deltaLabel: "+1.4% vs trimestre précédent",
    deltaPositive: true,
    info: "Médiane: 112k · P90: 176k",
    sparkline: [18, 20, 19, 22, 24, 23, 25],
  },
  {
    id: "market-trend",
    label: "TENDANCE MARCHÉ",
    value: "Stable+",
    deltaLabel: "+2.0% indice composite 12 mois",
    deltaPositive: true,
    info: "Vélocité: modérée · stock: équilibré",
    sparkline: [22, 22, 23, 23, 24, 24, 25],
  },
  {
    id: "listings-24h",
    label: "ANNONCES / 24H",
    value: "154 nouvelles",
    deltaLabel: "+12.4% vs 24h précédente",
    deltaPositive: true,
    info: "48 supprimées · 31 modifiées · 5 sources actives · taux dédup: 94%",
    sparkline: [12, 16, 21, 20, 23, 28, 34],
  },
];

function sparklinePath(points: number[]) {
  const width = 100;
  const height = 32;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const delta = max - min || 1;

  return points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / delta) * (height - 6) - 3;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function Sparkline({ points, color }: { points: number[]; color: string }) {
  return (
    <svg viewBox="0 0 100 36" className="h-10 w-full overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={sparklinePath(points)}
      />
    </svg>
  );
}

export default function KpiCards() {
  return (
    <section className="grid gap-4 xl:grid-cols-4">
      {KPI_CARDS.map((card) => (
        <article
          key={card.id}
          className="rounded-2xl border border-white/10 bg-[#0D1829] p-6"
        >
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              {card.label}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              {card.value}
            </h2>
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-semibold",
                card.deltaPositive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              )}
            >
              {card.deltaLabel}
            </span>
          </div>

          <div className="mb-5 rounded-2xl bg-white/[0.03] p-3">
            <Sparkline points={card.sparkline} color={card.deltaPositive ? "#00C48C" : "#EF4444"} />
          </div>

          <p className="text-sm text-slate-400">{card.info}</p>
        </article>
      ))}
    </section>
  );
}
