-- Add terms acceptance tracking to agencies table
-- Run this in Supabase SQL Editor

ALTER TABLE agencies 
ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS terms_version VARCHAR(10) DEFAULT '1.0';

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_agencies_terms_accepted 
ON agencies(terms_accepted_at);

COMMENT ON COLUMN agencies.terms_accepted_at IS 'Timestamp when the agency accepted the terms and conditions';
COMMENT ON COLUMN agencies.terms_version IS 'Version of terms and conditions that was accepted';
