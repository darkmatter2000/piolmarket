"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { City, ListingType, PropertyType } from "@/lib/types";

const CITIES: { value: "" | City; label: string }[] = [
  { value: "", label: "Toutes les villes" },
  { value: "douala", label: "Douala" },
  { value: "yaounde", label: "Yaoundé" },
  { value: "kribi", label: "Kribi" },
];

const LISTING_TYPES: { value: "" | ListingType; label: string }[] = [
  { value: "", label: "Vente & Location" },
  { value: "sale", label: "Vente" },
  { value: "rental", label: "Location" },
];

const PROPERTY_TYPES: { value: "" | PropertyType; label: string }[] = [
  { value: "", label: "Tous les types" },
  { value: "apartment", label: "Appartement" },
  { value: "house", label: "Maison" },
  { value: "villa", label: "Villa" },
  { value: "land", label: "Terrain" },
  { value: "commercial", label: "Commercial" },
];

export default function ListingsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // reset pagination on filter change
    router.push(`/listings?${params.toString()}`);
  }

  const city = searchParams.get("city") || "";
  const type = searchParams.get("type") || "";
  const propType = searchParams.get("property_type") || "";

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal size={16} className="text-emerald" />
        <span className="text-sm font-medium text-gray-300">Filtres</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Quartier, adresse…"
            className="input pl-9 py-2.5"
            defaultValue={searchParams.get("q") || ""}
            onChange={(e) => updateFilter("q", e.target.value)}
          />
        </div>

        {/* City */}
        <select
          className="select py-2.5 sm:w-44"
          value={city}
          onChange={(e) => updateFilter("city", e.target.value)}
        >
          {CITIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        {/* Listing type */}
        <select
          className="select py-2.5 sm:w-44"
          value={type}
          onChange={(e) => updateFilter("type", e.target.value)}
        >
          {LISTING_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        {/* Property type */}
        <select
          className="select py-2.5 sm:w-48"
          value={propType}
          onChange={(e) => updateFilter("property_type", e.target.value)}
        >
          {PROPERTY_TYPES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Active filters display */}
      {(city || type || propType) && (
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-xs text-gray-500">Actifs :</span>
          {city && (
            <button
              onClick={() => updateFilter("city", "")}
              className="badge-emerald cursor-pointer hover:bg-emerald/25 transition-colors"
            >
              {CITIES.find((c) => c.value === city)?.label}
              <span className="ml-1 opacity-60">×</span>
            </button>
          )}
          {type && (
            <button
              onClick={() => updateFilter("type", "")}
              className="badge-amber cursor-pointer hover:bg-amber/25 transition-colors"
            >
              {LISTING_TYPES.find((t) => t.value === type)?.label}
              <span className="ml-1 opacity-60">×</span>
            </button>
          )}
          {propType && (
            <button
              onClick={() => updateFilter("property_type", "")}
              className="badge-indigo cursor-pointer hover:bg-indigo/25 transition-colors"
            >
              {PROPERTY_TYPES.find((p) => p.value === propType)?.label}
              <span className="ml-1 opacity-60">×</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
