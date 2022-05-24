import { FpUsersRepository } from './users'
import { GroceriesRepository } from './groceries'
import { UnitsRepository } from './units'

// Database Interface Extensions:
export interface IExtensions {
  fpUsers: FpUsersRepository
  groceries: GroceriesRepository
  units: UnitsRepository
}

export { FpUsersRepository, GroceriesRepository, UnitsRepository }
