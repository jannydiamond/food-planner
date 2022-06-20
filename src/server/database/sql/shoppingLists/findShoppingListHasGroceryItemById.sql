/*
    Finds shopping list has grocery item by id
*/
SELECT * FROM shopping_list_has_grocery WHERE shopping_list_id = ${shopping_list_id} AND grocery_id = ${grocery_id}
