import express, { Request, Response } from 'express'
import { verifyToken } from '../auth'
import { db } from '../database'

const groceriesRouter = express.Router()

groceriesRouter.get('/', verifyToken, async (_req: Request, res: Response) => {
  try {
    const data = await db.groceries.selectAll()
    res.status(200).json(data)
  } catch (error: any) {
    res.json({
      success: false,
      error: error.message || error,
    })
  }
})

groceriesRouter.get(
  '/:groceryId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { groceryId } = req.params

    try {
      const data = await db.groceries.findById(groceryId)
      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

export default groceriesRouter
