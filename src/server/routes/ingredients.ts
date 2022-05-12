import express, { Request, Response } from 'express'
import { getIngredientById, getIngredients } from '../database/ingredients'

const ingredientsRouter = express.Router()

// define the home page route
ingredientsRouter.get('/', async (req: Request, res: Response) => {
  const ingredients = await getIngredients()
  res.send(ingredients)
})

// define the about route
ingredientsRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const ingredient = await getIngredientById(parseInt(id))
  res.send(ingredient)
})

export default ingredientsRouter
