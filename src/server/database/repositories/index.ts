import { FpUsersRepository } from './users'
import { GroceriesRepository } from './groceries'
import { UnitsRepository } from './units'
import { HouseholdsRepository } from './households'

// Database Interface Extensions:
export interface IExtensions {
  fpUsers: FpUsersRepository
  households: HouseholdsRepository
  groceries: GroceriesRepository
  units: UnitsRepository
}

export {
  FpUsersRepository,
  HouseholdsRepository,
  GroceriesRepository,
  UnitsRepository,
}
