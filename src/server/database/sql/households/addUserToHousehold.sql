INSERT INTO household_has_user(user_id, household_id)
VALUES(${user_id}, ${household_id})
RETURNING *
