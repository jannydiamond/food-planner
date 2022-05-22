/*
    Adds a new grocery.
*/
INSERT INTO grocery(grocery_name, created_by, updated_at)
VALUES(${groceryName}, ${createdBy}, ${updatedAt})
RETURNING *
