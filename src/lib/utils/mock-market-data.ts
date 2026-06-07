import type { City, ListingType } from "@/lib/types";

// ============================================
// Mock 24-month price history — will be replaced
// by aggregated queries on `price_snapshots`
// ============================================

export interface MonthlyPoint {
  month: string; // "2024-01"
  label: string; // "Jan 24"
  median_sqm: number;
  sample_count: number;
}

export interface NeighborhoodMarket {
  name: string;
  median_sqm: number;
  change_pct: number;
}

export interface CityMarket {
  label: string;
  median_sqm: number;
  change_pct: number;
  sample_count: number;
  neighborhoods: NeighborhoodMarket[];
  history: MonthlyPoint[];
}

const MONTH_LABELS = [
  "Janv", "Fév", "Mars", "Avr", "Mai", "Juin",
  "Juil", "Août", "Sept", "Oct", "Nov", "Déc",
];

function buildHistory(baseValue: number, monthlyDriftPct: number, baseCount: number): MonthlyPoint[] {
  const points: MonthlyPoint[] = [];
  const now = new Date();
  let value = baseValue / Math.pow(1 + monthlyDriftPct / 100, 24);

  for (let i = 24; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    // gentle upward drift + small seasonal noise so the curve isn't a straight line
    const noise = Math.sin(i / 3) * 0.012 + (((i * 53) % 7) - 3) * 0.004;
    value = value * (1 + monthlyDriftPct / 100 + noise);

    points.push({
      month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: `${MONTH_LABELS[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`,
      median_sqm: Math.round(value),
      sample_count: Math.round(baseCount * (0.6 + (24 - i) / 24 * 0.5)),
    });
  }
  return points;
}

function buildCity(
  label: string,
  baseValue: number,
  monthlyDriftPct: number,
  sampleCount: number,
  neighborhoods: { name: string; median_sqm: number; change_pct: number }[]
): CityMarket {
  return {
    label,
    median_sqm: baseValue,
    change_pct: monthlyDriftPct,
    sample_count: sampleCount,
    neighborhoods,
    history: buildHistory(baseValue, monthlyDriftPct, sampleCount),
  };
}

export const MARKET_HISTORY: Record<ListingType, Record<City, CityMarket>> = {
  rental: {
    douala: buildCity("Douala", 4200, 0.45, 1842, [
      { name: "Bonanjo", median_sqm: 6100, change_pct: 3.2 },
      { name: "Akwa", median_sqm: 5800, change_pct: 1.9 },
      { name: "Bonapriso", median_sqm: 5200, change_pct: 4.1 },
      { name: "Makepe", median_sqm: 3900, change_pct: 2.1 },
      { name: "Ndokoti", median_sqm: 3100, change_pct: 0.6 },
      { name: "Logpom", median_sqm: 2800, change_pct: -0.5 },
    ]),
    yaounde: buildCity("Yaoundé", 3800, 0.38, 1210, [
      { name: "Bastos", median_sqm: 7200, change_pct: 2.8 },
      { name: "Omnisport", median_sqm: 4800, change_pct: 1.5 },
      { name: "Biyem-Assi", median_sqm: 3900, change_pct: 1.2 },
      { name: "Nlongkak", median_sqm: 3600, change_pct: 0.9 },
      { name: "Mvan", median_sqm: 2400, change_pct: -0.3 },
    ]),
    kribi: buildCity("Kribi", 2900, 0.95, 312, [
      { name: "Plage", median_sqm: 5200, change_pct: 8.1 },
      { name: "Centre-ville", median_sqm: 3800, change_pct: 6.2 },
    ]),
  },
  sale: {
    douala: buildCity("Douala", 420000, 0.28, 964, [
      { name: "Bonanjo", median_sqm: 680000, change_pct: 2.1 },
      { name: "Akwa", median_sqm: 590000, change_pct: 0.8 },
      { name: "Bonapriso", median_sqm: 540000, change_pct: 1.2 },
      { name: "Makepe", median_sqm: 380000, change_pct: 3.5 },
      { name: "Ndokoti", median_sqm: 310000, change_pct: 1.8 },
      { name: "Logpom", median_sqm: 280000, change_pct: -1.1 },
    ]),
    yaounde: buildCity("Yaoundé", 390000, 0.22, 680, [
      { name: "Bastos", median_sqm: 920000, change_pct: 1.4 },
      { name: "Omnisport", median_sqm: 580000, change_pct: 0.7 },
      { name: "Biyem-Assi", median_sqm: 410000, change_pct: 1.6 },
      { name: "Nlongkak", median_sqm: 360000, change_pct: 1.1 },
      { name: "Mvan", median_sqm: 240000, change_pct: -0.8 },
    ]),
    kribi: buildCity("Kribi", 210000, 1.1, 198, [
      { name: "Plage", median_sqm: 420000, change_pct: 9.2 },
      { name: "Centre-ville", median_sqm: 280000, change_pct: 5.8 },
    ]),
  },
};
