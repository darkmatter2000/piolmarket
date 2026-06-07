import { Suspense } from "react";
import { Building2 } from "lucide-react";
import ListingCard from "@/components/listings/ListingCard";
import ListingsFilter from "@/components/listings/ListingsFilter";
import { MOCK_LISTINGS } from "@/lib/utils/mock-data";
import type { City, ListingType, PropertyType } from "@/lib/types";

interface ListingsPageProps {
  searchParams: {
    city?: string;
    type?: string;
    property_type?: string;
    q?: string;
    page?: string;
  };
}

export const metadata = {
  title: "Annonces immobilières — MoneyPiol",
  description: "Parcourez les annonces immobilières vérifiées de Douala, Yaoundé et Kribi.",
};

export default function ListingsPage({ searchParams }: ListingsPageProps) {
  // Filter mock data (will be replaced by Supabase query)
  let listings = [...MOCK_LISTINGS];

  if (searchParams.city) {
    listings = listings.filter((l) => l.city === searchParams.city);
  }
  if (searchParams.type) {
    listings = listings.filter((l) => l.listing_type === searchParams.type);
  }
  if (searchParams.property_type) {
    listings = listings.filter((l) => l.property_type === searchParams.property_type);
  }
  if (searchParams.q) {
    const q = searchParams.q.toLowerCase();
    listings = listings.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.neighborhood?.name.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q)
    );
  }

  return (
    <div className="bg-dark-bg min-h-screen">
      {/* Header */}
      <div className="border-b border-dark-border/40 py-8">
        <div className="section-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-syne text-2xl sm:text-3xl font-bold">
                Annonces immobilières
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {listings.length} bien{listings.length > 1 ? "s" : ""} trouvé{listings.length > 1 ? "s" : ""}
                {" · "}
                <span className="text-emerald">Prix demandés</span>
              </p>
            </div>
            <a href="/listings/new" className="btn-primary hidden sm:flex">
              <Building2 size={16} />
              Publier un bien
            </a>
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        {/* Filters */}
        <Suspense>
          <ListingsFilter />
        </Suspense>

        {/* Grid */}
        <div className="mt-6">
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((property) => (
                <ListingCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="card flex flex-col items-center justify-center py-20 text-center">
              <Building2 size={48} className="text-gray-700 mb-4" />
              <h3 className="font-syne font-semibold text-lg text-gray-400">
                Aucune annonce trouvée
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Essayez de modifier vos filtres
              </p>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-600 mt-10">
          Les prix affichés sont des prix demandés issus des annonces publiées.
          Ils ne constituent pas des prix de transaction et sont fournis à titre indicatif.
        </p>
      </div>
    </div>
  );
}
