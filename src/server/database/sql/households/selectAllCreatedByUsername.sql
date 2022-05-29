/*
    Gets all created households of a user
*/
SELECT * FROM household WHERE created_by = ${username}
