-- Ajouter des sous-catégories pour les produits à vendre
INSERT INTO categories (name, slug, description, emoji, parent_id, display_order, is_active) VALUES
-- Sous-catégories pour "Produits à vendre"
('Téléphones & Smartphones', 'telephones-smartphones', 'Téléphones mobiles, smartphones et accessoires', '📱', 'f53bcc98-5d3b-45ab-8e59-0f444ac4175a', 1, true),
('Ordinateurs & Informatique', 'ordinateurs-informatique', 'PC, laptops, tablettes et équipements informatiques', '💻', 'f53bcc98-5d3b-45ab-8e59-0f444ac4175a', 2, true),
('Électroménager', 'electromenager', 'Appareils électroménagers pour la maison', '🏠', 'f53bcc98-5d3b-45ab-8e59-0f444ac4175a', 3, true),
('TV, Audio & Photo', 'tv-audio-photo', 'Télévisions, équipements audio et photo', '📺', 'f53bcc98-5d3b-45ab-8e59-0f444ac4175a', 4, true),
('Mode & Accessoires', 'mode-accessoires', 'Vêtements, chaussures et accessoires', '👕', 'f53bcc98-5d3b-45ab-8e59-0f444ac4175a', 5, true),
('Beauté & Parfums', 'beaute-parfums', 'Produits de beauté, cosmétiques et parfums', '💄', 'f53bcc98-5d3b-45ab-8e59-0f444ac4175a', 6, true),
('Sports & Loisirs', 'sports-loisirs', 'Équipements sportifs et de loisirs', '⚽', 'f53bcc98-5d3b-45ab-8e59-0f444ac4175a', 7, true),
('Maison & Jardin', 'maison-jardin', 'Meubles, décoration et jardinage', '🏡', 'f53bcc98-5d3b-45ab-8e59-0f444ac4175a', 8, true),
('Livres & Média', 'livres-media', 'Livres, films, musique et jeux', '📚', 'f53bcc98-5d3b-45ab-8e59-0f444ac4175a', 9, true),
('Jouets & Enfants', 'jouets-enfants', 'Jouets, articles pour bébés et enfants', '🧸', 'f53bcc98-5d3b-45ab-8e59-0f444ac4175a', 10, true),

-- Sous-catégories pour "Véhicules" 
('Voitures', 'voitures', 'Voitures neuves et occasion', '🚗', 'c08442b5-3ca9-4c37-a2db-f4f0560225fe', 1, true),
('Motos & Scooters', 'motos-scooters', 'Motos, scooters et deux-roues', '🏍️', 'c08442b5-3ca9-4c37-a2db-f4f0560225fe', 2, true),
('Pièces Auto & Moto', 'pieces-auto-moto', 'Pièces détachées et accessoires', '🔧', 'c08442b5-3ca9-4c37-a2db-f4f0560225fe', 3, true),
('Utilitaires & Camions', 'utilitaires-camions', 'Véhicules utilitaires et poids lourds', '🚚', 'c08442b5-3ca9-4c37-a2db-f4f0560225fe', 4, true),
('Bateaux & Nautisme', 'bateaux-nautisme', 'Bateaux, jet-ski et équipements nautiques', '⛵', 'c08442b5-3ca9-4c37-a2db-f4f0560225fe', 5, true),

-- Sous-catégories pour "Immobilier"
('Vente Appartements', 'vente-appartements', 'Appartements à vendre', '🏢', '9203cf0a-27e9-4b19-9dc8-575c20bd5394', 1, true),
('Vente Maisons', 'vente-maisons', 'Maisons individuelles à vendre', '🏠', '9203cf0a-27e9-4b19-9dc8-575c20bd5394', 2, true),
('Location Appartements', 'location-appartements', 'Appartements à louer', '🏢', '9203cf0a-27e9-4b19-9dc8-575c20bd5394', 3, true),
('Location Maisons', 'location-maisons', 'Maisons à louer', '🏠', '9203cf0a-27e9-4b19-9dc8-575c20bd5394', 4, true),
('Terrains & Propriétés', 'terrains-proprietes', 'Terrains constructibles et propriétés', '🌱', '9203cf0a-27e9-4b19-9dc8-575c20bd5394', 5, true),
('Bureaux & Commerces', 'bureaux-commerces', 'Locaux professionnels et commerciaux', '🏢', '9203cf0a-27e9-4b19-9dc8-575c20bd5394', 6, true),

-- Sous-catégories pour "Emploi et Services"
('Emplois CDI', 'emplois-cdi', 'Emplois en contrat à durée indéterminée', '💼', '3f75bb7e-2288-46b4-94f8-e1f4c73b70fe', 1, true),
('Emplois CDD', 'emplois-cdd', 'Emplois en contrat à durée déterminée', '📋', '3f75bb7e-2288-46b4-94f8-e1f4c73b70fe', 2, true),
('Freelance & Missions', 'freelance-missions', 'Travail freelance et missions ponctuelles', '💻', '3f75bb7e-2288-46b4-94f8-e1f4c73b70fe', 3, true),
('Services à domicile', 'services-domicile', 'Services de ménage, jardinage, etc.', '🏠', '3f75bb7e-2288-46b4-94f8-e1f4c73b70fe', 4, true),
('Cours & Formation', 'cours-formation', 'Cours particuliers et formation', '📚', '3f75bb7e-2288-46b4-94f8-e1f4c73b70fe', 5, true),
('Services Professionnels', 'services-professionnels', 'Conseil, expertise et services pro', '🎯', '3f75bb7e-2288-46b4-94f8-e1f4c73b70fe', 6, true);

-- Ajouter des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_ads_category_status ON ads(category_id, status);
CREATE INDEX IF NOT EXISTS idx_ads_status_featured ON ads(status, is_featured);
CREATE INDEX IF NOT EXISTS idx_ads_status_created ON ads(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ads_user_status ON ads(user_id, status);
CREATE INDEX IF NOT EXISTS idx_categories_parent_active ON categories(parent_id, is_active);
CREATE INDEX IF NOT EXISTS idx_categories_active_order ON categories(is_active, display_order);

-- Fonction pour incrémenter le compteur de vues de manière atomique et sécurisée
CREATE OR REPLACE FUNCTION increment_ad_views(ad_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE ads 
  SET views_count = COALESCE(views_count, 0) + 1,
      updated_at = now()
  WHERE id = ad_uuid AND status = 'active';
END;
$$;