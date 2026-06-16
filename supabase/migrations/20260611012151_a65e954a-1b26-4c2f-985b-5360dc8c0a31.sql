
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Helper: updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Categories
CREATE TABLE public.service_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.service_categories TO anon, authenticated;
GRANT ALL ON public.service_categories TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.service_categories TO authenticated;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON public.service_categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin insert categories" ON public.service_categories FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update categories" ON public.service_categories FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete categories" ON public.service_categories FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_service_categories_updated BEFORE UPDATE ON public.service_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Services
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE,
  title text NOT NULL,
  description text,
  category_id uuid REFERENCES public.service_categories(id) ON DELETE SET NULL,
  performed_at date NOT NULL DEFAULT CURRENT_DATE,
  location text,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon, authenticated;
GRANT ALL ON public.services TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.services TO authenticated;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published services" ON public.services FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "Auth read all services" ON public.services FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update services" ON public.services FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete services" ON public.services FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX services_performed_at_idx ON public.services (performed_at DESC);
CREATE INDEX services_category_idx ON public.services (category_id);
CREATE TRIGGER trg_services_updated BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Media
CREATE TYPE public.media_kind AS ENUM ('photo', 'document');

CREATE TABLE public.service_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  storage_path text NOT NULL,
  kind public.media_kind NOT NULL DEFAULT 'photo',
  caption text,
  mime_type text,
  size_bytes int,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.service_media TO anon, authenticated;
GRANT ALL ON public.service_media TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.service_media TO authenticated;
ALTER TABLE public.service_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read media" ON public.service_media FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin insert media" ON public.service_media FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update media" ON public.service_media FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete media" ON public.service_media FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX service_media_service_idx ON public.service_media (service_id, sort_order);

-- Storage policies for the 'service-media' bucket (bucket created via tool)
-- Public read; only admins can write/delete via the bucket.
-- Policies on storage.objects:
DO $$ BEGIN
  CREATE POLICY "service-media public read" ON storage.objects FOR SELECT TO anon, authenticated
    USING (bucket_id = 'service-media');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "service-media admin insert" ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'service-media' AND public.has_role(auth.uid(), 'admin'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "service-media admin update" ON storage.objects FOR UPDATE TO authenticated
    USING (bucket_id = 'service-media' AND public.has_role(auth.uid(), 'admin'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "service-media admin delete" ON storage.objects FOR DELETE TO authenticated
    USING (bucket_id = 'service-media' AND public.has_role(auth.uid(), 'admin'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Seed initial categories
INSERT INTO public.service_categories (name, slug, sort_order) VALUES
  ('Laudo Técnico', 'laudo-tecnico', 1),
  ('Instalação', 'instalacao', 2),
  ('Manutenção', 'manutencao', 3),
  ('Automação', 'automacao', 4)
ON CONFLICT (name) DO NOTHING;

-- Trigger to auto-assign first signup as admin OR specific email as admin
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'diogo.coucello@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_assign_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();
