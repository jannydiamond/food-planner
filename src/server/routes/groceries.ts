import express, { Request, Response } from 'express'
import { db } from '../database'

const groceriesRouter = express.Router()

groceriesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await db.groceries.selectAll()
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

groceriesRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const data = await db.groceries.findById(parseInt(id))
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

export default groceriesRouter
