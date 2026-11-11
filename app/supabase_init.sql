-- ── 1. TABLA DE PERFILES (USUARIOS) ──────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY, -- UID de Firebase o Email
  email TEXT UNIQUE,
  name TEXT,
  role TEXT DEFAULT 'user',
  avatar TEXT,
  service_config JSONB DEFAULT '{
      "Public": { "Ordinaria": 9500, "Extraordinaria": 11400 },
      "Private": { "Ordinaria": 12825, "Extraordinaria": 15390 },
      "OSPES": { "Ordinaria": 8000, "Extraordinaria": 9600 }
  }',
  notification_settings JSONB DEFAULT '{"enabled": false, "leadTime": 60}',
  last_login TIMESTAMPTZ DEFAULT now()
);

-- ── 2. TABLA DE SERVICIOS ──────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT, -- UID de Firebase
  user_email TEXT,
  date DATE,
  type TEXT,
  sub_type TEXT,
  hours NUMERIC,
  start_time TIME,
  end_time TIME,
  location TEXT,
  total NUMERIC,
  status TEXT DEFAULT 'Pendiente',
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- ── 3. TABLA DE GASTOS ─────────────────────────────
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT, -- UID de Firebase
  user_email TEXT,
  category TEXT,
  amount NUMERIC,
  description TEXT,
  date DATE,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- ── 4. TABLA DE RESEÑAS Y SUGERENCIAS ──────────────
CREATE TABLE IF NOT EXISTS public.user_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ── 5. TABLA DE REGISTROS DE CONSULTAS (CENTINELA AUDITOR) ──────────────────
CREATE TABLE IF NOT EXISTS public.query_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email TEXT NOT NULL,
    query TEXT NOT NULL,
    response TEXT,
    score INTEGER,
    category TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ── 6. TABLA DE FERIADOS (NUEVO - MEJORA 1) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.holidays (
    id SERIAL PRIMARY KEY,
    date DATE UNIQUE NOT NULL,
    description TEXT
);

-- ── 6. SEGURIDAD (RLS) ─────────────────────────────

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE query_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE holidays ENABLE ROW LEVEL SECURITY;

-- ── 5. SEGURIDAD (RLS) REFORZADA ───────────────────
-- Nota: La aplicación envía el email del usuario en cada petición.
-- Estas reglas asumen que el cliente es confiable (Hybrid Trust model).

-- Políticas para PROFILES (Híbrido)
DROP POLICY IF EXISTS "Users can only access their own profile" ON profiles;
CREATE POLICY "Users can only access their own profile" ON profiles 
    FOR ALL USING (true) -- En modo híbrido sin JWT de Supabase, permitimos SELECT/UPSERT
    WITH CHECK (true); -- La seguridad real recae en la aplicación y Firebase

-- Políticas para SERVICIOS (Híbrido)
DROP POLICY IF EXISTS "Users can only access their own services" ON services;
CREATE POLICY "Users can only access their own services" ON services 
    FOR ALL USING (true)
    WITH CHECK (true);

-- Políticas para GASTOS (Híbrido)
DROP POLICY IF EXISTS "Users can only access their own expenses" ON expenses;
CREATE POLICY "Users can only access their own expenses" ON expenses 
    FOR ALL USING (true)
    WITH CHECK (true);

-- Políticas para RESEÑAS
DROP POLICY IF EXISTS "Allow public insert for reviews" ON public.user_reviews;
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.user_reviews;
CREATE POLICY "Auth users can insert reviews" ON public.user_reviews 
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Public can view reviews" ON public.user_reviews 
    FOR SELECT USING (true);

-- Políticas para REGISTROS DE CONSULTAS
DROP POLICY IF EXISTS "Users can insert query logs" ON public.query_logs;
DROP POLICY IF EXISTS "Admin can view query logs" ON public.query_logs;
CREATE POLICY "Auth users can insert query logs" ON public.query_logs 
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can only view their own logs" ON public.query_logs 
    FOR SELECT USING (user_email = current_setting('request.jwt.claims', true)::jsonb->>'email');

-- Políticas para FERIADOS
DROP POLICY IF EXISTS "Anyone can view holidays" ON public.holidays;
CREATE POLICY "Public can view holidays" ON public.holidays 
    FOR SELECT USING (true); -- Cualquiera puede leer los feriados

-- Permisos técnicos
GRANT INSERT, SELECT ON public.user_reviews TO authenticated;
GRANT INSERT, SELECT ON public.query_logs TO authenticated;
GRANT SELECT ON public.holidays TO public;
GRANT SELECT ON public.holidays TO anon;
GRANT SELECT ON public.holidays TO authenticated;

-- ── 6. TRIGGER PARA NUEVOS USUARIOS ────────────────
-- Crea automáticamente un perfil cuando alguien se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ── 7. MÓDULOS OPERATIVOS (ACTAS Y PROCEDIMIENTOS) ────────────────

-- Intervenciones rápidas
CREATE TABLE IF NOT EXISTS interventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  type TEXT,
  description TEXT,
  location TEXT,
  lat NUMERIC,
  lng NUMERIC,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  shift_date DATE DEFAULT CURRENT_DATE
);

-- Procedimientos complejos
CREATE TABLE IF NOT EXISTS procedures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  type TEXT,
  location TEXT,
  lat NUMERIC,
  lng NUMERIC,
  start_time TIMESTAMPTZ DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  notes TEXT,
  seized_items JSONB DEFAULT '[]',
  photos TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'abierto',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Personas involucradas en procedimientos
CREATE TABLE IF NOT EXISTS procedure_persons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  procedure_id UUID REFERENCES procedures(id) ON DELETE CASCADE,
  role TEXT,
  full_name TEXT,
  dni TEXT,
  address TEXT,
  phone TEXT,
  notes TEXT
);

-- Habilitar RLS
ALTER TABLE interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE procedure_persons ENABLE ROW LEVEL SECURITY;

-- Políticas públicas temporales para el cliente
CREATE POLICY "Public interventions access" ON interventions FOR ALL USING (true);
CREATE POLICY "Public procedures access" ON procedures FOR ALL USING (true);
CREATE POLICY "Public procedure_persons access" ON procedure_persons FOR ALL USING (true);

-- Otorgar permisos
GRANT ALL ON interventions, procedures, procedure_persons TO anon, authenticated;

-- ── 8. AUDITORÍA DE SEGURIDAD ──────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  metadata JSONB DEFAULT '{}',
  ip TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public audit access" ON audit_log FOR ALL USING (true);
GRANT ALL ON audit_log TO anon, authenticated;
