-- ============================================================
-- Migration 002: Enquiries + Newsletter Subscribers
-- Prince Orison Fashion House
-- ============================================================

-- ── enquiries ────────────────────────────────────────────────
CREATE TABLE enquiries (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  TEXT NOT NULL,
  phone                 TEXT NOT NULL,
  email                 TEXT,
  collection_interest   TEXT,               -- slug or free text
  event_type            TEXT
    CHECK (event_type IN ('wedding', 'casual', 'formal', 'political', 'other', NULL)),
  event_date            DATE,
  message               TEXT,
  status                TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'read', 'replied', 'closed')),
  source                TEXT DEFAULT 'website',  -- website | whatsapp | instagram
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE enquiries IS 'Consultation and order enquiries from the contact form';

CREATE INDEX idx_enquiries_status     ON enquiries(status, created_at DESC);
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at DESC);

CREATE TRIGGER trg_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── newsletter_subscribers ────────────────────────────────────
CREATE TABLE newsletter_subscribers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL UNIQUE,
  source      TEXT DEFAULT 'website',       -- website | footer | popup
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE newsletter_subscribers IS 'Email capture for newsletters and campaign sends';

CREATE INDEX idx_newsletter_active ON newsletter_subscribers(is_active, created_at DESC);
