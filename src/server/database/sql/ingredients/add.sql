/*
    Adds a new ingredient.
*/
INSERT INTO ingredients(name, inventory_amount, inventory_unit_id)
VALUES(${name}, ${inventoryAmount}, ${inventoryUnitId})
RETURNING *
