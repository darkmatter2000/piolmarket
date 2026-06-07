"use client";

import { cn } from "@/lib/utils";

interface TickerItem {
  name: string;
  value: string;
  changePct: number;
}

const TICKER_ITEMS: TickerItem[] = [
  { name: "DOUALA · IDX", value: "454k FCFA/m²", changePct: 2.0 },
  { name: "BONAPRISO", value: "5 200 FCFA/m²", changePct: 4.1 },
  { name: "AKWA", value: "5 800 FCFA/m²", changePct: 1.9 },
  { name: "BONANJO", value: "6 100 FCFA/m²", changePct: 3.2 },
  { name: "MAKEPE", value: "3 900 FCFA/m²", changePct: 2.1 },
  { name: "YAOUNDÉ · IDX", value: "412k FCFA/m²", changePct: 1.6 },
  { name: "BASTOS", value: "7 200 FCFA/m²", changePct: 2.8 },
  { name: "KRIBI · IDX", value: "298k FCFA/m²", changePct: 6.4 },
  { name: "LOGPOM", value: "2 800 FCFA/m²", changePct: -0.5 },
  { name: "MVAN", value: "2 400 FCFA/m²", changePct: -0.3 },
];

function TickerEntry({ item }: { item: TickerItem }) {
  const positive = item.changePct >= 0;
  return (
    <div className="flex items-center gap-3 px-6 py-3 whitespace-nowrap">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {item.name}
      </span>
      <span className="text-sm font-semibold text-white">{item.value}</span>
      <span
        className={cn(
          "rounded-full px-2 py-0.5 text-xs font-bold",
          positive ? "text-emerald-400" : "text-red-400"
        )}
      >
        {positive ? "▲" : "▼"} {positive ? "+" : ""}
        {item.changePct.toFixed(1)}%
      </span>
    </div>
  );
}

export default function MarketTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D1829]">
      <div className="flex animate-ticker">
        {items.map((item, index) => (
          <TickerEntry key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}
