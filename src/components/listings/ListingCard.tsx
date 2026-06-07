import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Maximize2, Shield, CheckCircle, Clock } from "lucide-react";
import { cn, formatPrice, formatRelativeDate, PROPERTY_TYPE_LABELS, LISTING_TYPE_LABELS } from "@/lib/utils";
import type { Property } from "@/lib/types";

interface ListingCardProps {
  property: Property;
  className?: string;
}

export default function ListingCard({ property, className }: ListingCardProps) {
  const isVerified = property.verification_status === "verified";
  const isRental = property.listing_type === "rental";

  return (
    <Link href={`/listings/${property.id}`} className={cn("card-hover block group", className)}>
      {/* Photo */}
      <div className="relative h-52 overflow-hidden bg-dark-surface">
        {property.primary_photo_url ? (
          <Image
            src={property.primary_photo_url}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-600">
            <Maximize2 size={32} />
          </div>
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className={cn("badge text-xs font-semibold", isRental ? "badge-indigo" : "badge-amber")}>
            {LISTING_TYPE_LABELS[property.listing_type]}
          </span>
        </div>

        {/* Verification badge */}
        <div className="absolute top-3 right-3">
          {isVerified ? (
            <span className="badge badge-emerald">
              <CheckCircle size={10} />
              Vérifié
            </span>
          ) : (
            <span className="badge badge-gray">
              <Clock size={10} />
              En attente
            </span>
          )}
        </div>

        {/* Source */}
        {property.source === "scraper" && (
          <div className="absolute bottom-3 right-3">
            <span className="text-[10px] text-gray-500 bg-dark-bg/80 px-2 py-0.5 rounded">
              Indexé
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <span className="font-syne font-bold text-xl text-emerald">
              {formatPrice(property.price, property.currency, true)}
            </span>
            {isRental && (
              <span className="text-gray-500 text-xs ml-1">/mois</span>
            )}
          </div>
          {property.price_per_sqm && (
            <span className="text-xs text-gray-500">
              {formatPrice(property.price_per_sqm, property.currency, true)}/m²
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-medium text-white text-sm leading-snug line-clamp-2 mb-3">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
          <MapPin size={11} />
          <span>
            {property.neighborhood?.name && `${property.neighborhood.name}, `}
            {property.city.charAt(0).toUpperCase() + property.city.slice(1)}
          </span>
        </div>

        {/* Details row */}
        <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-t border-dark-border">
          <span className="badge-gray text-[11px]">
            {PROPERTY_TYPE_LABELS[property.property_type]}
          </span>
          {property.area_sqm && (
            <span className="flex items-center gap-1">
              <Maximize2 size={10} />
              {property.area_sqm} m²
            </span>
          )}
          {property.bedrooms && (
            <span className="flex items-center gap-1">
              <BedDouble size={10} />
              {property.bedrooms} ch
            </span>
          )}
          {property.furnished && (
            <span className="text-indigo-400 text-[10px] font-medium">Meublé</span>
          )}
          <span className="ml-auto text-gray-600">{formatRelativeDate(property.created_at)}</span>
        </div>
      </div>
    </Link>
  );
}
