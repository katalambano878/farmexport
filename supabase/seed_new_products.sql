-- Insert new products for FarmExport
-- Includes: Corn, Soybean, Salt, Shea Butter, Shea Oil, Cashew, Pepper, Peanut

INSERT INTO products (name, slug, short_desc, is_featured, is_active)
VALUES
  (
    'Yellow Corn (Maize)',
    'yellow-corn',
    'Sun-dried yellow corn, rich in nutrients, suitable for animal feed and human consumption.',
    true,
    true
  ),
  (
    'Premium Grade Soybean',
    'premium-grade-soybean',
    'High-quality, non-GMO soybeans suitable for food processing and industrial use.',
    true,
    true
  ),
  (
    'Unrefined Salt',
    'unrefined-salt',
    'Natural, unrefined sea salt harvested from the coast, rich in essential minerals.',
    true,
    true
  ),
  (
    'Unrefined (Grade A) Shea Butter',
    'unrefined-shea-butter-grade-a',
    'Premium Grade A unrefined shea butter, sourced directly from African women cooperatives.',
    true,
    true
  ),
  (
    'Shea Butter Oil',
    'shea-butter-oil',
    'Pure, unrefined shea oil extracted from premium shea nuts.',
    true,
    true
  ),
  (
    'Cashew Nut',
    'cashew-nut',
    'Raw cashew nuts sourced from high-yield farms in Ghana and West Africa.',
    true,
    true
  ),
  (
    'Chili Dry Pepper',
    'chili-dry-pepper',
    'Spicy, sun-dried chili peppers, perfect for culinary and industrial applications.',
    true,
    true
  ),
  (
    'Peanuts (Groundnuts)',
    'peanuts-groundnuts',
    'Organic shelled and unshelled peanuts, high in protein and oil content.',
    true,
    true
  ),
  (
    'Sesame Seeds',
    'sesame-seeds',
    'High-quality white and mixed sesame seeds, rich in oil and flavor.',
    true,
    true
  ),
  (
    'Sesame Oil',
    'sesame-oil',
    'Pure, golden sesame oil extracted from premium seeds.',
    true,
    true
  ),
  (
    'Baobab Cake (Animal Feed)',
    'baobab-cake',
    'Nutrient-rich baobab fruit pulp cake, excellent for sustainable animal feed.',
    true,
    true
  ),
  (
    'Premium Local Rice',
    'local-rice',
    'Aromatic and clean local parboiled rice, stone-free and high quality.',
    true,
    true
  )
ON CONFLICT (slug) DO UPDATE
SET 
  name = EXCLUDED.name,
  short_desc = EXCLUDED.short_desc,
  is_featured = EXCLUDED.is_featured,
  is_active = EXCLUDED.is_active;
