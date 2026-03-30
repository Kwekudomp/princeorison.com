-- ============================================================
-- Migration 007: Site Settings
-- Prince Orison Fashion House
-- ============================================================
-- Key/value table for editable homepage content:
-- new_arrivals_title, new_arrivals_subtitle, whatsapp_number

CREATE TABLE site_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE site_settings IS 'Admin-editable global site settings (homepage titles, WhatsApp number, etc.)';

CREATE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "admin_all_settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'princeorison1@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'princeorison1@gmail.com');

-- Default values
INSERT INTO site_settings (key, value) VALUES
  ('new_arrivals_title',    'New Arrivals'),
  ('new_arrivals_subtitle', 'The latest pieces fresh from the atelier'),
  ('whatsapp_number',       '233XXXXXXXXX');
