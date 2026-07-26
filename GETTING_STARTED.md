# RestoPilot - Guide de démarrage

## Prérequis

- Node.js 18+
- npm ou bun
- Un projet Supabase (local ou cloud)

## Installation

```bash
cd /Users/nexusia/Documents/CODE/restopilot
npm install
```

## Configuration Supabase

1. Créez un projet Supabase (cloud via https://supabase.com ou local avec `supabase start`)
2. Copiez les variables d'environnement dans `.env.local` :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Exécutez les migrations :
   ```bash
   psql -f supabase/migrations/00001_initial_schema.sql
   psql -f supabase/migrations/00002_rls_policies.sql
   ```
4. Importez les données de démo :
   ```bash
   psql -f supabase/seed.sql
   ```

## Démarrage

```bash
npm run dev
```

Ouvrir http://localhost:3000

## Comptes de démo

| Rôle | Email | Mot de passe |
|------|-------|-------------|
| Gérant | gerant@comptoir-provencal.fr | demo1234 |

## Architecture

- **Frontend** : Next.js 15 (App Router) + React 19 + TypeScript
- **UI** : Tailwind CSS + shadcn/ui
- **Backend** : Supabase (PostgreSQL + Auth + RLS)
- **Thème** : Clair / Sombre (next-themes)

## Modules MVP

1. **Tableau de bord** - Vue d'ensemble quotidienne
2. **Recettes** - Fiches techniques et marges
3. **Stocks** - Inventaires et alertes
4. **Équipe** - Planning et pointage
5. **Opérations** - Check-lists et tâches
6. **Hygiène** - HACCP et conformité
7. **Assistant IA** - Copilote du gérant
