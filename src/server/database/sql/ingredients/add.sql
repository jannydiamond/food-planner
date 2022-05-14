/*
    Adds a new ingredient.
*/
INSERT INTO ingredients(name, inventoryAmount, inventoryUnitId)
VALUES(${name}, ${inventoryAmount}, ${inventoryUnitId})
RETURNING *
