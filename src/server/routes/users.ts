import express, { Request, Response } from 'express'
import { verifyToken } from '../auth'
import { db } from '../database'

const usersRouter = express.Router()

usersRouter.get('/', verifyToken, async (_req: Request, res: Response) => {
  try {
    const data = await db.fpUsers.selectAll()
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

usersRouter.get('/:id', verifyToken, async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const data = await db.fpUsers.findById(parseInt(id))
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

export default usersRouter
