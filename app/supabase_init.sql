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

-- ── 5. SEGURIDAD (RLS) ─────────────────────────────

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reviews ENABLE ROW LEVEL SECURITY;

-- ── 5. SEGURIDAD (RLS) ─────────────────────────────
-- Nota: Dado que usamos Firebase Auth, Supabase no detecta al usuario logueado automáticamente. 
-- Permitimos acceso público (anon) bajo la lógica de que el cliente Firebase maneja la sesión.

-- Políticas para PROFILES
CREATE POLICY "Public profiles access" ON profiles FOR ALL USING (true);

-- Políticas para SERVICIOS
CREATE POLICY "Public services access" ON services FOR ALL USING (true);

-- Políticas para GASTOS
CREATE POLICY "Public expenses access" ON expenses FOR ALL USING (true);

-- Otorgar permisos a anon
GRANT ALL ON profiles, services, expenses TO anon, authenticated;

-- Políticas para RESEÑAS (Híbrido: Firebase Auth no es detectado por Supabase RLS por defecto)
DROP POLICY IF EXISTS "Users can insert their own reviews" ON public.user_reviews;
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.user_reviews;

CREATE POLICY "Allow public insert for reviews" ON public.user_reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select for reviews" ON public.user_reviews FOR SELECT USING (true);

-- Otorgar permisos técnicos a los roles anon y authenticated
GRANT INSERT, SELECT ON public.user_reviews TO anon, authenticated;

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
