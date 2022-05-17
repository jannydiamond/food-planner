import express, { Request, Response } from 'express'
import { db } from '../database'

const ingredientsRouter = express.Router()

ingredientsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await db.ingredients.selectAll()
    res.json({
      success: true,
      data,
    })
  } catch (error: any) {
    res.json({
      success: false,
      error: error.message || error,
    })
  }
})

ingredientsRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const data = await db.ingredients.findById(parseInt(id))
    res.json({
      success: true,
      data,
    })
  } catch (error: any) {
    res.json({
      success: false,
      error: error.message || error,
    })
  }
})

export default ingredientsRouter