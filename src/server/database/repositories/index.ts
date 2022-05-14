import { IngredientsRepository } from './ingredients'
import { UnitsRepository } from './units'

// Database Interface Extensions:
interface IExtensions {
  ingredients: IngredientsRepository
  units: UnitsRepository
}

export { IExtensions, IngredientsRepository, UnitsRepository }
