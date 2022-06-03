import express, { Request, Response } from 'express'
import { verifyToken } from '../auth'
import { db } from '../database'

const unitsRouter = express.Router()

unitsRouter.get('/', verifyToken, async (_req: Request, res: Response) => {
  try {
    const data = await db.units.selectAll()
    res.status(200).json(data)
  } catch (error: any) {
    res.json({
      success: false,
      error: error.message || error,
    })
  }
})

unitsRouter.get(
  '/:unitId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { unitId } = req.params

    try {
      const data = await db.units.findById(parseInt(unitId))
      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

export default unitsRouter
