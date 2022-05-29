/*
    Gets all households of a user (created and part of)
*/
SELECT * FROM household WHERE id IN 
    (SELECT household_id FROM household_has_user WHERE user_id = ${user_id} )
