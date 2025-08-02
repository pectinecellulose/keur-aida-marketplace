-- Ajouter une colonne pour identifier les produits admin
ALTER TABLE public.ads ADD COLUMN is_admin_product boolean DEFAULT false;

-- Créer un index pour optimiser les requêtes
CREATE INDEX idx_ads_is_admin_product ON public.ads(is_admin_product);