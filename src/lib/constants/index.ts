export const APP_NAME = 'RestoPilot'
export const APP_TAGLINE = 'Pilotez votre restaurant sereinement'

export const ROLES = {
  GERANT: 'gerant' as const,
  RESPONSABLE_SALLE: 'responsable_salle' as const,
  CHEF_CUISINE: 'chef_cuisine' as const,
  EMPLOYE: 'employe' as const,
  COMPTABLE: 'comptable' as const,
} as const

export const ROLE_LABELS: Record<string, string> = {
  gerant: 'Gérant',
  responsable_salle: 'Responsable de salle',
  chef_cuisine: 'Chef / Responsable cuisine',
  employe: 'Employé',
  comptable: 'Comptable / Consultant',
}

export const NAV_ITEMS = [
  { href: '/tableau-de-bord', label: 'Tableau de bord', icon: 'LayoutDashboard', roles: ['gerant', 'responsable_salle', 'chef_cuisine', 'comptable'] },
  { href: '/ventes', label: 'Ventes', icon: 'Euro', roles: ['gerant', 'comptable'] },
  { href: '/recettes', label: 'Recettes', icon: 'BookOpen', roles: ['gerant', 'chef_cuisine'] },
  { href: '/stocks', label: 'Stocks', icon: 'Package', roles: ['gerant', 'chef_cuisine'] },
  { href: '/equipe', label: 'Équipe', icon: 'Users', roles: ['gerant', 'responsable_salle', 'chef_cuisine'] },
  { href: '/operations', label: 'Opérations', icon: 'ClipboardCheck', roles: ['gerant', 'responsable_salle', 'chef_cuisine', 'employe'] },
  { href: '/hygiene', label: 'Hygiène', icon: 'Shield', roles: ['gerant', 'chef_cuisine'] },
  { href: '/clients', label: 'Clients', icon: 'Heart', roles: ['gerant', 'responsable_salle'] },
]

export const MOBILE_NAV_ITEMS = [
  { href: '/tableau-de-bord', label: 'Aujourd\'hui', icon: 'LayoutDashboard' },
  { href: '/recettes', label: 'Recettes', icon: 'BookOpen' },
  { href: '/stocks', label: 'Stocks', icon: 'Package' },
  { href: '/operations', label: 'Tâches', icon: 'ClipboardCheck' },
  { href: '/equipe', label: 'Équipe', icon: 'Users' },
]

export const STORAGE_ZONE_LABELS: Record<string, string> = {
  reserve_seche: 'Réserve sèche',
  froid_positif: 'Froid positif',
  congelateur: 'Congélateur',
  bar: 'Bar',
  cave: 'Cave',
  entretien: 'Entretien',
}

export const RECIPE_CATEGORIES = [
  { value: 'entree', label: 'Entrée' },
  { value: 'plat', label: 'Plat' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'boisson', label: 'Boisson' },
  { value: 'preparation', label: 'Préparation' },
]

export const SERVICE_LABELS: Record<string, string> = {
  dejeuner: 'Déjeuner',
  diner: 'Dîner',
  brunch: 'Brunch',
}

export const CHANNEL_LABELS: Record<string, string> = {
  sur_place: 'Sur place',
  a_emporter: 'À emporter',
  livraison: 'Livraison',
}

export const ALLERGEN_LABELS: Record<string, string> = {
  gluten: 'Gluten',
  lait: 'Lait',
  oeuf: 'Œuf',
  poisson: 'Poisson',
  crustaces: 'Crustacés',
  fruits_coques: 'Fruits coques',
  soja: 'Soja',
  sesame: 'Sésame',
  celeri: 'Céleri',
  moutarde: 'Moutarde',
  lupin: 'Lupin',
  sulfites: 'Sulfites',
}

export const FOOD_COST_TARGET = 30
export const GROSS_MARGIN_TARGET = 65
export const LABOR_COST_TARGET = 30
export const DEFAULT_HEALTH_GOAL = 80
