import express, { Request, Response } from 'express'
import { db } from '../database'

const unitsRouter = express.Router()

unitsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await db.units.selectAll()
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

unitsRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const data = await db.units.findById(parseInt(id))
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

export default unitsRouter
