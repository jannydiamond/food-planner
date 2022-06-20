import { QueryFile, IQueryFileOptions } from 'pg-promise'
import { join } from 'path'

// Helper for linking to external query files:
const sql = (file: string): QueryFile => {
  const fullPath: string = join(__dirname, file) // generating full path

  const options: IQueryFileOptions = {
    minify: true,
  }

  const queryFile: QueryFile = new QueryFile(fullPath, options)

  if (queryFile.error) {
    console.error(queryFile.error)
  }

  return queryFile
}

export const fpUsers = {
  empty: sql('fpUsers/empty.sql'),
  add: sql('fpUsers/add.sql'),
  remove: sql('fpUsers/remove.sql'),
  selectAll: sql('fpUsers/selectAll.sql'),
  findById: sql('fpUsers/findById.sql'),
  findByName: sql('fpUsers/findByName.sql'),
}

export const households = {
  add: sql('households/add.sql'),
  addUserToHousehold: sql('households/addUserToHousehold.sql'),
  remove: sql('households/remove.sql'),
  removeUserFromHousehold: sql('households/removeUserFromHousehold.sql'),
  selectAllCreatedByUsername: sql('households/selectAllCreatedByUsername.sql'),
  selectAllHouseholdsOfUser: sql('households/selectAllHouseholdsOfUser.sql'),
  selectAllUsersOfHousehold: sql('households/selectAllUsersOfHousehold.sql'),
  findById: sql('households/findById.sql'),
}

export const groceries = {
  empty: sql('groceries/empty.sql'),
  remove: sql('groceries/remove.sql'),
  selectAll: sql('groceries/selectAll.sql'),
  findById: sql('groceries/findById.sql'),
  findByName: sql('groceries/findByName.sql'),
}

export const units = {
  empty: sql('units/empty.sql'),
  add: sql('units/add.sql'),
  remove: sql('units/remove.sql'),
  selectAll: sql('units/selectAll.sql'),
  findById: sql('units/findById.sql'),
  findByName: sql('units/findByName.sql'),
}

export const inventories = {
  empty: sql('inventories/empty.sql'),
  remove: sql('inventories/remove.sql'),
  removeGroceryFromInventory: sql('inventories/removeGroceryFromInventory.sql'),
  selectAll: sql('inventories/selectAll.sql'),
  selectAllGroceries: sql('inventories/selectAllGroceries.sql'),
  findById: sql('inventories/findById.sql'),
  findInventoryHasGroceryItemById: sql(
    'inventories/findInventoryHasGroceryItemById.sql'
  ),
}

export const shoppingLists = {
  empty: sql('shoppingLists/empty.sql'),
  remove: sql('shoppingLists/remove.sql'),
  removeGroceryFromShoppingList: sql(
    'shoppingLists/removeGroceryFromShoppingList.sql'
  ),
  selectAll: sql('shoppingLists/selectAll.sql'),
  selectAllGroceries: sql('shoppingLists/selectAllGroceries.sql'),
  findById: sql('shoppingLists/findById.sql'),
  findShoppingListHasGroceryItemById: sql(
    'shoppingLists/findShoppingListHasGroceryItemById.sql'
  ),
}
