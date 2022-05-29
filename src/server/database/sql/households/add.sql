/*
    Adds a new household.
*/
INSERT INTO household(household_name, created_by)
VALUES(${household_name}, ${created_by})
RETURNING *
