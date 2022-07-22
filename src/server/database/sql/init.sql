CREATE extension IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS fp_user
(
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    created_at timestamp DEFAULT NOW(),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS household
(
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    household_name text NOT NULL,
    created_by text references fp_user(username),
    created_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS household_has_user
(
    user_id uuid NOT NULL references fp_user(id) ON DELETE CASCADE,
    household_id uuid NOT NULL references household(id) ON DELETE CASCADE,
    added_by text references fp_user(username),
    added_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory
(
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    inventory_name text NOT NULL,
    created_by text references fp_user(username),
    created_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW(),
    household_id uuid NOT NULL references household(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS unit
(
    id serial NOT NULL PRIMARY KEY,
    unit_name text NOT NULL UNIQUE,
    created_by text references fp_user(username),
    created_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

INSERT INTO unit (unit_name) VALUES 
    ('Stück'),
    ('Stücke'),
    ('Packung'),
    ('Packungen'),
    ('Dose'),
    ('Dosen'),
    ('Flasche'),
    ('Flaschen'),
    ('g'),
    ('kg'),
    ('ml'),
    ('l'),
    ('kcal'),
    ('TL'),
    ('EL'),
    ('Tasse'),
    ('Tassen'),
    ('Priese');


CREATE TABLE IF NOT EXISTS grocery
(
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    grocery_name text NOT NULL,
    base_amount int,
    base_unit text references unit(unit_name),
    alt_amount int,
    alt_unit text references unit(unit_name),
    fabricant text references fabricant(fabricant_name),
    origin_country text references country(country_name),
    created_by text references fp_user(username),
    created_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fabricant
(
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    fabricant_name text NOT NULL UNIQUE,
    created_by text references fp_user(username),
    created_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS country
(
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    country_name text NOT NULL UNIQUE,
    created_by text references fp_user(username),
    created_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory_has_grocery
(
    inventory_id uuid NOT NULL references inventory(id) ON DELETE CASCADE,
    grocery_id uuid NOT NULL references grocery(id) ON DELETE CASCADE,
    amount int,
    unit text references unit(unit_name),
    best_before date,
    added_by text references fp_user(username),
    added_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS store
(
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    store_name text NOT NULL,
    street varchar(250),
    street_number varchar(10),
    postal_code varchar(250),
    city varchar(250),
    created_by text references fp_user(username),
    created_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS grocery_price_in_store
(
    store_id uuid NOT NULL references inventory(id) ON DELETE CASCADE,
    grocery_id uuid NOT NULL references grocery(id) ON DELETE CASCADE,
    price NUMERIC(6, 2),
    per_unit text references unit(unit_name),
    added_by text references fp_user(username),
    added_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shopping_list
(
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    shopping_list_name text NOT NULL,
    created_by text references fp_user(username),
    created_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW(),
    household_id uuid NOT NULL references household(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shopping_list_has_grocery
(
    shopping_list_id uuid NOT NULL references shopping_list(id) ON DELETE CASCADE,
    grocery_id uuid NOT NULL references grocery(id) ON DELETE CASCADE,
    amount int,
    unit text references unit(unit_name),
    in_basket boolean NOT NULL DEFAULT false,
    added_by text references fp_user(username),
    added_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recipe
(
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_name text NOT NULL,
    steps jsonb,
    created_by text references fp_user(username),
    created_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recipe_has_grocery
(
    grocery_id uuid NOT NULL references grocery(id) ON DELETE CASCADE,
    recipe_id uuid NOT NULL references recipe(id) ON DELETE CASCADE,
    amount int DEFAULT 0,
    unit text references unit(unit_name),
    added_by text references fp_user(username),
    added_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tag
(
    id serial NOT NULL PRIMARY KEY,
    tag_name text NOT NULL,
    created_by text references fp_user(username),
    created_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS grocery_tag
(
    grocery_id uuid NOT NULL references grocery(id) ON DELETE CASCADE,
    tag_id int NOT NULL references tag(id) ON DELETE CASCADE,
    added_by text references fp_user(username),
    added_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory_tag
(
    inventory_id uuid NOT NULL references inventory(id) ON DELETE CASCADE,
    tag_id int NOT NULL references tag(id) ON DELETE CASCADE,
    added_by text references fp_user(username),
    added_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shopping_list_tag
(
    shopping_list_id uuid NOT NULL references shopping_list(id) ON DELETE CASCADE,
    tag_id int NOT NULL references tag(id) ON DELETE CASCADE,
    added_by text references fp_user(username),
    added_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recipe_tag
(
    recipe_id uuid NOT NULL references recipe(id) ON DELETE CASCADE,
    tag_id int NOT NULL references tag(id) ON DELETE CASCADE,
    added_by text references fp_user(username),
    added_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);
