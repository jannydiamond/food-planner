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
)
