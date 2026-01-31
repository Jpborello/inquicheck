-- Add missing 'comments' column to rental_history table
-- This column is defined in schema_init.sql but missing from the actual database

ALTER TABLE public.rental_history 
ADD COLUMN IF NOT EXISTS comments TEXT;

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'rental_history' 
ORDER BY ordinal_position;
