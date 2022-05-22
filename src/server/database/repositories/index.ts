import { GroceriesRepository } from './groceries'
import { UnitsRepository } from './units'

// Database Interface Extensions:
interface IExtensions {
  groceries: GroceriesRepository
  units: UnitsRepository
}

export { IExtensions, GroceriesRepository, UnitsRepository }
