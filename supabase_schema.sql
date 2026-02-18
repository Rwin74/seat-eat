-- Seat & Eat - Database Schema

-- 1. Enable pgcrypto for UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Users (Customers)
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text UNIQUE NOT NULL,
  name text,
  trust_score int DEFAULT 100,
  is_banned boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 3. Restaurants
CREATE TABLE restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  address text,
  district text,
  cover_image text,
  floor_plan_bg text,
  created_at timestamptz DEFAULT now()
);

-- 4. Tables (Masalar)
CREATE TABLE tables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE,
  label text NOT NULL,
  capacity int DEFAULT 2,
  x_pos float DEFAULT 0,
  y_pos float DEFAULT 0,
  features text[],
  min_trust_score int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 5. Reservations
CREATE TABLE reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  table_id uuid REFERENCES tables(id) ON DELETE SET NULL,
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE,
  reservation_date date NOT NULL,
  reservation_time time NOT NULL,
  party_size int DEFAULT 2,
  status text DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'arrived', 'no_show', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- 6. Realtime Setup
-- Enable realtime for tables and reservations
alter publication supabase_realtime add table tables;
alter publication supabase_realtime add table reservations;

-- 7. Trust Score Triggers

-- Function: Handle No-Show (-30 points)
CREATE OR REPLACE FUNCTION handle_no_show() RETURNS trigger AS $$
BEGIN
  IF NEW.status = 'no_show' AND OLD.status != 'no_show' THEN
    UPDATE users SET trust_score = GREATEST(0, trust_score - 30)
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_reservation_no_show
  AFTER UPDATE ON reservations
  FOR EACH ROW EXECUTE PROCEDURE handle_no_show();

-- Function: Handle Arrival (+10 points)
CREATE OR REPLACE FUNCTION handle_arrival() RETURNS trigger AS $$
BEGIN
  IF NEW.status = 'arrived' AND OLD.status != 'arrived' THEN
    UPDATE users SET trust_score = LEAST(200, trust_score + 10)
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_reservation_arrival
  AFTER UPDATE ON reservations
  FOR EACH ROW EXECUTE PROCEDURE handle_arrival();

-- 8. Seed Data (Optional - Run to populate initial data)
INSERT INTO restaurants (name, slug, description, address, district, cover_image)
VALUES (
  'Deniz Kızı', 
  'deniz-kizi', 
  'Boğaz manzaralı, taze deniz ürünleri restoranı.', 
  'Moda Caddesi No:42, Kadıköy', 
  'Kadıköy', 
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
);

-- Note: You'll need to grab the restaurant UUID to insert tables linked to it.
