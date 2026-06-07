"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import { cn, CITY_LABELS, PROPERTY_TYPE_LABELS, LISTING_TYPE_LABELS } from "@/lib/utils";
import type { City, ListingType, PropertyType } from "@/lib/types";

const STEPS = ["Type & statut", "Localisation", "Caractéristiques", "Prix & description"] as const;

interface FormState {
  listing_type: ListingType;
  property_type: PropertyType;
  city: City;
  address: string;
  area_sqm: string;
  bedrooms: string;
  bathrooms: string;
  parking: boolean;
  furnished: boolean;
  title: string;
  description: string;
  price: string;
  negotiable: boolean;
}

const INITIAL_STATE: FormState = {
  listing_type: "rental",
  property_type: "apartment",
  city: "douala",
  address: "",
  area_sqm: "",
  bedrooms: "",
  bathrooms: "",
  parking: false,
  furnished: false,
  title: "",
  description: "",
  price: "",
  negotiable: false,
};

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-2 flex-1">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors",
              i < current && "bg-emerald text-dark-bg",
              i === current && "bg-emerald/15 text-emerald border border-emerald/40",
              i > current && "bg-dark-surface text-gray-500 border border-dark-border"
            )}
          >
            {i < current ? <Check size={14} /> : i + 1}
          </div>
          <span className={cn("text-xs hidden sm:inline", i === current ? "text-white font-medium" : "text-gray-500")}>
            {label}
          </span>
          {i < STEPS.length - 1 && <div className="h-px flex-1 bg-dark-border" />}
        </div>
      ))}
    </div>
  );
}

export function NewListingForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function canProceed(): boolean {
    switch (step) {
      case 0:
        return Boolean(form.listing_type && form.property_type && form.city);
      case 1:
        return form.address.trim().length > 2;
      case 2:
        return form.area_sqm.trim().length > 0;
      case 3:
        return form.title.trim().length > 3 && Number(form.price) > 0;
      default:
        return true;
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const supabase = createClient();
      const price = Number(form.price);
      const area = form.area_sqm ? Number(form.area_sqm) : null;

      const { error } = await supabase.from("properties").insert({
        title: form.title.trim(),
        description: form.description.trim() || null,
        listing_type: form.listing_type,
        property_type: form.property_type,
        price,
        price_per_sqm: area ? Math.round(price / area) : null,
        currency: "XAF",
        negotiable: form.negotiable,
        city: form.city,
        address: form.address.trim(),
        area_sqm: area,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
        parking: form.parking,
        furnished: form.furnished,
        features: [],
        source: "user",
        user_id: userId,
      });

      if (error) throw error;

      toast.success("Annonce soumise — en attente de modération");
      router.push("/listings");
      router.refresh();
    } catch (err) {
      console.error("[NewListingForm] submit error:", err);
      toast.error("Impossible de publier l'annonce. Réessayez plus tard.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card p-6 sm:p-8">
      <StepIndicator current={step} />

      {/* Step 0: Type & status */}
      {step === 0 && (
        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Type d&apos;annonce</label>
            <div className="grid grid-cols-2 gap-3">
              {(["rental", "sale"] as ListingType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => update("listing_type", type)}
                  className={cn(
                    "px-4 py-3 rounded-xl border text-sm font-medium transition-colors",
                    form.listing_type === type
                      ? "border-emerald/50 bg-emerald/10 text-emerald"
                      : "border-dark-border bg-dark-surface text-gray-400 hover:border-dark-border/80"
                  )}
                >
                  {LISTING_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Type de bien</label>
            <select
              className="select"
              value={form.property_type}
              onChange={(e) => update("property_type", e.target.value as PropertyType)}
            >
              {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Ville</label>
            <select
              className="select"
              value={form.city}
              onChange={(e) => update("city", e.target.value as City)}
            >
              {Object.entries(CITY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Step 1: Location */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Adresse / quartier</label>
            <input
              className="input"
              placeholder="Ex : Rue des Manguiers, Bonanjo"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
            />
            <p className="text-xs text-gray-600 mt-2">
              L&apos;adresse exacte ne sera jamais affichée publiquement — seul le quartier
              apparaîtra sur l&apos;annonce.
            </p>
          </div>
        </div>
      )}

      {/* Step 2: Characteristics */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Surface (m²)</label>
              <input
                type="number"
                min="0"
                className="input"
                placeholder="60"
                value={form.area_sqm}
                onChange={(e) => update("area_sqm", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Chambres</label>
              <input
                type="number"
                min="0"
                className="input"
                placeholder="2"
                value={form.bedrooms}
                onChange={(e) => update("bedrooms", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Salles de bain</label>
              <input
                type="number"
                min="0"
                className="input"
                placeholder="1"
                value={form.bathrooms}
                onChange={(e) => update("bathrooms", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                className="accent-emerald w-4 h-4"
                checked={form.parking}
                onChange={(e) => update("parking", e.target.checked)}
              />
              Parking
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                className="accent-emerald w-4 h-4"
                checked={form.furnished}
                onChange={(e) => update("furnished", e.target.checked)}
              />
              Meublé
            </label>
          </div>
        </div>
      )}

      {/* Step 3: Price & description */}
      {step === 3 && (
        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Titre de l&apos;annonce</label>
            <input
              className="input"
              placeholder="Ex : Appartement moderne 3 pièces — Bonanjo"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Description</label>
            <textarea
              className="input min-h-[100px] resize-y"
              placeholder="Décrivez le bien : état, équipements, environnement..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Prix demandé (FCFA{form.listing_type === "rental" ? " / mois" : ""})
            </label>
            <input
              type="number"
              min="0"
              className="input"
              placeholder="350000"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
            />
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer mt-3">
              <input
                type="checkbox"
                className="accent-emerald w-4 h-4"
                checked={form.negotiable}
                onChange={(e) => update("negotiable", e.target.checked)}
              />
              Prix négociable
            </label>
          </div>

          <p className="text-xs text-gray-600">
            Ce prix correspond au prix demandé affiché dans l&apos;annonce — il alimente nos
            indices de marché et sera vérifié avant publication.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark-border">
        <button
          type="button"
          className="btn-ghost"
          disabled={step === 0 || submitting}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          <ChevronLeft size={16} />
          Précédent
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            className="btn-primary"
            disabled={!canProceed()}
            onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
          >
            Suivant
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary"
            disabled={!canProceed() || submitting}
            onClick={handleSubmit}
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
            Publier l&apos;annonce
          </button>
        )}
      </div>
    </div>
  );
}
