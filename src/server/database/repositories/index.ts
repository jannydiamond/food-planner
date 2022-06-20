import { FpUsersRepository } from './users'
import { GroceriesRepository } from './groceries'
import { UnitsRepository } from './units'
import { HouseholdsRepository } from './households'
import { InventoriesRepository } from './inventories'
import { ShoppingListsRepository } from './shoppingLists'

// Database Interface Extensions:
export interface IExtensions {
  fpUsers: FpUsersRepository
  households: HouseholdsRepository
  groceries: GroceriesRepository
  units: UnitsRepository
  inventories: InventoriesRepository
  shoppingLists: ShoppingListsRepository
}

export {
  FpUsersRepository,
  HouseholdsRepository,
  GroceriesRepository,
  UnitsRepository,
  InventoriesRepository,
  ShoppingListsRepository,
}
