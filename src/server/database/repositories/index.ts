import { FpUsersRepository } from './users'
import { GroceriesRepository } from './groceries'
import { UnitsRepository } from './units'
import { HouseholdsRepository } from './households'
import { InventoriesRepository } from './inventories'

// Database Interface Extensions:
export interface IExtensions {
  fpUsers: FpUsersRepository
  households: HouseholdsRepository
  groceries: GroceriesRepository
  units: UnitsRepository
  inventories: InventoriesRepository
}

export {
  FpUsersRepository,
  HouseholdsRepository,
  GroceriesRepository,
  UnitsRepository,
  InventoriesRepository,
}
