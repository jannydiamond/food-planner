/*
    Adds a new unit.
*/
INSERT INTO units(name)
VALUES(${name})
RETURNING *
