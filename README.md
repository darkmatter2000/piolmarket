# PiolMarket 🏗️
### Observatoire de l'Immobilier Camerounais

Intelligence marché immobilier pour Douala, Yaoundé et Kribi.

---

## Stack technique
- **Frontend/Backend** : Next.js 14 (App Router, TypeScript)
- **Base de données** : Supabase (PostgreSQL + Auth + Storage)
- **Déploiement** : Vercel
- **Styling** : Tailwind CSS

**100% gratuit** — Supabase free tier + Vercel free tier.

---

## Setup en 3 étapes

### 1. Cloner et installer

```bash
git clone https://github.com/TON_USERNAME/moneypiol.git
cd moneypiol
npm install
```

### 2. Créer un projet Supabase (gratuit)

1. Aller sur [supabase.com](https://supabase.com) → New Project
2. Copier `.env.example` → `.env.local`
3. Remplir `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` depuis Settings > API
4. Dans Supabase SQL Editor, exécuter : `supabase/migrations/001_initial_schema.sql`

### 3. Démarrer en local

```bash
npm run dev
# → http://localhost:3000
```

---

## Déploiement sur Vercel (gratuit)

```bash
# 1. Pusher sur GitHub
git push origin main

# 2. Connecter sur vercel.com → Import Git Repository
# 3. Ajouter les variables d'environnement dans Vercel Dashboard
# 4. Deploy !
```

---

## Structure du projet

Voir `CLAUDE.md` pour le contexte complet du projet (utilisé par Claude Code).

```
src/
├── app/              → Pages Next.js (App Router)
├── components/       → Composants React
├── lib/
│   ├── supabase/     → Clients browser + server
│   ├── types/        → Types TypeScript
│   └── utils/        → Helpers, formatters, mock data
supabase/
└── migrations/       → Schéma SQL
```

---

## Features MVP

- [x] Landing page avec stats de marché
- [x] Browser d'annonces avec filtres
- [x] Dashboard indices de prix par quartier
- [x] API REST listings
- [x] Types TypeScript complets
- [x] Mode mock (sans Supabase) pour le dev
- [ ] Auth (Supabase Auth)
- [ ] Soumission d'annonces
- [ ] Vérification photo GPS anti-fraude
- [ ] Système de points
- [ ] Simulateur ROI diaspora
- [ ] Module prédictions gamifié

---

## Disclaimer légal

Les prix affichés sont des **prix demandés** issus des annonces, pas des prix de transaction.
Données fournies à titre indicatif pour analyser les tendances du marché.
