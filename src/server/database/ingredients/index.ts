import db from '../db'
import sql from '../sql'

export const getIngredients = async () => {
  return await db.any(sql.ingredients.listAll)
}

export const getIngredientById = async (id: number) => {
  return await db.one(sql.ingredients.byId, { id })
}
