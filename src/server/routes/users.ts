import express, { Request, Response } from 'express'
import { verifyToken } from '../auth'
import { db } from '../database'

const usersRouter = express.Router()

usersRouter.get('/', verifyToken, async (_req: Request, res: Response) => {
  try {
    const data = await db.fpUsers.selectAll()
    res.status(200).json(data)
  } catch (error: any) {
    res.json({
      success: false,
      error: error.message || error,
    })
  }
})

usersRouter.get(
  '/:userId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { userId } = req.params

    try {
      const data = await db.fpUsers.findById(userId)
      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

usersRouter.get(
  '/:username',
  verifyToken,
  async (req: Request, res: Response) => {
    const { username } = req.params

    try {
      const data = await db.fpUsers.findByName(username)
      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

export default usersRouter
