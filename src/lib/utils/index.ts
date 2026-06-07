import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { City, ListingType, PropertyType } from "@/lib/types";

// ---- Classname helper ----
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ---- Price formatting ----
export function formatPrice(
  amount: number,
  currency: "XAF" | "USD" | "EUR" = "XAF",
  compact = false
): string {
  if (currency === "XAF") {
    if (compact) {
      if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)} Mrd FCFA`;
      if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)} M FCFA`;
      if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)} k FCFA`;
    }
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ---- City labels ----
export const CITY_LABELS: Record<City, string> = {
  douala: "Douala",
  yaounde: "Yaoundé",
  kribi: "Kribi",
};

// ---- Property type labels ----
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  apartment: "Appartement",
  house: "Maison",
  villa: "Villa",
  land: "Terrain",
  commercial: "Local commercial",
  office: "Bureau",
};

// ---- Listing type labels ----
export const LISTING_TYPE_LABELS: Record<ListingType, string> = {
  sale: "Vente",
  rental: "Location",
};

// ---- Date formatting ----
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatRelativeDate(date: string | Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Hier";
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine(s)`;
  return formatDate(date);
}

// ---- GPS distance (Haversine formula) ----
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in meters
}

// Threshold for duplicate detection: 20 meters
export const GPS_DUPLICATE_THRESHOLD_METERS = 20;

// ---- Trend display ----
export function getTrendColor(changePct: number): string {
  if (changePct > 2) return "text-emerald-400";
  if (changePct < -2) return "text-red-400";
  return "text-amber-400";
}

export function getTrendLabel(changePct: number): string {
  const sign = changePct > 0 ? "+" : "";
  return `${sign}${changePct.toFixed(1)}%`;
}

// ---- Mock data helpers (dev only) ----
export const MOCK_NEIGHBORHOODS = [
  { id: "1", name: "Bonanjo", city: "douala" as City, slug: "bonanjo", lat: 4.0511, lng: 9.7085 },
  { id: "2", name: "Akwa", city: "douala" as City, slug: "akwa", lat: 4.0522, lng: 9.7145 },
  { id: "3", name: "Makepe", city: "douala" as City, slug: "makepe", lat: 4.0697, lng: 9.7589 },
  { id: "4", name: "Bastos", city: "yaounde" as City, slug: "bastos", lat: 3.8869, lng: 11.5197 },
  { id: "5", name: "Omnisport", city: "yaounde" as City, slug: "omnisport", lat: 3.8480, lng: 11.5021 },
  { id: "6", name: "Nlongkak", city: "yaounde" as City, slug: "nlongkak", lat: 3.8764, lng: 11.5078 },
];
