/*
    Adds a new grocery.
*/
INSERT INTO grocery(grocery_name, created_by)
VALUES(${grocery_name}, ${created_by})
RETURNING *
