import CityFilter from "@/components/dashboard/CityFilter";
import KpiCards from "@/components/dashboard/KpiCards";

export default function DashboardPage() {
  return (
    <div className="section-container py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                Marché B2B
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Vue agrégée du marché immobilier camerounais
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Analyse consolidée des prix demandés, du loyer médian et de l'activité des annonces pour aider les équipes professionnelles à piloter leur stratégie.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-700">
              Données mockées · Interface B2B claire · Accent Emerald / Amber
            </div>
          </div>
        </div>

        <CityFilter />

        <KpiCards />
      </div>
    </div>
  );
}
