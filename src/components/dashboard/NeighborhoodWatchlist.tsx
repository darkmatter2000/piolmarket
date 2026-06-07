"use client";

import { useState } from "react";
import { cn, formatPrice } from "@/lib/utils";

interface WatchRow {
  name: string;
  city: string;
  medianSqm: number;
  change24h: number;
  change7d: number;
  change30d: number;
  listings: number;
}

const ROWS: WatchRow[] = [
  { name: "Bonanjo", city: "Douala", medianSqm: 6100, change24h: 0.4, change7d: 1.8, change30d: 3.2, listings: 132 },
  { name: "Akwa", city: "Douala", medianSqm: 5800, change24h: -0.2, change7d: 0.9, change30d: 1.9, listings: 370 },
  { name: "Bonapriso", city: "Douala", medianSqm: 5200, change24h: 0.9, change7d: 2.4, change30d: 4.1, listings: 231 },
  { name: "Makepe", city: "Douala", medianSqm: 3900, change24h: 0.3, change7d: 1.1, change30d: 2.1, listings: 280 },
  { name: "Bonamoussadi", city: "Douala", medianSqm: 3400, change24h: -0.1, change7d: 0.5, change30d: 1.4, listings: 332 },
  { name: "Logpom", city: "Douala", medianSqm: 2800, change24h: -0.6, change7d: -1.2, change30d: -0.5, listings: 174 },
  { name: "Bastos", city: "Yaoundé", medianSqm: 7200, change24h: 0.6, change7d: 1.6, change30d: 2.8, listings: 96 },
  { name: "Omnisport", city: "Yaoundé", medianSqm: 4800, change24h: 0.2, change7d: 0.8, change30d: 1.5, listings: 121 },
  { name: "Mvan", city: "Yaoundé", medianSqm: 2400, change24h: -0.3, change7d: -0.4, change30d: -0.3, listings: 88 },
  { name: "Plage", city: "Kribi", medianSqm: 5200, change24h: 1.4, change7d: 4.0, change30d: 8.1, listings: 54 },
];

type SortKey = "medianSqm" | "change24h" | "change7d" | "change30d" | "listings";

function ChangeBadge({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold tabular-nums",
        positive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
      )}
    >
      {positive ? "▲" : "▼"} {positive ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

export default function NeighborhoodWatchlist() {
  const [sortKey, setSortKey] = useState<SortKey>("change30d");
  const [sortDesc, setSortDesc] = useState(true);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDesc((d) => !d);
    } else {
      setSortKey(key);
      setSortDesc(true);
    }
  }

  const rows = [...ROWS].sort((a, b) => {
    const diff = a[sortKey] - b[sortKey];
    return sortDesc ? -diff : diff;
  });

  const columns: { key: SortKey; label: string }[] = [
    { key: "medianSqm", label: "Prix médian / m²" },
    { key: "change24h", label: "24h" },
    { key: "change7d", label: "7j" },
    { key: "change30d", label: "30j" },
    { key: "listings", label: "Annonces actives" },
  ];

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0D1829] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
          Watchlist · Quartiers
        </h2>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-slow" />
          Indice base 100 · prix demandés
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
              <th className="py-3 pr-4 font-semibold">Quartier</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="cursor-pointer select-none py-3 pr-4 font-semibold transition hover:text-slate-300"
                  onClick={() => toggleSort(col.key)}
                >
                  {col.label}
                  {sortKey === col.key ? (sortDesc ? " ↓" : " ↑") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.name}
                className="border-b border-white/5 text-slate-200 transition hover:bg-white/[0.03]"
              >
                <td className="py-3 pr-4">
                  <div className="font-semibold text-white">{row.name}</div>
                  <div className="text-xs text-slate-500">{row.city}</div>
                </td>
                <td className="py-3 pr-4 font-semibold tabular-nums text-white">
                  {formatPrice(row.medianSqm, "XAF", true)}
                </td>
                <td className="py-3 pr-4">
                  <ChangeBadge value={row.change24h} />
                </td>
                <td className="py-3 pr-4">
                  <ChangeBadge value={row.change7d} />
                </td>
                <td className="py-3 pr-4">
                  <ChangeBadge value={row.change30d} />
                </td>
                <td className="py-3 pr-4 tabular-nums text-slate-300">{row.listings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
