/*
    Adds a new user.
*/
INSERT INTO fp_user(username, password)
VALUES(${username}, ${password})
RETURNING *
