import type { DashboardSummary, Alert, Sale, Recipe, Ingredient, Reservation, Review, Incident, TemperatureLog, Task, Notification } from '@/lib/types'

export const DEMO_RESTAURANT_ID = 'a0000000-0000-0000-0000-000000000001'

export const DEMO_USER = {
  first_name: 'Thomas',
  last_name: 'Bernard',
  role: 'gerant' as const,
  email: 'gerant@comptoir-provencal.fr',
}

// Today's demo sales
const currentDate = new Date()
const todayStr = currentDate.toISOString().split('T')[0]
const yesterday = new Date(currentDate)
yesterday.setDate(yesterday.getDate() - 1)
const yesterdayStr = yesterday.toISOString().split('T')[0]

// Sales for last 14 days (generated from seed-like data)
export const DEMO_SALES: Sale[] = [
  { id: 's1', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-14', service: 'dejeuner', channel: 'sur_place', covers: 28, total_amount: 420, discounts: 0 },
  { id: 's2', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-14', service: 'diner', channel: 'sur_place', covers: 35, total_amount: 595, discounts: 15 },
  { id: 's3', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-15', service: 'dejeuner', channel: 'sur_place', covers: 32, total_amount: 480, discounts: 0 },
  { id: 's4', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-15', service: 'diner', channel: 'sur_place', covers: 42, total_amount: 756, discounts: 10 },
  { id: 's5', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-16', service: 'dejeuner', channel: 'sur_place', covers: 30, total_amount: 450, discounts: 0 },
  { id: 's6', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-16', service: 'diner', channel: 'sur_place', covers: 38, total_amount: 684, discounts: 0 },
  { id: 's7', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-17', service: 'dejeuner', channel: 'sur_place', covers: 40, total_amount: 640, discounts: 0 },
  { id: 's8', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-17', service: 'diner', channel: 'sur_place', covers: 45, total_amount: 990, discounts: 20 },
  { id: 's9', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-17', service: 'diner', channel: 'livraison', covers: 8, total_amount: 120, discounts: 0 },
  { id: 's10', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-18', service: 'dejeuner', channel: 'sur_place', covers: 38, total_amount: 646, discounts: 0 },
  { id: 's11', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-18', service: 'diner', channel: 'sur_place', covers: 45, total_amount: 1035, discounts: 15 },
  { id: 's12', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-19', service: 'brunch', channel: 'sur_place', covers: 42, total_amount: 756, discounts: 0 },
  { id: 's13', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-21', service: 'dejeuner', channel: 'sur_place', covers: 25, total_amount: 375, discounts: 0 },
  { id: 's14', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-21', service: 'diner', channel: 'sur_place', covers: 38, total_amount: 646, discounts: 0 },
  { id: 's15', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-22', service: 'dejeuner', channel: 'sur_place', covers: 30, total_amount: 480, discounts: 0 },
  { id: 's16', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-22', service: 'diner', channel: 'sur_place', covers: 40, total_amount: 720, discounts: 10 },
  { id: 's17', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-23', service: 'dejeuner', channel: 'sur_place', covers: 28, total_amount: 420, discounts: 0 },
  { id: 's18', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-23', service: 'diner', channel: 'sur_place', covers: 42, total_amount: 798, discounts: 0 },
  { id: 's19', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-24', service: 'dejeuner', channel: 'sur_place', covers: 38, total_amount: 608, discounts: 0 },
  { id: 's20', restaurant_id: DEMO_RESTAURANT_ID, sale_date: '2026-07-24', service: 'diner', channel: 'sur_place', covers: 45, total_amount: 945, discounts: 25 },
]

export const DEMO_RECIPES: Recipe[] = [
  { id: 'r1', restaurant_id: DEMO_RESTAURANT_ID, name: 'Salade de chèvre chaud', description: 'Salade verte, tomates cerises, crottin chaud, miel, noix', category: 'entree', sub_recipes_from: [], cost_per_portion: 3.50, selling_price: 12.00, vat_rate: 10, margin_euros: 8.50, margin_percent: 70.83, is_available: true, is_sub_recipe: false, created_at: '2026-06-01', updated_at: '2026-07-01' },
  { id: 'r2', restaurant_id: DEMO_RESTAURANT_ID, name: 'Bruschetta tomate-basilic', description: 'Pain grillé, tomates fraîches, basilic, huile d\'olive', category: 'entree', sub_recipes_from: [], cost_per_portion: 2.80, selling_price: 9.50, vat_rate: 10, margin_euros: 6.70, margin_percent: 70.53, is_available: true, is_sub_recipe: false, created_at: '2026-06-01', updated_at: '2026-07-01' },
  { id: 'r3', restaurant_id: DEMO_RESTAURANT_ID, name: 'Tartare de bœuf', description: 'Bœuf haché, câpres, cornichons, moutarde', category: 'entree', sub_recipes_from: [], cost_per_portion: 5.20, selling_price: 15.00, vat_rate: 10, margin_euros: 9.80, margin_percent: 65.33, is_available: true, is_sub_recipe: false, created_at: '2026-06-01', updated_at: '2026-07-01' },
  { id: 'r4', restaurant_id: DEMO_RESTAURANT_ID, name: 'Soupe à l\'oignon gratinée', description: 'Oignons caramélisés, bouillon, croûtons, gruyère', category: 'entree', sub_recipes_from: [], cost_per_portion: 3.00, selling_price: 11.00, vat_rate: 10, margin_euros: 8.00, margin_percent: 72.73, is_available: true, is_sub_recipe: false, created_at: '2026-06-01', updated_at: '2026-07-01' },
  { id: 'r5', restaurant_id: DEMO_RESTAURANT_ID, name: 'Poulet rôti aux herbes', description: 'Poulet fermier rôti, herbes de Provence, légumes de saison', category: 'plat', sub_recipes_from: [], cost_per_portion: 5.80, selling_price: 18.50, vat_rate: 10, margin_euros: 12.70, margin_percent: 68.65, is_available: true, is_sub_recipe: false, created_at: '2026-06-01', updated_at: '2026-07-01' },
  { id: 'r6', restaurant_id: DEMO_RESTAURANT_ID, name: 'Bœuf bourguignon', description: 'Bœuf braisé au vin rouge, carottes, champignons, pommes vapeur', category: 'plat', sub_recipes_from: [], cost_per_portion: 6.50, selling_price: 20.00, vat_rate: 10, margin_euros: 13.50, margin_percent: 67.50, is_available: true, is_sub_recipe: false, created_at: '2026-06-01', updated_at: '2026-07-01' },
  { id: 'r7', restaurant_id: DEMO_RESTAURANT_ID, name: 'Filet de bar à la provençale', description: 'Filet de bar, tomates confites, olives, courgettes', category: 'plat', sub_recipes_from: [], cost_per_portion: 8.00, selling_price: 22.00, vat_rate: 10, margin_euros: 14.00, margin_percent: 63.64, is_available: false, is_sub_recipe: false, created_at: '2026-06-01', updated_at: '2026-07-01' },
  { id: 'r8', restaurant_id: DEMO_RESTAURANT_ID, name: 'Risotto aux champignons', description: 'Riz arborio, champignons de saison, parmesan, crème', category: 'plat', sub_recipes_from: [], cost_per_portion: 4.50, selling_price: 16.00, vat_rate: 10, margin_euros: 11.50, margin_percent: 71.88, is_available: true, is_sub_recipe: false, created_at: '2026-06-01', updated_at: '2026-07-01' },
  { id: 'r9', restaurant_id: DEMO_RESTAURANT_ID, name: 'Penne à la puttanesca', description: 'Pennes, tomates, olives, câpres, ail, basilic', category: 'plat', sub_recipes_from: [], cost_per_portion: 3.20, selling_price: 14.00, vat_rate: 10, margin_euros: 10.80, margin_percent: 77.14, is_available: true, is_sub_recipe: false, created_at: '2026-06-01', updated_at: '2026-07-01' },
  { id: 'r10', restaurant_id: DEMO_RESTAURANT_ID, name: 'Ratatouille et œuf poché', description: 'Courgettes, aubergines, poivrons, tomates, œuf', category: 'plat', sub_recipes_from: [], cost_per_portion: 3.80, selling_price: 15.50, vat_rate: 10, margin_euros: 11.70, margin_percent: 75.48, is_available: true, is_sub_recipe: false, created_at: '2026-06-01', updated_at: '2026-07-01' },
  { id: 'r11', restaurant_id: DEMO_RESTAURANT_ID, name: 'Tarte au citron meringuée', description: 'Pâte sablée, crème citron, meringue italienne', category: 'dessert', sub_recipes_from: [], cost_per_portion: 2.50, selling_price: 9.00, vat_rate: 10, margin_euros: 6.50, margin_percent: 72.22, is_available: true, is_sub_recipe: false, created_at: '2026-06-01', updated_at: '2026-07-01' },
  { id: 'r12', restaurant_id: DEMO_RESTAURANT_ID, name: 'Crème brûlée à la lavande', description: 'Crème aux œufs, lait, lavande, sucre caramélisé', category: 'dessert', sub_recipes_from: [], cost_per_portion: 2.00, selling_price: 8.50, vat_rate: 10, margin_euros: 6.50, margin_percent: 76.47, is_available: true, is_sub_recipe: false, created_at: '2026-06-01', updated_at: '2026-07-01' },
  { id: 'r13', restaurant_id: DEMO_RESTAURANT_ID, name: 'Tiramisu aux figues', description: 'Mascarpone, figues fraîches, biscuit, café', category: 'dessert', sub_recipes_from: [], cost_per_portion: 2.80, selling_price: 10.00, vat_rate: 10, margin_euros: 7.20, margin_percent: 72.00, is_available: true, is_sub_recipe: false, created_at: '2026-06-01', updated_at: '2026-07-01' },
]

export const DEMO_INGREDIENTS: Ingredient[] = [
  { id: 'i1', restaurant_id: DEMO_RESTAURANT_ID, name: 'Poulet fermier', unit: 'kg', cost_per_unit: 12.50, supplier_id: null, allergens: [], calories_per_100g: 165, storage_zone: 'froid_positif', min_stock: 5, max_stock: 20, current_stock: 8, expiry_date: '2026-07-29', last_cost_update: '2026-07-01', is_active: true },
  { id: 'i2', restaurant_id: DEMO_RESTAURANT_ID, name: 'Bœuf à braiser', unit: 'kg', cost_per_unit: 18.00, supplier_id: null, allergens: [], calories_per_100g: 250, storage_zone: 'froid_positif', min_stock: 3, max_stock: 15, current_stock: 5, expiry_date: '2026-07-28', last_cost_update: '2026-07-01', is_active: true },
  { id: 'i3', restaurant_id: DEMO_RESTAURANT_ID, name: 'Filet de bar', unit: 'kg', cost_per_unit: 24.00, supplier_id: null, allergens: ['poisson'], calories_per_100g: 90, storage_zone: 'froid_positif', min_stock: 2, max_stock: 8, current_stock: 1, expiry_date: '2026-07-28', last_cost_update: '2026-07-01', is_active: true },
  { id: 'i4', restaurant_id: DEMO_RESTAURANT_ID, name: 'Tomates cœur de bœuf', unit: 'kg', cost_per_unit: 4.50, supplier_id: null, allergens: [], calories_per_100g: 18, storage_zone: 'froid_positif', min_stock: 3, max_stock: 15, current_stock: 6, expiry_date: '2026-07-28', last_cost_update: '2026-07-01', is_active: true },
  { id: 'i5', restaurant_id: DEMO_RESTAURANT_ID, name: 'Crème fraîche', unit: 'L', cost_per_unit: 4.50, supplier_id: null, allergens: ['lait'], calories_per_100g: 300, storage_zone: 'froid_positif', min_stock: 2, max_stock: 10, current_stock: 4, expiry_date: '2026-07-28', last_cost_update: '2026-07-01', is_active: true },
  { id: 'i6', restaurant_id: DEMO_RESTAURANT_ID, name: 'Parmesan', unit: 'kg', cost_per_unit: 14.00, supplier_id: null, allergens: ['lait'], calories_per_100g: 431, storage_zone: 'froid_positif', min_stock: 1, max_stock: 5, current_stock: 2, expiry_date: '2026-08-10', last_cost_update: '2026-07-01', is_active: true },
  { id: 'i7', restaurant_id: DEMO_RESTAURANT_ID, name: 'Herbes de Provence', unit: 'kg', cost_per_unit: 15.00, supplier_id: null, allergens: [], calories_per_100g: 0, storage_zone: 'reserve_seche', min_stock: 0.5, max_stock: 2, current_stock: 0.3, expiry_date: null, last_cost_update: '2026-07-01', is_active: true },
  { id: 'i8', restaurant_id: DEMO_RESTAURANT_ID, name: 'Œufs', unit: 'pièce', cost_per_unit: 0.35, supplier_id: null, allergens: ['oeuf'], calories_per_100g: 155, storage_zone: 'froid_positif', min_stock: 24, max_stock: 120, current_stock: 80, expiry_date: '2026-08-05', last_cost_update: '2026-07-01', is_active: true },
  { id: 'i9', restaurant_id: DEMO_RESTAURANT_ID, name: 'Huile d\'olive', unit: 'L', cost_per_unit: 12.00, supplier_id: null, allergens: [], calories_per_100g: 884, storage_zone: 'reserve_seche', min_stock: 2, max_stock: 10, current_stock: 5, expiry_date: null, last_cost_update: '2026-07-01', is_active: true },
  { id: 'i10', restaurant_id: DEMO_RESTAURANT_ID, name: 'Vin rouge Côtes-du-Rhône', unit: 'bouteille', cost_per_unit: 6.00, supplier_id: null, allergens: ['sulfites'], calories_per_100g: 85, storage_zone: 'cave', min_stock: 12, max_stock: 60, current_stock: 30, expiry_date: null, last_cost_update: '2026-07-01', is_active: true },
]

export const DEMO_RESERVATIONS: Reservation[] = [
  { id: 'rv1', restaurant_id: DEMO_RESTAURANT_ID, customer_name: 'Dupont Marie', customer_phone: '06 12 34 56 78', customer_email: 'marie@email.fr', reservation_date: todayStr, reservation_time: '12:30', covers: 4, status: 'confirmed', special_requests: null, allergies: ['gluten'], customer_id: null, notes: null },
  { id: 'rv2', restaurant_id: DEMO_RESTAURANT_ID, customer_name: 'Martin Pierre', customer_phone: '06 23 45 67 89', customer_email: 'pierre@email.fr', reservation_date: todayStr, reservation_time: '13:00', covers: 2, status: 'confirmed', special_requests: null, allergies: [], customer_id: null, notes: null },
  { id: 'rv3', restaurant_id: DEMO_RESTAURANT_ID, customer_name: 'Petit Claire', customer_phone: '06 34 45 67 80', customer_email: 'claire@email.fr', reservation_date: todayStr, reservation_time: '20:00', covers: 6, status: 'confirmed', special_requests: 'Anniversaire', allergies: ['fruits_coques'], customer_id: null, notes: null },
  { id: 'rv4', restaurant_id: DEMO_RESTAURANT_ID, customer_name: 'Bernard Luc', customer_phone: '06 45 67 89 01', customer_email: 'luc@email.fr', reservation_date: todayStr, reservation_time: '20:30', covers: 2, status: 'confirmed', special_requests: null, allergies: [], customer_id: null, notes: null },
  { id: 'rv5', restaurant_id: DEMO_RESTAURANT_ID, customer_name: 'Lefevre Sophie', customer_phone: '06 56 78 90 12', customer_email: 'sophie@email.fr', reservation_date: todayStr, reservation_time: '21:00', covers: 3, status: 'confirmed', special_requests: null, allergies: ['lait'], customer_id: null, notes: null },
]

export const DEMO_ALERTS: Alert[] = [
  { type: 'stock_rupture', title: 'Rupture imminente', message: 'Herbes de Provence : stock à 0.3 kg (seuil min : 0.5 kg)', severity: 'high', action_url: '/stocks' },
  { type: 'peremption', title: 'Produit proche de péremption', message: 'Mozzarella di Bufala expire demain (stock : 2 kg)', severity: 'critical', action_url: '/stocks' },
  { type: 'stock_rupture', title: 'Stock insuffisant', message: 'Filet de bar : 1 kg restant (seuil min : 2 kg) — plat retiré de la carte', severity: 'high', action_url: '/stocks' },
  { type: 'absence', title: 'Absence non remplacée', message: 'Plongeur absent ce midi (appel maladie)', severity: 'high', action_url: '/equipe' },
  { type: 'hygiene', title: 'Température anormale', message: 'Réfrigérateur cuisine 2 à 5.2°C (max : 4°C)', severity: 'critical', action_url: '/hygiene' },
  { type: 'avis_negatif', title: 'Nouvel avis négatif', message: 'Camille R. (2★) : "Déçue par le rapport qualité-prix"', severity: 'normal', action_url: '/clients' },
  { type: 'facture', title: 'Facture impayée', message: 'Commande Métro semaine 29 : 580€ — échéance dans 3 jours', severity: 'normal', action_url: '/ventes' },
]

export const DEMO_REVIEWS: Review[] = [
  { id: 'rev1', restaurant_id: DEMO_RESTAURANT_ID, platform: 'google', author_name: 'Sophie M.', rating: 5, comment: 'Excellent repas !', response: 'Merci Sophie ! À bientôt.', status: 'responded', review_date: '2026-07-20' },
  { id: 'rev2', restaurant_id: DEMO_RESTAURANT_ID, platform: 'google', author_name: 'Thomas L.', rating: 3, comment: 'Bonne cuisine mais service lent.', response: null, status: 'read', review_date: '2026-07-22' },
  { id: 'rev3', restaurant_id: DEMO_RESTAURANT_ID, platform: 'tripadvisor', author_name: 'Julien D.', rating: 4, comment: 'Adresse à découvrir !', response: 'Merci beaucoup !', status: 'responded', review_date: '2026-07-18' },
  { id: 'rev4', restaurant_id: DEMO_RESTAURANT_ID, platform: 'google', author_name: 'Camille R.', rating: 2, comment: 'Déçue par le rapport qualité-prix.', response: null, status: 'new', review_date: '2026-07-24' },
  { id: 'rev5', restaurant_id: DEMO_RESTAURANT_ID, platform: 'thefork', author_name: 'Pierre K.', rating: 5, comment: 'Belle surprise !', response: null, status: 'new', review_date: '2026-07-25' },
]

export const DEMO_INCIDENTS: Incident[] = [
  { id: 'inc1', restaurant_id: DEMO_RESTAURANT_ID, type: 'panne', severity: 'high', description: 'Plaque induction n°3 ne chauffe plus', zone: 'cuisine', reported_by: null, assigned_to: null, status: 'in_progress', resolution: null, incident_date: '2026-07-25T08:00:00Z', resolved_at: null },
  { id: 'inc2', restaurant_id: DEMO_RESTAURANT_ID, type: 'personnel', severity: 'normal', description: 'Appel maladie du plongeur', zone: 'personnel', reported_by: null, assigned_to: null, status: 'open', resolution: null, incident_date: '2026-07-26T07:30:00Z', resolved_at: null },
]

export const DEMO_TEMPERATURES: TemperatureLog[] = [
  { id: 't1', restaurant_id: DEMO_RESTAURANT_ID, equipment_name: 'Réfrigérateur cuisine 1', zone: 'cuisine', temperature: 3.5, min_temp: 0, max_temp: 4, is_alert: false, logged_by: null, log_date: '2026-07-26T08:00:00Z', notes: null },
  { id: 't2', restaurant_id: DEMO_RESTAURANT_ID, equipment_name: 'Réfrigérateur cuisine 2', zone: 'cuisine', temperature: 5.2, min_temp: 0, max_temp: 4, is_alert: true, logged_by: null, log_date: '2026-07-26T08:00:00Z', notes: null },
  { id: 't3', restaurant_id: DEMO_RESTAURANT_ID, equipment_name: 'Congélateur', zone: 'cuisine', temperature: -18, min_temp: -20, max_temp: -15, is_alert: false, logged_by: null, log_date: '2026-07-26T08:00:00Z', notes: null },
]

export const DEMO_NOTIFICATIONS: Notification[] = [
  { id: 'n1', restaurant_id: DEMO_RESTAURANT_ID, user_id: 'u1', type: 'alert', title: 'Température anormale', message: 'Frigo cuisine 2 à 5.2°C', is_read: false, action_url: '/hygiene', created_at: '2026-07-26T08:00:00Z' },
  { id: 'n2', restaurant_id: DEMO_RESTAURANT_ID, user_id: 'u1', type: 'warning', title: 'Rupture stock', message: 'Herbes de Provence sous le seuil', is_read: false, action_url: '/stocks', created_at: '2026-07-26T07:00:00Z' },
  { id: 'n3', restaurant_id: DEMO_RESTAURANT_ID, user_id: 'u1', type: 'task', title: 'Absence à remplacer', message: 'Plongeur absent ce midi', is_read: false, action_url: '/equipe', created_at: '2026-07-26T06:30:00Z' },
  { id: 'n4', restaurant_id: DEMO_RESTAURANT_ID, user_id: 'u1', type: 'reminder', title: 'Nouvel avis', message: 'Camille R. a laissé un avis 2★', is_read: true, action_url: '/clients', created_at: '2026-07-25T18:00:00Z' },
]

export const DEMO_TASKS: Task[] = [
  { id: 'tk1', restaurant_id: DEMO_RESTAURANT_ID, title: 'Vérifier les températures', description: 'Relevé HACCP du matin', category: 'ouverture', assigned_to: null, due_date: todayStr, due_time: '09:00', status: 'in_progress', priority: 'high', photo_url: null, completed_at: null, completed_by: null },
  { id: 'tk2', restaurant_id: DEMO_RESTAURANT_ID, title: 'Commander herbes de Provence', description: 'Urgent : rupture de stock', category: 'service', assigned_to: null, due_date: todayStr, due_time: '10:00', status: 'pending', priority: 'urgent', photo_url: null, completed_at: null, completed_by: null },
  { id: 'tk3', restaurant_id: DEMO_RESTAURANT_ID, title: 'Nettoyage hotte', description: 'Nettoyage hebdomadaire hotte cuisine', category: 'nettoyage', assigned_to: null, due_date: todayStr, due_time: '14:00', status: 'pending', priority: 'normal', photo_url: null, completed_at: null, completed_by: null },
  { id: 'tk4', restaurant_id: DEMO_RESTAURANT_ID, title: 'Mise à jour carte des vins', description: 'Ajouter le nouveau Sancerre', category: 'administratif', assigned_to: null, due_date: '2026-07-27', due_time: null, status: 'pending', priority: 'low', photo_url: null, completed_at: null, completed_by: null },
]

// Helper: aggregate sales data for dashboard
export function getDashboardSummary(): DashboardSummary {
  const todayStr = new Date().toISOString().split('T')[0]
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  const lastWeek = new Date()
  lastWeek.setDate(lastWeek.getDate() - 7)
  const lastWeekStr = lastWeek.toISOString().split('T')[0]

  const todaySales = DEMO_SALES.filter(s => s.sale_date === todayStr)
  const yesterdaySales = DEMO_SALES.filter(s => s.sale_date === yesterdayStr)
  const lastWeekSales = DEMO_SALES.filter(s => s.sale_date === lastWeekStr)

  const dailyRevenue = todaySales.reduce((sum, s) => sum + s.total_amount - s.discounts, 0)
  const yesterdayRevenue = yesterdaySales.reduce((sum, s) => sum + s.total_amount - s.discounts, 0)
  const lastWeekRevenue = lastWeekSales.reduce((sum, s) => sum + s.total_amount - s.discounts, 0)
  const totalCovers = todaySales.reduce((sum, s) => sum + s.covers, 0)

  return {
    daily_revenue: dailyRevenue,
    yesterday_revenue: yesterdayRevenue || 1553, // fallback demo value
    last_week_revenue: lastWeekRevenue || 1610,
    daily_objective: 1500,
    covers: totalCovers || 45,
    avg_basket: totalCovers > 0 ? Math.round(dailyRevenue / totalCovers * 100) / 100 : 35.50,
    fill_rate: Math.min(100, Math.round((totalCovers / 90) * 100)) || 50,
    upcoming_reservations: DEMO_RESERVATIONS.length,
    estimated_food_cost: 560,
    estimated_margin: 68.5,
    planned_hours: 42,
    actual_hours: 38,
    health_score: 72,
    alerts: DEMO_ALERTS,
    priority_actions: [
      'Commander d\'urgence les herbes de Provence (rupture imminente)',
      'Réaffecter le personnel pour couvrir l\'absence du plongeur ce midi',
      'Vérifier le réfrigérateur cuisine 2 (température à 5.2°C)',
    ],
  }
}

// Get weekly sales data for charts
export function getWeeklySalesData() {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  const weekSales: { name: string; revenu: number; couverts: number }[] = []

  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    const daySales = DEMO_SALES.filter(s => s.sale_date === dateStr)
    const total = daySales.reduce((sum, s) => sum + s.total_amount - s.discounts, 0)
    const covers = daySales.reduce((sum, s) => sum + s.covers, 0)
    weekSales.push({
      name: days[date.getDay()],
      revenu: total,
      couverts: covers,
    })
  }

  return weekSales
}

// Calculate menu engineering matrix
export function getMenuEngineeringMatrix() {
  // Simulate sales counts per recipe
  const recipeSales: Record<string, number> = {
    'r1': 28, 'r2': 15, 'r3': 22, 'r4': 18,
    'r5': 45, 'r6': 38, 'r7': 8, 'r8': 32, 'r9': 20, 'r10': 25,
    'r11': 30, 'r12': 22, 'r13': 15,
  }

  const avgSales = Object.values(recipeSales).reduce((a, b) => a + b, 0) / Object.values(recipeSales).length

  return DEMO_RECIPES.map(r => {
    const sold = recipeSales[r.id] || 0
    const margin = r.margin_percent || 0
    let category: 'star' | 'cheval_de_labour' | 'enigme' | 'poids_mort'

    if (sold >= avgSales && margin >= 68) category = 'star'
    else if (sold >= avgSales && margin < 68) category = 'cheval_de_labour'
    else if (sold < avgSales && margin >= 68) category = 'enigme'
    else category = 'poids_mort'

    return { ...r, sold, matrixCategory: category }
  })
}
