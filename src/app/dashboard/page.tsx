"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, BarChart3, Info } from "lucide-react";
import { cn, formatPrice, getTrendColor, getTrendLabel, CITY_LABELS } from "@/lib/utils";
import { MARKET_HISTORY } from "@/lib/utils/mock-market-data";
import { PriceHistoryChart } from "@/components/dashboard/PriceHistoryChart";
import type { City, ListingType } from "@/lib/types";

const CITIES: City[] = ["douala", "yaounde", "kribi"];

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

export default function DashboardPage() {
  const [listingType, setListingType] = useState<ListingType>("rental");
  const [activeCity, setActiveCity] = useState<City>("douala");

  const isRental = listingType === "rental";
  const cityData = MARKET_HISTORY[listingType][activeCity];
  const maxVal = Math.max(...cityData.neighborhoods.map((n) => n.median_sqm));

  return (
    <div className="bg-dark-bg min-h-screen">
      {/* Header */}
      <div className="border-b border-dark-border/40 py-8">
        <div className="section-container">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-syne text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <BarChart3 size={28} className="text-emerald" />
                Indices de Prix
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Prix demandés médians — évolution sur 24 mois
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-amber-400 bg-amber/8 border border-amber/20 px-3 py-2 rounded-lg">
              <Info size={14} />
              Prix demandés, pas de transaction
            </div>
          </div>

          {/* Filters: listing type + city */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <div className="inline-flex rounded-lg border border-dark-border bg-dark-surface p-1">
              {(["rental", "sale"] as ListingType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setListingType(type)}
                  className={cn(
                    "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                    listingType === type
                      ? "bg-emerald/15 text-emerald"
                      : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  {type === "rental" ? "Location" : "Vente"}
                </button>
              ))}
            </div>

            <div className="inline-flex rounded-lg border border-dark-border bg-dark-surface p-1">
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={cn(
                    "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                    activeCity === city
                      ? "bg-indigo/15 text-indigo-300"
                      : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  {CITY_LABELS[city]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-8 space-y-8">
        {/* Summary + chart for active city/type */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* KPI summary card */}
            <div className="card p-5 lg:col-span-1">
              <span className={isRental ? "badge-indigo text-xs" : "badge-amber text-xs"}>
                {isRental ? "Location" : "Vente"} — {cityData.label}
              </span>
              <div className="mt-3">
                <div className="font-syne text-3xl font-bold text-white">
                  {formatPrice(cityData.median_sqm, "XAF", true)}/m²
                </div>
                <div className="text-gray-500 text-xs mt-0.5">
                  médiane {isRental ? "mensuelle" : "de vente"}
                </div>
              </div>
              <div className={cn("flex items-center gap-1 text-sm font-semibold mt-3", getTrendColor(cityData.change_pct))}>
                <TrendIcon pct={cityData.change_pct} />
                {getTrendLabel(cityData.change_pct)} / mois
              </div>
              <div className="text-xs text-gray-600 mt-3 pt-3 border-t border-dark-border">
                Basé sur {cityData.sample_count.toLocaleString("fr-FR")} annonces actives
              </div>
            </div>

            {/* 24-month evolution chart */}
            <div className="card p-5 lg:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Évolution sur 24 mois — prix médian au m²
                </div>
                <span className="text-xs text-gray-600">{cityData.label} · {isRental ? "Location" : "Vente"}</span>
              </div>
              <PriceHistoryChart data={cityData.history} color={isRental ? "#5B21FE" : "#FF6B35"} />
            </div>
          </div>

          {/* Neighborhood breakdown */}
          <div className="card p-5">
            <div className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
              Par quartier — {cityData.label}
            </div>
            {cityData.neighborhoods.map((n) => (
              <NeighborhoodRow
                key={n.name}
                name={n.name}
                median_sqm={n.median_sqm}
                change_pct={n.change_pct}
                isRental={isRental}
                maxVal={maxVal}
              />
            ))}
          </div>
        </div>

        {/* All-cities quick comparison */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="font-syne text-lg font-bold">Comparatif des villes</h2>
            <div className="h-px flex-1 bg-dark-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CITIES.map((city) => {
              const data = MARKET_HISTORY[listingType][city];
              return (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={cn(
                    "card p-4 text-left transition-colors",
                    activeCity === city ? "border-emerald/40" : "hover:border-dark-border"
                  )}
                >
                  <div className="text-sm text-gray-400">{data.label}</div>
                  <div className="font-syne text-xl font-bold text-white mt-1">
                    {formatPrice(data.median_sqm, "XAF", true)}/m²
                  </div>
                  <div className={cn("flex items-center gap-1 text-xs font-medium mt-1", getTrendColor(data.change_pct))}>
                    <TrendIcon pct={data.change_pct} />
                    {getTrendLabel(data.change_pct)} / mois · {data.sample_count.toLocaleString("fr-FR")} annonces
                  </div>
                </button>
              );
            })}
          </div>
        </div>

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
