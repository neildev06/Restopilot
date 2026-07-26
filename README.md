<div align="center">

<img src="https://img.shields.io/badge/RestoPilot-🍽️-FF6B35?style=for-the-badge" alt="RestoPilot" />

# RestoPilot

**Le copilote intelligent pour gérants de restaurant**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## 📖 À propos

**RestoPilot** est une application web de gestion tout-en-un pour les gérants de restaurant. Elle centralise le tableau de bord, les recettes, les stocks, l'équipe, les opérations, la conformité HACCP et un assistant IA — le tout dans une interface moderne et responsive.

---

## ✨ Fonctionnalités

| Module | Description |
|--------|-------------|
| 📊 **Tableau de bord** | Vue d'ensemble quotidienne : KPIs, alertes, réservations, chiffre d'affaires |
| 🍳 **Recettes** | Fiches techniques, calcul des marges et coûts |
| 📦 **Stocks** | Inventaires en temps réel et alertes de rupture |
| 👥 **Équipe** | Planning du personnel et gestion des pointages |
| ✅ **Opérations** | Check-lists journalières et suivi des tâches |
| 🧼 **Hygiène** | Conformité HACCP et traçabilité sanitaire |
| 🤖 **Assistant IA** | Copilote intelligent pour la prise de décision |
| 👥 **Clients** | Gestion des avis et fidélisation |
| 💰 **Ventes** | Analyse des performances et rapports |

---

## 🛠️ Stack technique

- **Framework** : [Next.js 15](https://nextjs.org) (App Router)
- **UI** : [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- **Style** : [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com)
- **Backend / BDD** : [Supabase](https://supabase.com) (PostgreSQL + Auth + RLS)
- **Charts** : [Recharts](https://recharts.org)
- **Formulaires** : [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **Thème** : Mode clair / sombre via [next-themes](https://github.com/pacocoursey/next-themes)

---

## 🚀 Installation

### Prérequis

- **Node.js** 18+
- **npm** ou **bun**
- Un projet **Supabase** (cloud ou local)

### 1. Cloner le dépôt

```bash
git clone https://github.com/neildev06/Restopilot.git
cd Restopilot
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Crée un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> 💡 Ces informations sont disponibles dans ton projet Supabase sous **Settings → API**.

### 4. Initialiser la base de données

```bash
# Appliquer les migrations
psql -f supabase/migrations/00001_initial_schema.sql
psql -f supabase/migrations/00002_rls_policies.sql

# Charger les données de démo (optionnel)
psql -f supabase/seed.sql
```

### 5. Lancer en développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

---

## 🔑 Compte de démo

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| 👨‍🍳 Gérant | `gerant@comptoir-provencal.fr` | `demo1234` |

---

## 📁 Structure du projet

```
restopilot/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Pages d'authentification
│   │   └── (dashboard)/     # Pages du tableau de bord
│   │       ├── tableau-de-bord/
│   │       ├── recettes/
│   │       ├── stocks/
│   │       ├── equipe/
│   │       ├── operations/
│   │       ├── hygiene/
│   │       ├── ventes/
│   │       ├── clients/
│   │       ├── assistant/
│   │       └── parametres/
│   ├── components/
│   │   ├── ui/              # Composants UI réutilisables (shadcn)
│   │   ├── dashboard/       # Composants du tableau de bord
│   │   ├── layout/          # Sidebar, Topbar, Navigation
│   │   └── shared/          # Composants partagés
│   ├── lib/
│   │   ├── supabase/        # Client Supabase (server/client)
│   │   ├── types/           # Types TypeScript
│   │   └── utils.ts         # Utilitaires
│   ├── providers/           # Providers React (auth, thème)
│   └── middleware.ts        # Middleware d'authentification
├── supabase/
│   ├── migrations/          # Schéma SQL
│   └── seed.sql             # Données de démo
└── public/                  # Assets statiques
```

---

## 📜 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lance le serveur de production |
| `npm run lint` | Vérifie la qualité du code |

---

## 📄 Licence

Ce projet est sous licence privée. Tous droits réservés © 2026 RestoPilot.

---

<div align="center">
  Fait avec ❤️ pour les gérants de restaurant
</div>