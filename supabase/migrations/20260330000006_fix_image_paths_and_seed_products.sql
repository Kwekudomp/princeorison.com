-- ============================================================
-- Migration 006: Fix cover_image paths + seed products & images
-- Prince Orison Fashion House
-- ============================================================
-- Problem: cover_image paths lack leading '/' so getImageUrl()
-- incorrectly routes them to Supabase Storage instead of /public.
-- Fix: prefix all local paths with '/'.
-- Also seeds products, product_features, and product_images
-- so collections show real content from the DB.

-- ── Fix collection cover_image paths ─────────────────────────
UPDATE collections
SET cover_image = '/' || cover_image
WHERE cover_image IS NOT NULL
  AND cover_image NOT LIKE '/%'
  AND cover_image NOT LIKE 'http%';

-- ── Seed products ─────────────────────────────────────────────
-- We insert using collection slug lookups so IDs don't need to be hardcoded.

-- Helper: temp function to get collection id by slug
CREATE OR REPLACE FUNCTION _get_col(p_slug TEXT) RETURNS UUID AS $$
  SELECT id FROM collections WHERE slug = p_slug LIMIT 1;
$$ LANGUAGE sql;

-- 1. KAFTAN (Casual)
INSERT INTO products (collection_id, name, description, whatsapp_message, display_order, is_published, is_new_arrival, arrival_label) VALUES
  (_get_col('kaftan-casual'), 'Classic Black Kaftan',
   'Sleek black casual kaftan with tailored trousers, perfect for refined everyday wear.',
   'Hi, I''m interested in the Classic Black Kaftan', 1, true, false, 'New'),
  (_get_col('kaftan-casual'), 'Modern Colorblock Kaftan',
   'Bold white and black colorblock design that makes a contemporary statement.',
   'Hi, I''m interested in the Modern Colorblock Kaftan', 2, true, false, 'New'),
  (_get_col('kaftan-casual'), 'Heritage Striped Kaftan',
   'Black kaftan with multi-colored striped embroidery celebrating African heritage.',
   'Hi, I''m interested in the Heritage Striped Kaftan', 3, true, false, 'New'),
  (_get_col('kaftan-casual'), 'Executive Polo Set',
   'Classic green polo with matching trousers for a polished casual ensemble.',
   'Hi, I''m interested in the Executive Polo Set', 4, true, false, 'New'),
  (_get_col('kaftan-casual'), 'All-White Kaftan Set',
   'Clean all-white kaftan and trouser set — effortlessly sharp for travel, events, or everyday elegance.',
   'Hi, I''m interested in the All-White Kaftan Set', 5, true, true, 'New');

-- 2. AGBADA (3 Piece)
INSERT INTO products (collection_id, name, description, whatsapp_message, display_order, is_published, is_new_arrival, arrival_label) VALUES
  (_get_col('agbada-3-piece'), 'Royal Burgundy Agbada',
   'Elegant burgundy 3-piece agbada with intricate embellishments for a truly regal appearance.',
   'Hi, I''m interested in the Royal Burgundy Agbada', 1, true, true, 'Featured'),
  (_get_col('agbada-3-piece'), 'Celebration White Agbada',
   'Clean white 3-piece agbada with purple geometric embroidery for standout elegance.',
   'Hi, I''m interested in the Celebration White Agbada', 2, true, false, 'New'),
  (_get_col('agbada-3-piece'), 'Heritage Kente Agbada',
   'Contemporary white agbada with kente-inspired embellishments honouring Ghanaian heritage.',
   'Hi, I''m interested in the Heritage Kente Agbada', 3, true, true, 'Featured');

-- 3. GROOMSMAN/GROOMSWEAR
INSERT INTO products (collection_id, name, description, whatsapp_message, display_order, is_published, is_new_arrival, arrival_label) VALUES
  (_get_col('groomsman-groomswear'), 'Red Coordinated Set',
   'Vibrant red coordinated outfits for the entire wedding party, creating a bold and unified look.',
   'Hi, I''m interested in the Red Coordinated Set', 1, true, false, 'New'),
  (_get_col('groomsman-groomswear'), 'Purple & Pink Groomsmen Set',
   'Elegant two-tone purple and pink coordinated outfits with matching agbada for the groom.',
   'Hi, I''m interested in the Purple & Pink Groomsmen Set', 2, true, false, 'New'),
  (_get_col('groomsman-groomswear'), 'Orange Kente Wedding Set',
   'Coordinated orange outfits for groomsmen with a kente-draped groom ensemble celebrating Ghanaian heritage.',
   'Hi, I''m interested in the Orange Kente Wedding Set', 3, true, false, 'New'),
  (_get_col('groomsman-groomswear'), 'Lavender & Purple Groomsmen Set',
   'Sophisticated lavender short-sleeve sets for the groomsmen, anchored by the groom in a commanding purple agbada.',
   'Hi, I''m interested in the Lavender & Purple Groomsmen Set', 4, true, true, 'New'),
  (_get_col('groomsman-groomswear'), 'Orange Celebration Party Set',
   'Vibrant orange coordinated sets for a joyful wedding party — energetic, unified, and unforgettable.',
   'Hi, I''m interested in the Orange Celebration Party Set', 5, true, false, 'New');

-- 4. RTW COLLECTION
INSERT INTO products (collection_id, name, description, whatsapp_message, display_order, is_published, is_new_arrival, arrival_label) VALUES
  (_get_col('rtw-collection'), 'Elegant Statement Piece',
   'Sophisticated design capturing feminine elegance with bold structural details.',
   'Hi, I''m interested in the Elegant Statement Piece', 1, true, true, 'Featured'),
  (_get_col('rtw-collection'), 'Contemporary Classic',
   'Timeless design with modern sensibility, blending clean lines with feminine grace.',
   'Hi, I''m interested in the Contemporary Classic', 2, true, false, 'New'),
  (_get_col('rtw-collection'), 'Signature Elegance',
   'A celebration of feminine power and style, crafted with meticulous attention to detail.',
   'Hi, I''m interested in the Signature Elegance', 3, true, false, 'New');

-- 5. CASUAL
INSERT INTO products (collection_id, name, description, whatsapp_message, display_order, is_published, is_new_arrival, arrival_label) VALUES
  (_get_col('casual'), 'Orange Event Matching Set',
   'Coordinated short-sleeve shirt and trouser set in bold orange — ideal for group events, outings, and celebrations.',
   'Hi, I''m interested in the Orange Event Matching Set', 1, true, true, 'New'),
  (_get_col('casual'), 'Artisan Print Tee',
   'Premium white tee featuring a hand-crafted African landscape artwork panel — where streetwear meets heritage.',
   'Hi, I''m interested in the Artisan Print Tee', 2, true, false, 'New'),
  (_get_col('casual'), 'Tailored Trousers & Shorts',
   'Perfectly tailored trousers and shorts for the discerning professional. Inquire for details.',
   'Hi, I''m interested in the Tailored Trousers & Shorts', 3, true, false, 'New');

-- ── Seed product_features ─────────────────────────────────────
-- Kaftan Casual
INSERT INTO product_features (product_id, feature, sort_order)
SELECT p.id, f.feature, f.sort_order FROM products p
CROSS JOIN (VALUES
  (1, 'Premium black fabric with subtle sheen'),
  (2, 'Tailored trousers included for a complete look'),
  (3, 'Modern slim-cut silhouette'),
  (4, 'Comfortable lightweight construction')
) AS f(sort_order, feature)
WHERE p.name = 'Classic Black Kaftan';

INSERT INTO product_features (product_id, feature, sort_order)
SELECT p.id, f.feature, f.sort_order FROM products p
CROSS JOIN (VALUES
  (1, 'Crisp all-white premium fabric'),
  (2, 'Matching kaftan top and tailored trousers'),
  (3, 'Lightweight and breathable construction'),
  (4, 'Versatile from daytime outings to evening occasions')
) AS f(sort_order, feature)
WHERE p.name = 'All-White Kaftan Set';

-- Agbada
INSERT INTO product_features (product_id, feature, sort_order)
SELECT p.id, f.feature, f.sort_order FROM products p
CROSS JOIN (VALUES
  (1, 'Deep burgundy premium fabric'),
  (2, 'Intricate hand-finished embellishments'),
  (3, 'Complete 3-piece set with agbada, kaftan, and trousers'),
  (4, 'Statement piece for weddings and celebrations')
) AS f(sort_order, feature)
WHERE p.name = 'Royal Burgundy Agbada';

INSERT INTO product_features (product_id, feature, sort_order)
SELECT p.id, f.feature, f.sort_order FROM products p
CROSS JOIN (VALUES
  (1, 'White fabric with kente-inspired embellishments'),
  (2, 'Contemporary interpretation of traditional motifs'),
  (3, 'Complete 3-piece agbada set'),
  (4, 'Celebrates Ghanaian craftsmanship and heritage')
) AS f(sort_order, feature)
WHERE p.name = 'Heritage Kente Agbada';

-- ── Seed product_images ───────────────────────────────────────
-- Kaftan Casual
INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/kaftan-casual/shirts-casual-1.jpeg', 'Classic Black Kaftan', 1, true
FROM products p WHERE p.name = 'Classic Black Kaftan';

INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/kaftan-casual/shirts-casual-2.jpeg', 'Modern Colorblock Kaftan', 1, true
FROM products p WHERE p.name = 'Modern Colorblock Kaftan';

INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/kaftan-casual/shirts-casual-3.jpeg', 'Heritage Striped Kaftan', 1, true
FROM products p WHERE p.name = 'Heritage Striped Kaftan';

INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/kaftan-casual/shirts-casual-4.jpeg', 'Executive Polo Set', 1, true
FROM products p WHERE p.name = 'Executive Polo Set';

INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/kaftan-casual/shirts-casual-5.jpeg', 'All-White Kaftan Set', 1, true
FROM products p WHERE p.name = 'All-White Kaftan Set';

-- Agbada
INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/agbada-3-piece/kaftan-agbada-1.jpeg', 'Royal Burgundy Agbada', 1, true
FROM products p WHERE p.name = 'Royal Burgundy Agbada';

INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/agbada-3-piece/kaftan-agbada-2.jpeg', 'Celebration White Agbada', 1, true
FROM products p WHERE p.name = 'Celebration White Agbada';

INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/agbada-3-piece/kaftan-agbada-3.jpeg', 'Heritage Kente Agbada', 1, true
FROM products p WHERE p.name = 'Heritage Kente Agbada';

-- Groomswear
INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/groomswear/groomswear-1.jpeg', 'Red Coordinated Set', 1, true
FROM products p WHERE p.name = 'Red Coordinated Set';

INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/groomswear/groomswear-2.jpeg', 'Purple & Pink Groomsmen Set', 1, true
FROM products p WHERE p.name = 'Purple & Pink Groomsmen Set';

INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/groomswear/groomswear-3.jpeg', 'Orange Kente Wedding Set', 1, true
FROM products p WHERE p.name = 'Orange Kente Wedding Set';

INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/groomswear/groomswear-4.jpeg', 'Lavender & Purple Groomsmen Set', 1, true
FROM products p WHERE p.name = 'Lavender & Purple Groomsmen Set';

INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/groomswear/groomswear-5.jpeg', 'Orange Celebration Party Set', 1, true
FROM products p WHERE p.name = 'Orange Celebration Party Set';

-- RTW Collection
INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/rtw-collection/womens-collection-1.jpeg', 'Elegant Statement Piece', 1, true
FROM products p WHERE p.name = 'Elegant Statement Piece';

INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/rtw-collection/womens-collection-2.jpeg', 'Contemporary Classic', 1, true
FROM products p WHERE p.name = 'Contemporary Classic';

INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/rtw-collection/womens-collection-3.jpeg', 'Signature Elegance', 1, true
FROM products p WHERE p.name = 'Signature Elegance';

-- Casual
INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/casual/trousers-shorts-1.jpeg', 'Orange Event Matching Set', 1, true
FROM products p WHERE p.name = 'Orange Event Matching Set';

INSERT INTO product_images (product_id, storage_path, alt_text, sort_order, is_cover)
SELECT p.id, '/images/products/casual/shirts-casual-6.jpeg', 'Artisan Print Tee', 1, true
FROM products p WHERE p.name = 'Artisan Print Tee';

-- ── Update collections cover_image from first product image ───
-- (for collections that had their cover_image seeded from product images
--  that are now properly tracked in product_images)
UPDATE collections c
SET cover_image = (
  SELECT pi.storage_path
  FROM product_images pi
  JOIN products p ON p.id = pi.product_id
  WHERE p.collection_id = c.id AND pi.is_cover = true
  ORDER BY p.display_order, pi.sort_order
  LIMIT 1
)
WHERE c.cover_image IS NULL OR c.cover_image = '';

-- ── Drop temp helper ──────────────────────────────────────────
DROP FUNCTION IF EXISTS _get_col(TEXT);
