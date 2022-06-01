/*
    Gets all users of an household
*/
SELECT id, username FROM fp_user WHERE id IN 
    (SELECT user_id FROM household_has_user WHERE household_id = ${household_id})
