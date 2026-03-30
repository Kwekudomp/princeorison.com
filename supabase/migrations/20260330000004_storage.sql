-- ============================================================
-- Migration 004: Storage Bucket for Product Images
-- Prince Orison Fashion House
-- ============================================================

-- Create the product-images bucket (public — images served directly)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880,   -- 5MB max per image
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Public read access to all files in the bucket
CREATE POLICY "public_read_product_images_storage"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'product-images');

-- Only admin can upload/update/delete
CREATE POLICY "admin_upload_product_images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images'
    AND auth.jwt() ->> 'email' = 'princeorison1@gmail.com'
  );

CREATE POLICY "admin_update_product_images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'product-images'
    AND auth.jwt() ->> 'email' = 'princeorison1@gmail.com'
  );

CREATE POLICY "admin_delete_product_images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-images'
    AND auth.jwt() ->> 'email' = 'princeorison1@gmail.com'
  );
