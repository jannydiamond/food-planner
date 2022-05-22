/*
    Adds a new unit.
*/
INSERT INTO unit(unit_name)
VALUES(${unitName})
RETURNING *
