/*
    Creates table units.
*/
CREATE TABLE IF NOT EXISTS units
(
    id serial PRIMARY KEY,
    name text NOT NULL,
    created_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
)
