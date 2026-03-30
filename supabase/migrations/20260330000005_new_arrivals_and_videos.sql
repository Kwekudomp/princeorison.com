-- ============================================================
-- Migration 005: New Arrivals Flag + Videos Table
-- Prince Orison Fashion House
-- ============================================================

-- ── Extend products with new arrival flags ────────────────────
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS is_new_arrival  BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS arrival_label   TEXT    NOT NULL DEFAULT 'New'
    CHECK (arrival_label IN ('New', 'Featured', 'Season', 'Limited'));

-- Index for fast homepage new-arrivals query
CREATE INDEX idx_products_new_arrival
  ON products(is_new_arrival, display_order)
  WHERE is_new_arrival = true AND is_published = true;

-- ── Mark initial new arrivals from seed data ──────────────────
UPDATE products SET is_new_arrival = true, arrival_label = 'New'
  WHERE name IN (
    'All-White Kaftan Set',
    'Lavender & Purple Groomsmen Set',
    'Orange Event Matching Set',
    'Artisan Print Tee'
  );

UPDATE products SET is_new_arrival = true, arrival_label = 'Featured'
  WHERE name IN (
    'Royal Burgundy Agbada',
    'Elegant Statement Piece',
    'Heritage Kente Agbada'
  );

-- ── videos ────────────────────────────────────────────────────
-- Stores short showcase videos (reels, lookbooks, behind-the-scenes)
CREATE TABLE videos (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT    NOT NULL,
  caption          TEXT,
  storage_path     TEXT    NOT NULL,   -- path in Supabase Storage 'videos' bucket
  thumbnail_path   TEXT,               -- poster image path
  duration_seconds INTEGER,
  category         TEXT    NOT NULL DEFAULT 'showcase'
    CHECK (category IN ('showcase', 'lookbook', 'behind-the-scenes', 'reel')),
  display_order    INTEGER NOT NULL DEFAULT 0,
  is_published     BOOLEAN NOT NULL DEFAULT true,
  is_featured      BOOLEAN NOT NULL DEFAULT false,  -- pinned to homepage VideoSection
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE videos IS 'Short showcase videos — reels, lookbooks, behind-the-scenes';
COMMENT ON COLUMN videos.is_featured IS 'Only one video should be featured at a time — shown in homepage VideoSection';

CREATE INDEX idx_videos_featured   ON videos(is_featured, is_published) WHERE is_featured = true;
CREATE INDEX idx_videos_published  ON videos(is_published, display_order);

CREATE TRIGGER trg_videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── RLS for videos ────────────────────────────────────────────
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_published_videos"
  ON videos FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "admin_all_videos"
  ON videos FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'princeorison1@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'princeorison1@gmail.com');

-- ── Videos storage bucket ─────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'videos',
  'videos',
  true,
  104857600,  -- 100MB max per video
  ARRAY['video/mp4', 'video/webm', 'video/quicktime']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public_read_videos_storage"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'videos');

CREATE POLICY "admin_upload_videos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'videos'
    AND auth.jwt() ->> 'email' = 'princeorison1@gmail.com'
  );

CREATE POLICY "admin_update_videos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'videos'
    AND auth.jwt() ->> 'email' = 'princeorison1@gmail.com'
  );

CREATE POLICY "admin_delete_videos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'videos'
    AND auth.jwt() ->> 'email' = 'princeorison1@gmail.com'
  );
