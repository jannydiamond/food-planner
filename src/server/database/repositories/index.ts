import { FpUsersRepository } from './users'
import { GroceriesRepository } from './groceries'
import { UnitsRepository } from './units'

// Database Interface Extensions:
interface IExtensions {
  fpUsers: FpUsersRepository
  groceries: GroceriesRepository
  units: UnitsRepository
}

export { IExtensions, FpUsersRepository, GroceriesRepository, UnitsRepository }
