CREATE EXTENSION pgcrypto;
/*
    Creates table units.
*/
CREATE TABLE IF NOT EXISTS units
(
    id serial PRIMARY KEY,
    name text NOT NULL,
    created_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
);

INSERT INTO units(name) VALUES
('STK'),
('MG'),
('G'),
('KG'),
('ML'),
('L'),
('DOSE'),
('TL'),
('EL'),
('PACKUNG');

/*
    Creates table ingredients.
*/
CREATE TABLE IF NOT EXISTS ingredients
(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    inventory_amount int DEFAULT 0,
    inventory_unit_id int references units(id),
    created_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
);
