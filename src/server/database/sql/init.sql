CREATE extension IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS fp_user
(
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    created_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS household
(
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    household_name text NOT NULL,
    created_by uuid references fp_user(id) NOT NULL,
    created_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS household_has_user
(
    user_id uuid references fp_user(id) NOT NULL,
    household_id uuid references household(id) NOT NULL,
    added_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory
(
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    inventory_name text NOT NULL,
    created_by uuid references fp_user(id) NOT NULL,
    created_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW(),
    household_id uuid references household(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS unit
(
    id serial PRIMARY KEY NOT NULL,
    unit_name text NOT NULL,
    created_by uuid references fp_user(id),
    created_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS grocery
(
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    grocery_name text NOT NULL,
    base_amount int,
    base_unit_id int references unit(id),
    alt_amount int,
    alt_unit_id int references unit(id),
    created_by uuid references fp_user(id) NOT NULL,
    created_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory_has_grocery
(
    inventory_id uuid references inventory(id) NOT NULL,
    grocery_id uuid references grocery(id) NOT NULL,
    amount int,
    unit_id int references unit(id),
    bestBefore date,
    added_by uuid references fp_user(id) NOT NULL,
    added_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shopping_list
(
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    shopping_list_name text NOT NULL,
    created_by uuid references fp_user(id) NOT NULL,
    created_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW(),
    household_id uuid references household(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS shopping_list_has_grocery
(
    shopping_list_id uuid references shopping_list(id) NOT NULL,
    grocery_id uuid references grocery(id) NOT NULL,
    amount int,
    unit_id int references unit(id),
    added_by uuid references fp_user(id) NOT NULL,
    added_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recipe
(
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    recipe_name text NOT NULL,
    steps jsonb,
    created_by uuid references fp_user(id) NOT NULL,
    created_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW(),
    household_id uuid references household(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS recipe_has_grocery
(
    grocery_id uuid references grocery(id) NOT NULL,
    recipe_id uuid references recipe(id) NOT NULL,
    amount int DEFAULT 0,
    unit_id int references unit(id),
    created_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tag
(
    id serial PRIMARY KEY NOT NULL,
    tag_name text NOT NULL,
    created_by uuid references fp_user(id) NOT NULL,
    created_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW(),
    household_id uuid references household(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS grocery_tag
(
    grocery_id uuid references grocery(id) NOT NULL,
    tag_id int references tag(id) NOT NULL,
    added_by uuid references fp_user(id) NOT NULL,
    added_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory_tag
(
    inventory_id uuid references inventory(id) NOT NULL,
    tag_id int references tag(id) NOT NULL,
    added_by uuid references fp_user(id) NOT NULL,
    added_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shopping_list_tag
(
    shopping_list_id uuid references shopping_list(id) NOT NULL,
    tag_id int references tag(id) NOT NULL,
    added_by uuid references fp_user(id) NOT NULL,
    added_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recipe_tag
(
    recipe_id uuid references recipe(id) NOT NULL,
    tag_id int references tag(id) NOT NULL,
    added_by uuid references fp_user(id) NOT NULL,
    added_at date DEFAULT NOW(),
    updated_at date NOT NULL DEFAULT NOW()
);
