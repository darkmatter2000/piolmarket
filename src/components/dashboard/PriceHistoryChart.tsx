"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { formatPrice } from "@/lib/utils";
import type { MonthlyPoint } from "@/lib/utils/mock-market-data";

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const point: MonthlyPoint = payload[0].payload;
  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-xs shadow-xl">
      <div className="text-gray-400 mb-1">{label}</div>
      <div className="text-white font-semibold">{formatPrice(point.median_sqm, "XAF", true)}/m²</div>
      <div className="text-gray-500">{point.sample_count.toLocaleString("fr-FR")} annonces</div>
    </div>
  );
}

export function PriceHistoryChart({
  data,
  color = "#00C48C",
}: {
  data: MonthlyPoint[];
  color?: string;
}) {
  const gradientId = `priceGradient-${color.replace("#", "")}`;

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.35} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1A2638" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "#64748B", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "#1A2638" }}
            interval={3}
          />
          <YAxis
            tick={{ fill: "#64748B", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatPrice(v, "XAF", true)}
            width={70}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="median_sqm"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
