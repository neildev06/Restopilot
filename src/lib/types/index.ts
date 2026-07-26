// Database enums
export type UserRole = 'gerant' | 'responsable_salle' | 'chef_cuisine' | 'employe' | 'comptable'
export type StorageZone = 'reserve_seche' | 'froid_positif' | 'congelateur' | 'bar' | 'cave' | 'entretien'
export type ServiceType = 'dejeuner' | 'diner' | 'brunch'
export type SaleChannel = 'sur_place' | 'a_emporter' | 'livraison'
export type TaskCategory = 'ouverture' | 'fermeture' | 'service' | 'nettoyage' | 'maintenance' | 'administratif'
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue'
export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent'
export type IncidentType = 'panne' | 'client_mcontent' | 'livraison' | 'casse' | 'accident' | 'personnel' | 'sanitaire' | 'autre'
export type IncidentSeverity = 'low' | 'normal' | 'high' | 'critical'
export type ChecklistType = 'ouverture' | 'mise_en_place' | 'nettoyage' | 'fermeture' | 'caisse' | 'securite'
export type ReviewStatus = 'new' | 'read' | 'responded' | 'resolved'
export type ReservationStatus = 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no_show'
export type Allergen = 'gluten' | 'lait' | 'oeuf' | 'poisson' | 'crustaces' | 'fruits_coques' | 'soja' | 'sesame' | 'celeri' | 'moutarde' | 'lupin' | 'sulfites'

export interface Restaurant {
  id: string
  name: string
  address: string | null
  phone: string | null
  email: string | null
  capacity: number
  open_days: number[]
  opening_time: string
  closing_time: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  restaurant_id: string | null
  role: UserRole
  first_name: string
  last_name: string
  phone: string | null
  hourly_rate: number | null
  position: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Ingredient {
  id: string
  restaurant_id: string
  name: string
  unit: string
  cost_per_unit: number
  supplier_id: string | null
  allergens: Allergen[]
  calories_per_100g: number | null
  storage_zone: StorageZone | null
  min_stock: number
  max_stock: number
  current_stock: number
  expiry_date: string | null
  last_cost_update: string
  is_active: boolean
}

export interface Recipe {
  id: string
  restaurant_id: string
  name: string
  description: string | null
  category: string
  sub_recipes_from: string[]
  cost_per_portion: number
  selling_price: number
  vat_rate: number
  margin_euros: number
  margin_percent: number
  is_available: boolean
  is_sub_recipe: boolean
  created_at: string
  updated_at: string
}

export interface Supplier {
  id: string
  restaurant_id: string
  name: string
  contact_name: string | null
  email: string | null
  phone: string | null
  address: string | null
  delivery_days: string[]
  min_order: number | null
  payment_terms: string | null
  quality_rating: number | null
  is_active: boolean
}

export interface Sale {
  id: string
  restaurant_id: string
  sale_date: string
  service: ServiceType
  channel: SaleChannel
  covers: number
  total_amount: number
  discounts: number
}

export interface SaleItem {
  id: string
  sale_id: string
  recipe_id: string | null
  quantity: number
  unit_price: number
  discount: number
}

export interface Expense {
  id: string
  restaurant_id: string
  category: string
  description: string
  amount: number
  expense_date: string
  is_recurring: boolean
}

export interface Schedule {
  id: string
  restaurant_id: string
  employee_id: string
  shift_date: string
  start_time: string
  end_time: string
  position: string
  status: string
  notes: string | null
}

export interface Timesheet {
  id: string
  restaurant_id: string
  employee_id: string
  schedule_id: string | null
  clock_in: string
  clock_out: string | null
  break_start: string | null
  break_end: string | null
  status: string
}

export interface Task {
  id: string
  restaurant_id: string
  title: string
  description: string | null
  category: TaskCategory | null
  assigned_to: string | null
  due_date: string | null
  due_time: string | null
  status: TaskStatus
  priority: TaskPriority
  photo_url: string | null
  completed_at: string | null
  completed_by: string | null
}

export interface Checklist {
  id: string
  restaurant_id: string
  name: string
  type: ChecklistType
  is_active: boolean
}

export interface ChecklistItem {
  id: string
  checklist_id: string
  title: string
  description: string | null
  zone: string | null
  assigned_role: string | null
  is_critical: boolean
  sort_order: number
}

export interface Reservation {
  id: string
  restaurant_id: string
  customer_name: string
  customer_phone: string | null
  customer_email: string | null
  reservation_date: string
  reservation_time: string
  covers: number
  status: ReservationStatus
  special_requests: string | null
  allergies: string[]
  customer_id: string | null
  notes: string | null
}

export interface Review {
  id: string
  restaurant_id: string
  platform: string
  author_name: string | null
  rating: number | null
  comment: string | null
  response: string | null
  status: ReviewStatus
  review_date: string
}

export interface Incident {
  id: string
  restaurant_id: string
  type: IncidentType
  severity: IncidentSeverity
  description: string
  zone: string | null
  reported_by: string | null
  assigned_to: string | null
  status: string
  resolution: string | null
  incident_date: string
  resolved_at: string | null
}

export interface TemperatureLog {
  id: string
  restaurant_id: string
  equipment_name: string
  zone: string | null
  temperature: number
  min_temp: number | null
  max_temp: number | null
  is_alert: boolean | null
  logged_by: string | null
  log_date: string
  notes: string | null
}

export interface Notification {
  id: string
  restaurant_id: string
  user_id: string
  type: 'alert' | 'reminder' | 'task' | 'info' | 'warning'
  title: string
  message: string
  is_read: boolean
  action_url: string | null
  created_at: string
}

export interface DashboardSummary {
  daily_revenue: number
  yesterday_revenue: number
  last_week_revenue: number
  daily_objective: number
  covers: number
  avg_basket: number
  fill_rate: number
  upcoming_reservations: number
  estimated_food_cost: number
  estimated_margin: number
  planned_hours: number
  actual_hours: number
  health_score: number
  alerts: Alert[]
  priority_actions: string[]
}

export interface Alert {
  type: 'stock_rupture' | 'peremption' | 'absence' | 'hygiene' | 'avis_negatif' | 'facture'
  title: string
  message: string
  severity: 'low' | 'normal' | 'high' | 'critical'
  action_url?: string
}

export interface Ingredient {
  id: string
  restaurant_id: string
  name: string
  unit: string
  cost_per_unit: number
  supplier_id: string | null
  allergens: Allergen[]
  calories_per_100g: number | null
  storage_zone: StorageZone | null
  min_stock: number
  max_stock: number
  current_stock: number
  expiry_date: string | null
  last_cost_update: string
  is_active: boolean
}
