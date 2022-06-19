/*
    Finds inventory has grocery item by id
*/
SELECT * FROM inventory_has_grocery WHERE inventory_id = ${inventory_id} AND grocery_id = ${grocery_id}
