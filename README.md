# food-planner

## API Endpoints

POST /register <br />
POST /login <br />

GET /users <br />
GET /users/:userId <br />
GET /users/:username <br />

GET /households <br />
POST /households <br />
GET /households/:householdId <br />
PUT /households/:householdId <br />
DELETE /households/:householdId <br />

GET /households/:householdId/users <br />
POST /households/:householdId/users <br />
DELETE /households/:householdId/users/:userId <br />

GET /households/:householdId/inventories <br />
POST /households/:householdId/inventories <br />
GET /households/:householdId/inventories/:inventoryId <br />
PUT /households/:householdId/inventories/:inventoryId <br />
DELETE /households/:householdId/inventories/:inventoryId <br />

GET /households/:householdId/inventories/:inventoryId/groceries <br />
POST /households/:householdId/inventories/:inventoryId/groceries <br />
PUT /households/:householdId/inventories/:inventoryId/groceries/:groceryId <br />
DELETE /households/:householdId/inventories/:inventoryId/groceries/:groceryId <br />

GET /households/:householdId/shopping-lists <br />
POST /households/:householdId/shopping-lists <br />
GET /households/:householdId/shopping-lists/:shoppingListId <br />
PUT /households/:householdId/shopping-lists/:shoppingListId <br />
DELETE /households/:householdId/shopping-lists/:shoppingListId <br />

GET /households/:householdId/shopping-lists/:shoppingListId/groceries <br />
POST /households/:householdId/shopping-lists/:shoppingListId/groceries <br />
PUT /households/:householdId/shopping-lists/:shoppingListId/groceries/:groceryId <br />
DELETE /households/:householdId/shopping-lists/:shoppingListId/groceries/:groceryId <br />

GET /groceries <br />
POST /groceries <br />
GET /groceries/:groceriesId <br />
PUT /groceries/:groceriesId <br />
DELETE /groceries/:groceriesId <br />

GET /units <br />
POST /units <br />
PUT /units/:unitsId <br />
DELETE /units/:unitsId <br />

GET /recipes <br />
POST /recipes <br />
GET /recipes/:recipeId <br />
PUT /recipes/:recipeId <br />
DELETE /recipes/:recipeId <br />

GET /recipes/:recipeId/groceries <br />
POST /recipes/:recipeId/groceries <br />
GET /recipes/:recipeId/groceries/:groceryId <br />
PUT /recipes/:recipeId/groceries/:groceryId <br />
DELETE /recipes/:recipeId/groceries/:groceryId <br />

GET /stores <br />
POST /stores <br />
GET /stores/:storeId <br />
PUT /stores/:storeId <br />
DELETE /stores/:storeId <br />

GET /tags <br />
POST /tags <br />
GET /tags/:tagId <br />
PUT /tags/:tagId <br />
DELETE /tags/:tagId <br />

GET /tags/:tagId?type=global <br />
GET /tags/:tagId?type=grocery <br />
GET /tags/:tagId?type=recipe <br />
GET /tags/:tagId?type=inventory <br />
GET /tags/:tagId?type=shopping-list <br />
