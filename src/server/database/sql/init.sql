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
    origin_country_iso char(2) references country(country_iso),
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
    id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    country_name varchar(100) NOT NULL UNIQUE,
    country_iso char(2) NOT NULL UNIQUE,
    created_by text references fp_user(username),
    created_at timestamp DEFAULT NOW(),
    updated_by text references fp_user(username),
    updated_at timestamp NOT NULL DEFAULT NOW()
);

INSERT INTO country (country_name, country_iso) VALUES 
    ('Afghanistan', 'AF'), 
    ('Albania', 'AL'), 
    ('Algeria', 'DZ'), 
    ('American Samoa', 'AS'), 
    ('Andorra', 'AD'), 
    ('Angola', 'AO'), 
    ('Anguilla', 'AI'), 
    ('Antarctica', 'AQ'), 
    ('Antigua and Barbuda', 'AG'), 
    ('Argentina', 'AR'), 
    ('Armenia', 'AM'), 
    ('Aruba', 'AW'), 
    ('Australia', 'AU'), 
    ('Austria', 'AT'), 
    ('Azerbaijan', 'AZ'), 
    ('Bahamas', 'BS'), 
    ('Bahrain', 'BH'), 
    ('Bangladesh', 'BD'), 
    ('Barbados', 'BB'), 
    ('Belarus', 'BY'), 
    ('Belgium', 'BE'), 
    ('Belize', 'BZ'), 
    ('Benin', 'BJ'), 
    ('Bermuda', 'BM'), 
    ('Bhutan', 'BT'), 
    ('Bosnia and Herzegovina', 'BA'), 
    ('Botswana', 'BW'), 
    ('Bouvet Island', 'BV'), 
    ('Brazil', 'BR'), 
    ('British Indian Ocean Territory', 'IO'), 
    ('Brunei Darussalam', 'BN'), 
    ('Bulgaria', 'BG'), 
    ('Burkina Faso', 'BF'), 
    ('Burundi', 'BI'), 
    ('Cambodia', 'KH'), 
    ('Cameroon', 'CM'), 
    ('Canada', 'CA'), 
    ('Cape Verde', 'CV'), 
    ('Cayman Islands', 'KY'), 
    ('Central African Republic', 'CF'), 
    ('Chad', 'TD'), 
    ('Chile', 'CL'), 
    ('China', 'CN'), 
    ('Christmas Island', 'CX'), 
    ('Cocos (Keeling) Islands', 'CC'), 
    ('Colombia', 'CO'), 
    ('Comoros', 'KM'), 
    ('Congo', 'CG'), 
    ('Cook Islands', 'CK'), 
    ('Costa Rica', 'CR'), 
    ('Croatia', 'HR'), 
    ('Cuba', 'CU'), 
    ('Cyprus', 'CY'), 
    ('Czech Republic', 'CZ'), 
    ('Denmark', 'DK'), 
    ('Djibouti', 'DJ'), 
    ('Dominica', 'DM'), 
    ('Dominican Republic', 'DO'), 
    ('Ecuador', 'EC'), 
    ('Egypt', 'EG'), 
    ('El Salvador', 'SV'), 
    ('Equatorial Guinea', 'GQ'), 
    ('Eritrea', 'ER'), 
    ('Estonia', 'EE'), 
    ('Ethiopia', 'ET'), 
    ('Falkland Islands (Malvinas)' ,'FK'), 
    ('Faroe Islands', 'FO'), 
    ('Fiji', 'FJ'), 
    ('Finland', 'FI'), 
    ('France', 'FR'), 
    ('French Guiana', 'GF'), 
    ('French Polynesia', 'PF'), 
    ('French Southern Territories', 'TF'), 
    ('Gabon', 'GA'), 
    ('Gambia', 'GM'), 
    ('Georgia', 'GE'), 
    ('Germany', 'DE'), 
    ('Ghana', 'GH'), 
    ('Gibraltar', 'GI'), 
    ('Greece', 'GR'), 
    ('Greenland', 'GL'), 
    ('Grenada', 'GD'), 
    ('Guadeloupe', 'GP'), 
    ('Guam', 'GU'), 
    ('Guatemala', 'GT'), 
    ('Guernsey', 'GG'), 
    ('Guinea', 'GN'), 
    ('Guinea-Bissau', 'GW'), 
    ('Guyana', 'GY'), 
    ('Haiti', 'HT'), 
    ('Heard Island and McDonald Islands', 'HM'), 
    ('Holy See (Vatican City State)' ,'VA'), 
    ('Honduras', 'HN'), 
    ('Hong Kong', 'HK'), 
    ('Hungary', 'HU'), 
    ('Iceland', 'IS'), 
    ('India', 'IN'), 
    ('Indonesia', 'ID'), 
    ('Iraq', 'IQ'), 
    ('Ireland', 'IE'), 
    ('Isle of Man', 'IM'), 
    ('Israel', 'IL'), 
    ('Italy', 'IT'), 
    ('Jamaica', 'JM'), 
    ('Japan', 'JP'), 
    ('Jersey', 'JE'), 
    ('Jordan', 'JO'), 
    ('Kazakhstan', 'KZ'), 
    ('Kenya', 'KE'), 
    ('Kiribati', 'KI'), 
    ('Kuwait', 'KW'), 
    ('Kyrgyzstan', 'KG'), 
    ('Lao Peoples Democratic Republic', 'LA'), 
    ('Latvia', 'LV'), 
    ('Lebanon', 'LB'), 
    ('Lesotho', 'LS'), 
    ('Liberia', 'LR'), 
    ('Libya', 'LY'), 
    ('Liechtenstein', 'LI'), 
    ('Lithuania', 'LT'), 
    ('Luxembourg', 'LU'), 
    ('Macao', 'MO'), 
    ('Madagascar', 'MG'), 
    ('Malawi', 'MW'), 
    ('Malaysia', 'MY'), 
    ('Maldives', 'MV'), 
    ('Mali', 'ML'), 
    ('Malta', 'MT'), 
    ('Marshall Islands', 'MH'), 
    ('Martinique', 'MQ'), 
    ('Mauritania', 'MR'), 
    ('Mauritius', 'MU'), 
    ('Mayotte', 'YT'), 
    ('Mexico', 'MX'), 
    ('Monaco', 'MC'), 
    ('Mongolia', 'MN'), 
    ('Montenegro', 'ME'), 
    ('Montserrat', 'MS'), 
    ('Morocco', 'MA'), 
    ('Mozambique', 'MZ'), 
    ('Myanmar', 'MM'),
    ('Namibia', 'NA'),
    ('Nauru', 'NR'),
    ('Nepal', 'NP'),
    ('Netherlands', 'NL'),
    ('New Caledonia', 'NC'),
    ('New Zealand', 'NZ'),
    ('Nicaragua', 'NI'),
    ('Niger', 'NE'),
    ('Nigeria', 'NG'),
    ('Niue', 'NU'),
    ('Norfolk Island', 'NF'),
    ('Northern Mariana Islands', 'MP'),
    ('Norway', 'NO'), 
    ('Oman', 'OM'), 
    ('Pakistan', 'PK'), 
    ('Palau', 'PW'), 
    ('Panama', 'PA'), 
    ('Papua New Guinea', 'PG'), 
    ('Paraguay', 'PY'), 
    ('Peru', 'PE'), 
    ('Philippines', 'PH'), 
    ('Pitcairn', 'PN'), 
    ('Poland', 'PL'), 
    ('Portugal', 'PT'), 
    ('Puerto Rico', 'PR'), 
    ('Qatar', 'QA'), 
    ('Romania', 'RO'), 
    ('Russian Federation', 'RU'), 
    ('Rwanda', 'RW'), 
    ('Saint Kitts and Nevis', 'KN'), 
    ('Saint Lucia', 'LC'), 
    ('Saint Martin (French part)' ,'MF'), 
    ('Saint Pierre and Miquelon', 'PM'), 
    ('Saint Vincent and the Grenadines', 'VC'), 
    ('Samoa', 'WS'), 
    ('San Marino', 'SM'), 
    ('Sao Tome and Principe', 'ST'), 
    ('Saudi Arabia', 'SA'), 
    ('Senegal', 'SN'), 
    ('Serbia', 'RS'), 
    ('Seychelles', 'SC'), 
    ('Sierra Leone', 'SL'), 
    ('Singapore', 'SG'), 
    ('Sint Maarten (Dutch part)' ,'SX'), 
    ('Slovakia', 'SK'), 
    ('Slovenia', 'SI'), 
    ('Solomon Islands', 'SB'), 
    ('Somalia', 'SO'), 
    ('South Africa', 'ZA'), 
    ('South Georgia and the South Sandwich Islands', 'GS'), 
    ('South Sudan', 'SS'), 
    ('Spain', 'ES'), 
    ('Sri Lanka', 'LK'), 
    ('Sudan', 'SD'), 
    ('Suriname', 'SR'), 
    ('Svalbard and Jan Mayen', 'SJ'), 
    ('Swaziland', 'SZ'), 
    ('Sweden', 'SE'), 
    ('Switzerland', 'CH'), 
    ('Syrian Arab Republic', 'SY'), 
    ('Tajikistan', 'TJ'), 
    ('Thailand', 'TH'), 
    ('Timor-Leste', 'TL'), 
    ('Togo', 'TG'), 
    ('Tokelau', 'TK'), 
    ('Tonga', 'TO'), 
    ('Trinidad and Tobago', 'TT'), 
    ('Tunisia', 'TN'), 
    ('Turkey', 'TR'), 
    ('Turkmenistan', 'TM'), 
    ('Turks and Caicos Islands', 'TC'), 
    ('Tuvalu', 'TV'), 
    ('Uganda', 'UG'), 
    ('Ukraine', 'UA'), 
    ('United Arab Emirates', 'AE'), 
    ('United Kingdom', 'GB'), 
    ('United States', 'US'), 
    ('United States Minor Outlying Islands', 'UM'), 
    ('Uruguay', 'UY'), 
    ('Uzbekistan', 'UZ'), 
    ('Vanuatu', 'VU'), 
    ('Viet Nam', 'VN'), 
    ('Wallis and Futuna', 'WF'), 
    ('Western Sahara', 'EH'), 
    ('Yemen', 'YE'), 
    ('Zambia', 'ZM'), 
    ('Zimbabwe', 'ZW');

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
