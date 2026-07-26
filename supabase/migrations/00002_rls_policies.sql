-- Enable RLS on all tables
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE timesheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_execution_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE temperature_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Helper functions
CREATE OR REPLACE FUNCTION get_user_restaurant_id()
RETURNS UUID LANGUAGE SQL STABLE AS $$
  SELECT restaurant_id FROM users WHERE id = auth.uid()
$$;

CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT LANGUAGE SQL STABLE AS $$
  SELECT role FROM users WHERE id = auth.uid()
$$;

-- Policies
CREATE POLICY "restaurant_isolation" ON restaurants FOR ALL USING (id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON users FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON employees FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON suppliers FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON ingredients FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON recipes FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON recipe_ingredients FOR ALL USING (recipe_id IN (SELECT id FROM recipes WHERE restaurant_id = get_user_restaurant_id()));
CREATE POLICY "restaurant_isolation" ON sales FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON sale_items FOR ALL USING (sale_id IN (SELECT id FROM sales WHERE restaurant_id = get_user_restaurant_id()));
CREATE POLICY "restaurant_isolation" ON expenses FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON schedules FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON timesheets FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON tasks FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON checklists FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON checklist_items FOR ALL USING (checklist_id IN (SELECT id FROM checklists WHERE restaurant_id = get_user_restaurant_id()));
CREATE POLICY "restaurant_isolation" ON checklist_executions FOR ALL USING (checklist_id IN (SELECT id FROM checklists WHERE restaurant_id = get_user_restaurant_id()));
CREATE POLICY "restaurant_isolation" ON temperature_logs FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON incidents FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON reservations FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON reviews FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON documents FOR ALL USING (restaurant_id = get_user_restaurant_id());
CREATE POLICY "restaurant_isolation" ON notifications FOR ALL USING (restaurant_id = get_user_restaurant_id() OR user_id = auth.uid());

CREATE POLICY "users_see_own_profile" ON users FOR SELECT USING (id = auth.uid());
CREATE POLICY "users_update_own_profile" ON users FOR UPDATE USING (id = auth.uid());
