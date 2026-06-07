import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Search,
  Building2,
  BarChart3,
  MapPin,
  ChevronRight,
  Zap,
  Globe,
} from "lucide-react";

// ---- Stats ----
const STATS = [
  { value: "12 400+", label: "Annonces indexées", color: "text-emerald" },
  { value: "3 villes", label: "Douala, Yaoundé, Kribi", color: "text-amber-400" },
  { value: "47 quartiers", label: "Couverts et analysés", color: "text-indigo-300" },
  { value: "Live", label: "Mise à jour continue", color: "text-emerald" },
];

// ---- Features ----
const FEATURES = [
  {
    icon: BarChart3,
    color: "emerald",
    title: "Indices de prix en temps réel",
    desc: "Suivi des prix demandés par quartier — tendances hebdomadaires, médianes au m², comparaisons inter-villes.",
    badge: "Market Intelligence",
  },
  {
    icon: Shield,
    color: "amber",
    title: "Annonces vérifiées anti-fraude",
    desc: "Validation GPS des photos prises en direct. Chaque bien est authentifié géographiquement avant publication.",
    badge: "Trust & Safety",
  },
  {
    icon: TrendingUp,
    color: "indigo",
    title: "Simulateur ROI diaspora",
    desc: "Projetez vos rendements locatifs comparés aux alternatives d'investissement. Outil exclusif pour la diaspora.",
    badge: "Diaspora Invest",
  },
  {
    icon: Globe,
    color: "emerald",
    title: "Sentiment de marché",
    desc: "Prédisez les tendances. Gagnez des points. Comparez votre vision avec la communauté d'investisseurs.",
    badge: "Bêta",
  },
];

// ---- City cards ----
const CITIES = [
  { name: "Douala", desc: "Capital économique", count: 7240, icon: "🌊", trend: "+3.2%" },
  { name: "Yaoundé", desc: "Capital politique", count: 4180, icon: "🏛️", trend: "+1.8%" },
  { name: "Kribi", desc: "Zone balnéaire", count: 980, icon: "🏖️", trend: "+6.1%" },
];

export default function HomePage() {
  return (
    <div className="bg-mesh min-h-screen">
      {/* === HERO === */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,196,140,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,140,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-indigo/10 rounded-full blur-3xl pointer-events-none" />

        <div className="section-container relative">
          {/* Pill badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald/25 bg-emerald/8 text-emerald text-xs font-medium">
              <Zap size={12} fill="currentColor" />
              Observatoire de l&apos;Immobilier Camerounais — Beta
            </span>
          </div>

          {/* Headline */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-syne text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Le marché immo
              <br />
              <span className="text-gradient-emerald">camerounais,</span>
              <br />
              <span className="text-gray-300">décrypté.</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Indices de prix en temps réel, annonces vérifiées anti-fraude et analyses de tendances
              pour Douala, Yaoundé et Kribi.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/dashboard" className="btn-primary text-base px-7 py-3.5 glow-emerald">
              Voir les indices de prix
              <ArrowRight size={18} />
            </Link>
            <Link href="/listings" className="btn-secondary text-base px-7 py-3.5">
              <Search size={18} />
              Parcourir les annonces
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className={`font-syne text-2xl sm:text-3xl font-bold ${s.color}`}>
                  {s.value}
                </div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CITIES === */}
      <section className="py-20 border-t border-dark-border/40">
        <div className="section-container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-syne text-2xl sm:text-3xl font-bold">
                Marchés couverts
              </h2>
              <p className="text-gray-500 text-sm mt-1">Prix demandés — mis à jour en continu</p>
            </div>
            <Link href="/dashboard" className="btn-ghost text-sm hidden sm:flex">
              Voir les indices <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CITIES.map((city) => (
              <Link
                key={city.name}
                href={`/listings?city=${city.name.toLowerCase()}`}
                className="card-hover p-6 group"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{city.icon}</span>
                  <span className="badge-emerald text-xs">{city.trend} / mois</span>
                </div>
                <h3 className="font-syne font-bold text-xl mt-4">{city.name}</h3>
                <p className="text-gray-500 text-sm">{city.desc}</p>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-dark-border">
                  <Building2 size={14} className="text-gray-500" />
                  <span className="text-sm text-gray-400">
                    {city.count.toLocaleString("fr-FR")} annonces indexées
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === FEATURES === */}
      <section className="py-20 border-t border-dark-border/40">
        <div className="section-container">
          <div className="text-center mb-14">
            <h2 className="font-syne text-3xl sm:text-4xl font-bold">
              Plus qu&apos;un portail d&apos;annonces
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Une plateforme d&apos;intelligence qui transforme les données de marché en décisions d&apos;investissement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              const colorMap: Record<string, string> = {
                emerald: "bg-emerald/10 text-emerald border-emerald/20",
                amber: "bg-amber/10 text-amber-400 border-amber/20",
                indigo: "bg-indigo/10 text-indigo-300 border-indigo/20",
              };
              return (
                <div key={f.title} className="card p-7 group hover:border-dark-muted transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl border ${colorMap[f.color]} shrink-0`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge-gray">{f.badge}</span>
                      </div>
                      <h3 className="font-syne font-semibold text-lg">{f.title}</h3>
                      <p className="text-gray-500 text-sm mt-2 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === RECENT LISTINGS TEASER === */}
      <section className="py-20 border-t border-dark-border/40">
        <div className="section-container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-syne text-2xl sm:text-3xl font-bold">Dernières annonces</h2>
              <p className="text-gray-500 text-sm mt-1">Vérifiées et géolocalisées</p>
            </div>
            <Link href="/listings" className="btn-secondary text-sm">
              Tout voir <ChevronRight size={16} />
            </Link>
          </div>

          <div className="flex items-center justify-center py-12 card border-dashed">
            <div className="text-center">
              <Building2 size={40} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">
                Connectez Supabase pour afficher les annonces en temps réel
              </p>
              <Link href="/listings" className="btn-primary mt-4 text-sm">
                Parcourir les annonces
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === CTA BOTTOM === */}
      <section className="py-24 border-t border-dark-border/40">
        <div className="section-container">
          <div className="relative card overflow-hidden p-10 sm:p-16 text-center border-gradient">
            <div className="absolute inset-0 bg-emerald-glow pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-emerald/60 to-transparent" />

            <h2 className="font-syne text-3xl sm:text-4xl font-bold relative">
              Publiez votre bien.<br />
              <span className="text-gradient-emerald">Touchez 50 000+ visiteurs.</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-lg mx-auto">
              Vente ou location — annonce gratuite, vérification GPS incluse, visibilité maximale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link href="/listings/new" className="btn-primary text-base px-8 py-3.5">
                Publier gratuitement
                <ArrowRight size={18} />
              </Link>
              <Link href="/dashboard" className="btn-secondary text-base px-8 py-3.5">
                <MapPin size={18} />
                Explorer les prix
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-border/40 py-10">
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div>
            <span className="font-syne font-bold text-gray-400">MoneyPiol</span>
            {" — "}Observatoire de l&apos;Immobilier Camerounais
          </div>
          <div className="flex items-center gap-1">
            <span>Prix demandés — données illustratives</span>
          </div>
          <div>© {new Date().getFullYear()} MoneyPiol</div>
        </div>
      </footer>
    </div>
  );
}
