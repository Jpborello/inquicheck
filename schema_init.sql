-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Agencies (Inmobiliarias) - Linked to Supabase Auth
CREATE TABLE IF NOT EXISTS public.agencies (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL,
    cuit TEXT,
    address TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for agencies
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;

-- Policy: Agencies can view and edit their own profile
CREATE POLICY "Agencies can view own profile" ON public.agencies
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Agencies can update own profile" ON public.agencies
    FOR UPDATE USING (auth.uid() = id);

-- Tenants (Inquilinos)
CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    dni TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    created_by UUID REFERENCES public.agencies(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for tenants
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Policy: Agencies can view all tenants (Shared knowledge base)
CREATE POLICY "Agencies can view all tenants" ON public.tenants
    FOR SELECT TO authenticated USING (true);

-- Policy: Agencies can insert tenants
CREATE POLICY "Agencies can insert tenants" ON public.tenants
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);

-- Rental History / Scoring
CREATE TABLE IF NOT EXISTS public.rental_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
    agency_id UUID REFERENCES public.agencies(id) ON DELETE SET NULL NOT NULL,
    start_date DATE,
    end_date DATE,
    contract_status TEXT CHECK (contract_status IN ('Active', 'Finished', 'Terminated')),
    payment_score INTEGER CHECK (payment_score BETWEEN 1 AND 5), -- 1: Poor, 5: Excellent
    care_score INTEGER CHECK (care_score BETWEEN 1 AND 5), -- 1: Poor, 5: Excellent
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for rental_history
ALTER TABLE public.rental_history ENABLE ROW LEVEL SECURITY;

-- Policy: Agencies can view all history (Shared knowledge base)
CREATE POLICY "Agencies can view all history" ON public.rental_history
    FOR SELECT TO authenticated USING (true);

-- Policy: Agencies can insert history records for themselves
CREATE POLICY "Agencies can insert history" ON public.rental_history
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = agency_id);

-- Optional: Create a function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.agencies (id, name, email) -- assuming email is passed or available
  VALUES (new.id, new.raw_user_meta_data->>'name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on new user creation
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
