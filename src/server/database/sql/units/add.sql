/*
    Adds a new unit.
*/
INSERT INTO unit(unit_name, created_by)
VALUES(${unit_name}, ${created_by})
RETURNING *
