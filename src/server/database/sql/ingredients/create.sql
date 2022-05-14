/*
    Creates table ingredients.
*/
CREATE TABLE IF NOT EXISTS ingredients
(
    id serial PRIMARY KEY,
    name text NOT NULL,
    inventory_amount int DEFAULT 0,
    inventory_unit_id int references units(id),
)
