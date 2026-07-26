-- RestoPilot Demo Data: Le Comptoir Provençal
-- Restaurant français de 45 couverts, ouvert du mardi au dimanche

-- RESTAURANT
INSERT INTO restaurants (id, name, address, phone, email, capacity, open_days, opening_time, closing_time)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Le Comptoir Provençal',
  '42 Rue du Four, 75006 Paris',
  '+33 1 42 00 00 00',
  'contact@comptoir-provencal.fr',
  45,
  '{2,3,4,5,6,7}',
  '11:30',
  '23:00'
);

-- FOURNISSEURS
INSERT INTO suppliers (id, restaurant_id, name, contact_name, email, phone, delivery_days, min_order, quality_rating, is_active) VALUES
('b1000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Métro Grands Magasins', 'Jean Dupont', 'j.dupont@metro.fr', '01 55 00 00 01', '{lundi,mercredi,vendredi}', 100.00, 4, true),
('b1000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Boucherie du Marché', 'Pierre Martin', 'pierre@boucherie-marche.fr', '01 55 00 00 02', '{mardi,jeudi,samedi}', 50.00, 5, true),
('b1000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Primeurs Bio Paris', 'Marie Laurent', 'marie@primeurs-bio.fr', '01 55 00 00 03', '{lundi,jeudi}', 30.00, 4, true),
('b1000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Cave des Sommeliers', 'Luc Besson', 'luc@cave-sommeliers.fr', '01 55 00 00 04', '{mardi,samedi}', 80.00, 5, true),
('b1000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'Crèmerie Fermière', 'Sophie Petit', 'sophie@cremerie-fermiere.fr', '01 55 00 00 05', '{mercredi,samedi}', 20.00, 5, true);

-- INGRÉDIENTS
INSERT INTO ingredients (id, restaurant_id, name, unit, cost_per_unit, supplier_id, allergens, calories_per_100g, storage_zone, min_stock, max_stock, current_stock, expiry_date) VALUES
('c1000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Poulet fermier', 'kg', 12.50, 'b1000000-0000-0000-0000-000000000002', '{}', 165, 'froid_positif', 5, 20, 8, '2026-07-29'),
('c1000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Bœuf à braiser', 'kg', 18.00, 'b1000000-0000-0000-0000-000000000002', '{}', 250, 'froid_positif', 3, 15, 5, '2026-07-28'),
('c1000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Agneau', 'kg', 22.00, 'b1000000-0000-0000-0000-000000000002', '{}', 290, 'froid_positif', 2, 10, 3, '2026-07-30'),
('c1000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Filet de bar', 'kg', 24.00, 'b1000000-0000-0000-0000-000000000002', '{poisson}', 90, 'froid_positif', 2, 8, 1, '2026-07-28'),
('c1000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'Crevettes', 'kg', 16.00, 'b1000000-0000-0000-0000-000000000002', '{crustaces}', 85, 'congelateur', 1, 5, 3, '2026-09-01'),
('c1000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000001', 'Tomates cœur de bœuf', 'kg', 4.50, 'b1000000-0000-0000-0000-000000000003', '{}', 18, 'froid_positif', 3, 15, 6, '2026-07-28'),
('c1000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000001', 'Courgettes bio', 'kg', 3.20, 'b1000000-0000-0000-0000-000000000003', '{}', 16, 'froid_positif', 2, 10, 5, '2026-07-29'),
('c1000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000001', 'Aubergines', 'kg', 3.80, 'b1000000-0000-0000-0000-000000000003', '{}', 20, 'froid_positif', 2, 10, 4, '2026-07-28'),
('c1000000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000001', 'Oignons', 'kg', 1.80, 'b1000000-0000-0000-0000-000000000003', '{}', 40, 'reserve_seche', 5, 20, 18, NULL),
('c1000000-0000-0000-0000-000000000015', 'a0000000-0000-0000-0000-000000000001', 'Ail', 'kg', 3.00, 'b1000000-0000-0000-0000-000000000003', '{}', 149, 'reserve_seche', 1, 5, 3, NULL),
('c1000000-0000-0000-0000-000000000016', 'a0000000-0000-0000-0000-000000000001', 'Citrons', 'kg', 2.50, 'b1000000-0000-0000-0000-000000000003', '{}', 29, 'froid_positif', 2, 10, 7, '2026-08-02'),
('c1000000-0000-0000-0000-000000000017', 'a0000000-0000-0000-0000-000000000001', 'Pommes de terre', 'kg', 1.50, 'b1000000-0000-0000-0000-000000000003', '{}', 77, 'reserve_seche', 10, 40, 25, NULL),
('c1000000-0000-0000-0000-000000000020', 'a0000000-0000-0000-0000-000000000001', 'Crème fraîche', 'L', 4.50, 'b1000000-0000-0000-0000-000000000005', '{lait}', 300, 'froid_positif', 2, 10, 4, '2026-07-28'),
('c1000000-0000-0000-0000-000000000021', 'a0000000-0000-0000-0000-000000000001', 'Beurre doux', 'kg', 6.00, 'b1000000-0000-0000-0000-000000000005', '{lait}', 717, 'froid_positif', 1, 5, 2, '2026-08-05'),
('c1000000-0000-0000-0000-000000000022', 'a0000000-0000-0000-0000-000000000001', 'Parmesan', 'kg', 14.00, 'b1000000-0000-0000-0000-000000000005', '{lait}', 431, 'froid_positif', 1, 5, 2, '2026-08-10'),
('c1000000-0000-0000-0000-000000000024', 'a0000000-0000-0000-0000-000000000001', 'Œufs', 'pièce', 0.35, 'b1000000-0000-0000-0000-000000000005', '{oeuf}', 155, 'froid_positif', 24, 120, 80, '2026-08-05'),
('c1000000-0000-0000-0000-000000000030', 'a0000000-0000-0000-0000-000000000001', 'Huile d''olive extra vierge', 'L', 12.00, 'b1000000-0000-0000-0000-000000000001', '{}', 884, 'reserve_seche', 2, 10, 5, NULL),
('c1000000-0000-0000-0000-000000000031', 'a0000000-0000-0000-0000-000000000001', 'Pâtes penne', 'kg', 2.50, 'b1000000-0000-0000-0000-000000000001', '{gluten}', 350, 'reserve_seche', 3, 20, 12, NULL),
('c1000000-0000-0000-0000-000000000032', 'a0000000-0000-0000-0000-000000000001', 'Riz arborio', 'kg', 4.00, 'b1000000-0000-0000-0000-000000000001', '{}', 354, 'reserve_seche', 2, 10, 7, NULL),
('c1000000-0000-0000-0000-000000000040', 'a0000000-0000-0000-0000-000000000001', 'Vin rouge Côtes-du-Rhône', 'bouteille', 6.00, 'b1000000-0000-0000-0000-000000000004', '{sulfites}', 85, 'cave', 12, 60, 30, NULL),
('c1000000-0000-0000-0000-000000000041', 'a0000000-0000-0000-0000-000000000001', 'Vin blanc Sancerre', 'bouteille', 8.00, 'b1000000-0000-0000-0000-000000000004', '{sulfites}', 82, 'cave', 6, 30, 18, NULL),
('c1000000-0000-0000-0000-000000000050', 'a0000000-0000-0000-0000-000000000001', 'Herbes de Provence', 'kg', 15.00, 'b1000000-0000-0000-0000-000000000001', '{}', 0, 'reserve_seche', 0.5, 2, 0.3, NULL),
('c1000000-0000-0000-0000-000000000052', 'a0000000-0000-0000-0000-000000000001', 'Thym frais', 'pièce', 1.00, 'b1000000-0000-0000-0000-000000000003', '{}', 0, 'froid_positif', 3, 15, 2, '2026-07-27');

-- RECETTES
INSERT INTO recipes (id, restaurant_id, name, description, category, cost_per_portion, selling_price, vat_rate, is_available, is_sub_recipe) VALUES
('d1000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Salade de chèvre chaud', 'Salade verte, tomates, crottin chaud, miel', 'entree', 3.50, 12.00, 10.00, true, false),
('d1000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Bruschetta tomate-basilic', 'Pain grillé, tomates fraîches, basilic, huile d''olive', 'entree', 2.80, 9.50, 10.00, true, false),
('d1000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Tartare de bœuf', 'Bœuf haché, câpres, cornichons, moutarde', 'entree', 5.20, 15.00, 10.00, true, false),
('d1000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000001', 'Poulet rôti aux herbes', 'Poulet fermier, herbes de Provence, légumes', 'plat', 5.80, 18.50, 10.00, true, false),
('d1000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000001', 'Boeuf bourguignon', 'Bœuf braisé au vin rouge, carottes, champignons', 'plat', 6.50, 20.00, 10.00, true, false),
('d1000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000001', 'Filet de bar provençale', 'Filet de bar, tomates confites, olives, courgettes', 'plat', 8.00, 22.00, 10.00, false, false),
('d1000000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000001', 'Risotto aux champignons', 'Riz arborio, champignons, parmesan, crème', 'plat', 4.50, 16.00, 10.00, true, false),
('d1000000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000001', 'Penne puttanesca', 'Pennes, tomates, olives, câpres, ail, basilic', 'plat', 3.20, 14.00, 10.00, true, false),
('d1000000-0000-0000-0000-000000000015', 'a0000000-0000-0000-0000-000000000001', 'Ratatouille et œuf poché', 'Courgettes, aubergines, poivrons, tomates, œuf', 'plat', 3.80, 15.50, 10.00, true, false),
('d1000000-0000-0000-0000-000000000020', 'a0000000-0000-0000-0000-000000000001', 'Tarte au citron meringuée', 'Pâte sablée, crème citron, meringue italienne', 'dessert', 2.50, 9.00, 10.00, true, false),
('d1000000-0000-0000-0000-000000000021', 'a0000000-0000-0000-0000-000000000001', 'Crème brûlée lavande', 'Crème aux œufs, lavande, sucre caramélisé', 'dessert', 2.00, 8.50, 10.00, true, false),
('d1000000-0000-0000-0000-000000000030', 'a0000000-0000-0000-0000-000000000001', 'Pâte brisée', 'Préparation de base pour tartes', 'preparation', 0.80, 0, 10.00, true, true);

-- INGRÉDIENTS PAR RECETTE
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('d1000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000001', 0.200, 'kg'),
('d1000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000050', 0.005, 'kg'),
('d1000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000030', 0.030, 'L'),
('d1000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000002', 0.180, 'kg'),
('d1000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000040', 0.150, 'bouteille'),
('d1000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000014', 0.050, 'kg'),
('d1000000-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000032', 0.080, 'kg'),
('d1000000-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000022', 0.020, 'kg'),
('d1000000-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000020', 0.050, 'L'),
('d1000000-0000-0000-0000-000000000020', 'c1000000-0000-0000-0000-000000000016', 2.000, 'pièce'),
('d1000000-0000-0000-0000-000000000020', 'c1000000-0000-0000-0000-000000000024', 2.000, 'pièce');

-- VENTES (14 derniers jours)
INSERT INTO sales (id, restaurant_id, sale_date, service, channel, covers, total_amount, discounts) VALUES
('e1000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', '2026-07-14', 'dejeuner', 'sur_place', 28, 420.00, 0),
('e1000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', '2026-07-14', 'diner', 'sur_place', 35, 595.00, 15.00),
('e1000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', '2026-07-15', 'dejeuner', 'sur_place', 32, 480.00, 0),
('e1000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', '2026-07-15', 'diner', 'sur_place', 42, 756.00, 10.00),
('e1000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', '2026-07-16', 'dejeuner', 'sur_place', 30, 450.00, 0),
('e1000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', '2026-07-16', 'diner', 'sur_place', 38, 684.00, 0),
('e1000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000001', '2026-07-17', 'dejeuner', 'sur_place', 40, 640.00, 0),
('e1000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000001', '2026-07-17', 'diner', 'sur_place', 45, 990.00, 20.00),
('e1000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000001', '2026-07-17', 'diner', 'livraison', 8, 120.00, 0),
('e1000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000001', '2026-07-18', 'dejeuner', 'sur_place', 38, 646.00, 0),
('e1000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000001', '2026-07-18', 'diner', 'sur_place', 45, 1035.00, 15.00),
('e1000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000001', '2026-07-19', 'brunch', 'sur_place', 42, 756.00, 0),
('e1000000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000001', '2026-07-21', 'dejeuner', 'sur_place', 25, 375.00, 0),
('e1000000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000001', '2026-07-21', 'diner', 'sur_place', 38, 646.00, 0),
('e1000000-0000-0000-0000-000000000015', 'a0000000-0000-0000-0000-000000000001', '2026-07-22', 'dejeuner', 'sur_place', 30, 480.00, 0),
('e1000000-0000-0000-0000-000000000016', 'a0000000-0000-0000-0000-000000000001', '2026-07-22', 'diner', 'sur_place', 40, 720.00, 10.00),
('e1000000-0000-0000-0000-000000000017', 'a0000000-0000-0000-0000-000000000001', '2026-07-23', 'dejeuner', 'sur_place', 28, 420.00, 0),
('e1000000-0000-0000-0000-000000000018', 'a0000000-0000-0000-0000-000000000001', '2026-07-23', 'diner', 'sur_place', 42, 798.00, 0),
('e1000000-0000-0000-0000-000000000019', 'a0000000-0000-0000-0000-000000000001', '2026-07-24', 'dejeuner', 'sur_place', 38, 608.00, 0),
('e1000000-0000-0000-0000-000000000020', 'a0000000-0000-0000-0000-000000000001', '2026-07-24', 'diner', 'sur_place', 45, 945.00, 25.00);

-- DÉPENSES
INSERT INTO expenses (restaurant_id, category, description, amount, expense_date) VALUES
('a0000000-0000-0000-0000-000000000001', 'loyer', 'Loyer mensuel local', 3500.00, '2026-07-01'),
('a0000000-0000-0000-0000-000000000001', 'energie', 'Électricité EDF', 420.00, '2026-07-05'),
('a0000000-0000-0000-0000-000000000001', 'achats', 'Commande Métro semaine 29', 580.00, '2026-07-15'),
('a0000000-0000-0000-0000-000000000001', 'achats', 'Commande boucherie', 320.00, '2026-07-16'),
('a0000000-0000-0000-0000-000000000001', 'achats', 'Primeurs bio', 145.00, '2026-07-17'),
('a0000000-0000-0000-0000-000000000001', 'marketing', 'Google Ads campagne été', 200.00, '2026-07-10'),
('a0000000-0000-0000-0000-000000000001', 'maintenance', 'Réparation plaque induction', 350.00, '2026-07-08');

-- CHECK-LISTS
INSERT INTO checklists (id, restaurant_id, name, type) VALUES
('f1000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Ouverture - Matin', 'ouverture'),
('f1000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Mise en place midi', 'mise_en_place'),
('f1000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Fermeture du soir', 'fermeture'),
('f1000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'Caisse - Clôture de service', 'caisse');

INSERT INTO checklist_items (checklist_id, title, description, zone, assigned_role, is_critical, sort_order) VALUES
('f1000000-0000-0000-0000-000000000001', 'Allumer les équipements', 'Fours, plaques, hotte, lave-vaisselle', 'cuisine', 'chef_cuisine', false, 1),
('f1000000-0000-0000-0000-000000000001', 'Vérifier les températures', 'Noter les températures des frigos', 'cuisine', 'chef_cuisine', true, 2),
('f1000000-0000-0000-0000-000000000001', 'Contrôle visuel des produits', 'Vérifier l''état des aliments, DLC', 'cuisine', 'chef_cuisine', true, 3),
('f1000000-0000-0000-0000-000000000001', 'Mettre en place la salle', 'Nappes, couverts, serviettes, cartes', 'salle', 'responsable_salle', false, 4),
('f1000000-0000-0000-0000-000000000002', 'Préparer les légumes', 'Laver, éplucher, couper', 'cuisine', 'chef_cuisine', false, 1),
('f1000000-0000-0000-0000-000000000002', 'Vérifier les stocks', 'Tous les plats de la carte possibles', 'cuisine', 'chef_cuisine', true, 2),
('f1000000-0000-0000-0000-000000000003', 'Nettoyage cuisine', 'Plans de travail, sols, hotte', 'cuisine', 'chef_cuisine', true, 1),
('f1000000-0000-0000-0000-000000000003', 'Ranger les denrées', 'Fermer, étiqueter, dater', 'cuisine', 'chef_cuisine', true, 2),
('f1000000-0000-0000-0000-000000000003', 'Fermer les frigos', 'Vérifier fermeture', 'cuisine', 'chef_cuisine', true, 3),
('f1000000-0000-0000-0000-000000000003', 'Nettoyage salle', 'Tables, sols, toilettes', 'salle', 'responsable_salle', true, 4),
('f1000000-0000-0000-0000-000000000003', 'Sortir les poubelles', 'Déchets, cartons, verre', 'arriere', 'employe', false, 5),
('f1000000-0000-0000-0000-000000000003', 'Activer l''alarme', 'Portes et fenêtres fermées', 'securite', 'responsable_salle', true, 6),
('f1000000-0000-0000-0000-000000000005', 'Compter la caisse', 'Espèces et tickets', 'caisse', 'responsable_salle', true, 1),
('f1000000-0000-0000-0000-000000000005', 'Totaliser les tickets', 'Additionner les ventes', 'caisse', 'responsable_salle', true, 2),
('f1000000-0000-0000-0000-000000000005', 'Déposer la recette', 'Coffre ou banque', 'caisse', 'responsable_salle', true, 3);

-- RÉSERVATIONS
INSERT INTO reservations (restaurant_id, customer_name, customer_phone, customer_email, reservation_date, reservation_time, covers, status, allergies) VALUES
('a0000000-0000-0000-0000-000000000001', 'Dupont Marie', '06 12 34 56 78', 'marie.dupont@email.fr', '2026-07-26', '12:30', 4, 'confirmed', '{gluten}'),
('a0000000-0000-0000-0000-000000000001', 'Martin Pierre', '06 23 45 67 89', 'pierre.martin@email.fr', '2026-07-26', '13:00', 2, 'confirmed', '{}'),
('a0000000-0000-0000-0000-000000000001', 'Petit Claire', '06 34 45 67 80', 'claire.petit@email.fr', '2026-07-26', '20:00', 6, 'confirmed', '{fruits_coques}'),
('a0000000-0000-0000-0000-000000000001', 'Bernard Luc', '06 45 67 89 01', 'luc.bernard@email.fr', '2026-07-26', '20:30', 2, 'confirmed', '{}'),
('a0000000-0000-0000-0000-000000000001', 'Lefevre Sophie', '06 56 78 90 12', 'sophie.lefevre@email.fr', '2026-07-26', '21:00', 3, 'confirmed', '{lait}'),
('a0000000-0000-0000-0000-000000000001', 'Garcia Thomas', '06 67 89 01 23', 'thomas.garcia@email.fr', '2026-07-27', '12:00', 5, 'confirmed', '{}'),
('a0000000-0000-0000-0000-000000000001', 'Moreau Julie', '06 78 90 12 34', 'julie.moreau@email.fr', '2026-07-27', '12:30', 2, 'confirmed', '{}'),
('a0000000-0000-0000-0000-000000000001', 'Roux Antoine', '06 89 01 23 45', 'antoine.roux@email.fr', '2026-07-27', '20:00', 4, 'confirmed', '{sulfites}'),
('a0000000-0000-0000-0000-000000000001', 'Blanc Emma', '06 90 12 34 56', 'emma.blanc@email.fr', '2026-07-27', '20:30', 3, 'confirmed', '{}');

-- AVIS
INSERT INTO reviews (restaurant_id, platform, author_name, rating, comment, status, review_date) VALUES
('a0000000-0000-0000-0000-000000000001', 'google', 'Sophie M.', 5, 'Excellent repas ! Le poulet aux herbes était délicieux et le service impeccable.', 'responded', '2026-07-20'),
('a0000000-0000-0000-0000-000000000001', 'google', 'Thomas L.', 3, 'Bonne cuisine mais service un peu lent ce soir-là.', 'read', '2026-07-22'),
('a0000000-0000-0000-0000-000000000001', 'tripadvisor', 'Julien D.', 4, 'Une adresse qui mérite le détour. Produits frais, cuisine généreuse.', 'responded', '2026-07-18'),
('a0000000-0000-0000-0000-000000000001', 'google', 'Camille R.', 2, 'Déçue par le rapport qualité-prix. Les portions sont petites.', 'new', '2026-07-24'),
('a0000000-0000-0000-0000-000000000001', 'thefork', 'Pierre K.', 5, 'Belle surprise ! Le boeuf bourguignon est excellent.', 'new', '2026-07-25');

-- INCIDENTS
INSERT INTO incidents (restaurant_id, type, severity, description, zone, status, incident_date) VALUES
('a0000000-0000-0000-0000-000000000001', 'panne', 'high', 'Plaque induction n°3 ne chauffe plus', 'cuisine', 'in_progress', '2026-07-25'),
('a0000000-0000-0000-0000-000000000001', 'personnel', 'normal', 'Appel maladie du plongeur pour le service de ce midi', 'personnel', 'open', '2026-07-26');

-- TEMPÉRATURES
INSERT INTO temperature_logs (restaurant_id, equipment_name, zone, temperature, min_temp, max_temp, log_date) VALUES
('a0000000-0000-0000-0000-000000000001', 'Réfrigérateur cuisine 1', 'cuisine', 3.5, 0, 4, '2026-07-26T08:00:00Z'),
('a0000000-0000-0000-0000-000000000001', 'Réfrigérateur cuisine 2', 'cuisine', 5.2, 0, 4, '2026-07-26T08:00:00Z'),
('a0000000-0000-0000-0000-000000000001', 'Congélateur', 'cuisine', -18.0, -20, -15, '2026-07-26T08:00:00Z'),
('a0000000-0000-0000-0000-000000000001', 'Vitrine bar', 'bar', 4.0, 0, 6, '2026-07-26T08:00:00Z');

-- DOCUMENTS
INSERT INTO documents (restaurant_id, title, type, notes, expiry_date) VALUES
('a0000000-0000-0000-0000-000000000001', 'Licence IV', 'licence', 'Licence restaurant - Préfecture de Paris', '2027-06-15'),
('a0000000-0000-0000-0000-000000000001', 'Assurance RC Pro', 'assurance', 'Contrat AXA', '2027-03-01'),
('a0000000-0000-0000-0000-000000000001', 'Formation HACCP Chef', 'formation', 'Formation hygiène alimentaire', '2028-01-15'),
('a0000000-0000-0000-0000-000000000001', 'Contrôle vétérinaire', 'controle', 'Dernier passage : juillet 2025', '2026-08-15');
