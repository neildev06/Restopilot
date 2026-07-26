-- RestoPilot Schema Migration

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  capacity INT NOT NULL DEFAULT 45,
  open_days INT[] NOT NULL DEFAULT '{2,3,4,5,6,7}',
  opening_time TIME NOT NULL DEFAULT '11:30',
  closing_time TIME NOT NULL DEFAULT '23:00',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  restaurant_id UUID REFERENCES restaurants(id),
  role TEXT NOT NULL CHECK (role IN ('gerant', 'responsable_salle', 'chef_cuisine', 'employe', 'comptable')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  hourly_rate DECIMAL(6,2),
  position TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE employees (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id UUID REFERENCES restaurants(id),
  contract_type TEXT CHECK (contract_type IN ('cdi', 'cdd', 'saisonnier', 'interim')),
  weekly_hours INT,
  skills TEXT[],
  available_days INT[],
  unavailable_dates DATE[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  delivery_days TEXT[],
  min_order DECIMAL(8,2),
  payment_terms TEXT,
  quality_rating INT CHECK (quality_rating BETWEEN 1 AND 5),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  cost_per_unit DECIMAL(8,2) NOT NULL,
  supplier_id UUID REFERENCES suppliers(id),
  allergens TEXT[] DEFAULT '{}',
  calories_per_100g INT,
  storage_zone TEXT CHECK (storage_zone IN ('reserve_seche', 'froid_positif', 'congelateur', 'bar', 'cave', 'entretien')),
  min_stock DECIMAL(8,2) DEFAULT 0,
  max_stock DECIMAL(8,2) DEFAULT 100,
  current_stock DECIMAL(8,2) DEFAULT 0,
  expiry_date DATE,
  last_cost_update TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  sub_recipes_from UUID[] DEFAULT '{}',
  cost_per_portion DECIMAL(8,2) NOT NULL,
  selling_price DECIMAL(8,2) NOT NULL,
  vat_rate DECIMAL(4,2) NOT NULL DEFAULT 10.00,
  margin_euros DECIMAL(8,2) GENERATED ALWAYS AS (selling_price - cost_per_portion) STORED,
  margin_percent DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE WHEN selling_price > 0 THEN ((selling_price - cost_per_portion) / selling_price * 100) ELSE 0 END
  ) STORED,
  is_available BOOLEAN DEFAULT true,
  is_sub_recipe BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES ingredients(id),
  quantity DECIMAL(8,3) NOT NULL,
  unit TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  sale_date DATE NOT NULL DEFAULT CURRENT_DATE,
  service TEXT NOT NULL CHECK (service IN ('dejeuner', 'diner', 'brunch')),
  channel TEXT NOT NULL CHECK (channel IN ('sur_place', 'a_emporter', 'livraison')),
  covers INT NOT NULL DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  discounts DECIMAL(8,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE sale_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id UUID REFERENCES sales(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes(id),
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(8,2) NOT NULL,
  discount DECIMAL(8,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  category TEXT NOT NULL CHECK (category IN ('achats', 'masse_salariale', 'loyer', 'energie', 'livraison', 'marketing', 'maintenance', 'autre')),
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_recurring BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  employee_id UUID REFERENCES employees(id),
  shift_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  position TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'absent', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE timesheets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  employee_id UUID REFERENCES employees(id),
  schedule_id UUID REFERENCES schedules(id),
  clock_in TIMESTAMPTZ NOT NULL,
  clock_out TIMESTAMPTZ,
  break_start TIMESTAMPTZ,
  break_end TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'on_break', 'clocked_out')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('ouverture', 'fermeture', 'service', 'nettoyage', 'maintenance', 'administratif')),
  assigned_to UUID REFERENCES employees(id),
  due_date DATE,
  due_time TIME,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  photo_url TEXT,
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES employees(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('ouverture', 'mise_en_place', 'nettoyage', 'fermeture', 'caisse', 'securite')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checklist_id UUID REFERENCES checklists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  zone TEXT,
  assigned_role TEXT,
  is_critical BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE checklist_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checklist_id UUID REFERENCES checklists(id),
  executed_by UUID REFERENCES employees(id),
  execution_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'partial')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE checklist_execution_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id UUID REFERENCES checklist_executions(id) ON DELETE CASCADE,
  checklist_item_id UUID REFERENCES checklist_items(id),
  is_done BOOLEAN DEFAULT false,
  done_by UUID REFERENCES employees(id),
  done_at TIMESTAMPTZ,
  photo_url TEXT,
  notes TEXT
);

CREATE TABLE temperature_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  equipment_name TEXT NOT NULL,
  zone TEXT,
  temperature DECIMAL(5,2) NOT NULL,
  min_temp DECIMAL(5,2),
  max_temp DECIMAL(5,2),
  logged_by UUID REFERENCES employees(id),
  log_date TIMESTAMPTZ DEFAULT now(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  type TEXT NOT NULL CHECK (type IN ('panne', 'client_mcontent', 'livraison', 'casse', 'accident', 'personnel', 'sanitaire', 'autre')),
  severity TEXT DEFAULT 'normal' CHECK (severity IN ('low', 'normal', 'high', 'critical')),
  description TEXT NOT NULL,
  zone TEXT,
  reported_by UUID REFERENCES employees(id),
  assigned_to UUID REFERENCES employees(id),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  resolution TEXT,
  photo_url TEXT,
  incident_date TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  covers INT NOT NULL DEFAULT 2,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'seated', 'completed', 'cancelled', 'no_show')),
  special_requests TEXT,
  allergies TEXT[] DEFAULT '{}',
  customer_id UUID,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  platform TEXT NOT NULL CHECK (platform IN ('google', 'tripadvisor', 'thefork', 'livraison', 'autre')),
  author_name TEXT,
  rating DECIMAL(2,1),
  comment TEXT,
  response TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'resolved')),
  review_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('licence', 'assurance', 'formation', 'controle', 'contrat', 'autre')),
  file_url TEXT,
  expiry_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  user_id UUID REFERENCES users(id),
  type TEXT NOT NULL CHECK (type IN ('alert', 'reminder', 'task', 'info', 'warning')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- INDEXES
CREATE INDEX idx_ingredients_restaurant ON ingredients(restaurant_id);
CREATE INDEX idx_ingredients_stock ON ingredients(current_stock, min_stock);
CREATE INDEX idx_ingredients_expiry ON ingredients(expiry_date);
CREATE INDEX idx_recipes_restaurant ON recipes(restaurant_id);
CREATE INDEX idx_sales_date ON sales(sale_date, restaurant_id);
CREATE INDEX idx_schedules_date ON schedules(shift_date, restaurant_id);
CREATE INDEX idx_timesheets_employee ON timesheets(employee_id, clock_in);
CREATE INDEX idx_tasks_status ON tasks(status, restaurant_id, due_date);
CREATE INDEX idx_temperature_logs ON temperature_logs(equipment_name, log_date);
CREATE INDEX idx_reservations_date ON reservations(reservation_date, restaurant_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
