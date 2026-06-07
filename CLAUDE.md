# MoneyPiol — Observatoire de l'Immobilier Camerounais
## Contexte projet pour Claude Code

### 🎯 Vision
Plateforme d'intelligence marché immobilier focalisée sur le Cameroun (Douala, Yaoundé, Kribi).
Centralise, analyse et suit les prix immobiliers (vente + location) via des agents IA de scraping.
**Positionnement data** : "indice de prix demandés" (tendances relatives), pas prix de transaction absolus — intentionnel et commercialement solide.

### 🏗️ Architecture technique
- **Frontend/Backend** : Next.js 14 (App Router, TypeScript)
- **Base de données** : Supabase (PostgreSQL + Auth + Storage + RLS)
- **Déploiement** : Vercel (free tier)
- **Styling** : Tailwind CSS + design system custom (voir `src/lib/design-tokens.ts`)

### 📁 Structure des dossiers
```
src/
├── app/
│   ├── page.tsx              ← Landing page (consumer-facing, vivid colors)
│   ├── listings/             ← Annonces immobilières
│   ├── dashboard/            ← Market intelligence (B2B, plus sobre)
│   ├── simulator/            ← ROI simulator (diaspora investors)
│   ├── (auth)/               ← Login / Register
│   └── api/                  ← Route handlers
├── components/
│   ├── listings/             ← ListingCard, ListingsGrid, ListingFilters
│   ├── dashboard/            ← PriceChart, NeighborhoodMap, StatsCards
│   ├── layout/               ← Header, Footer, Sidebar
│   └── ui/                   ← Design system components
├── lib/
│   ├── supabase/             ← client.ts (browser), server.ts (SSR)
│   ├── types/                ← index.ts (tous les types TypeScript)
│   └── utils/                ← helpers, formatters, geo utils
supabase/
└── migrations/               ← SQL schema versioned
```

### 🎨 Design System
**Palette principale (consumer-facing)** :
- Emerald : `#00C48C` (primary action, CTA)
- Amber : `#FF6B35` (accents, highlights)
- Indigo : `#5B21FE` (secondary, badges)
- Dark bg : `#070E1A`
- Surface : `#0D1829`

**Dashboard B2B** : version plus sobre, même palette mais désaturée, fond `#F8FAFC`.

**Fonts** : Syne (headings) + Outfit (body) — importés via Google Fonts dans layout.tsx

### 🗄️ Schéma base de données (tables principales)
- `properties` — annonces (vente + location)
- `neighborhoods` — quartiers avec géo
- `price_snapshots` — historique des prix (pour les indices)
- `photos` — photos avec GPS + vérification antifraude
- `users` / `profiles` — auth Supabase + rôles
- `points_ledger` — système de points (regulatory workaround)
- `predictions` — module sentiment/prédiction (gamifié, pas de vrai argent)

### ⚙️ Variables d'environnement requises
Voir `.env.example` — les deux clés Supabase suffisent pour démarrer.

### 🚦 Features par priorité
**Phase 1 (MVP actuel)** :
- [ ] Listings browser (filtres ville/type/prix)
- [ ] Market dashboard (indices prix par quartier)
- [ ] Auth (Supabase Auth)
- [ ] Soumission d'annonces par utilisateurs

**Phase 2** :
- [ ] Vérification photo (GPS + anti-fraude AI)
- [ ] Système de points
- [ ] Simulateur ROI diaspora

**Phase 3** :
- [ ] Module prédictions gamifié (style Polymarket, points virtuels)
- [ ] Dashboard B2B (abonnements agences)

### 🔑 Décisions techniques importantes
1. **GPS threshold** pour détection doublons : utiliser `0.0001°` (~11m), jamais `0.01°` (~1.1km)
2. **Points system** : conçu comme loyalty rewards, pas currency directe (évite régulation)
3. **Simulateur ROI** : toujours avec disclaimers visibles, projections illustratives uniquement
4. **Scraping** : transitoire, remplacé progressivement par soumissions directes utilisateurs/agences
5. **Prix** : toujours "prix demandé" (asked price), jamais "prix de transaction"

### 🛠️ Commandes utiles
```bash
npm run dev          # Dev local
npm run build        # Build production
npm run db:push      # Push schema vers Supabase (supabase CLI)
npm run db:seed      # Seed avec données de test
```

### 📋 État actuel
Scaffold initial — pages landing, listings, et dashboard skeleton.
Données mockées en dev, Supabase connecté pour la prod.
