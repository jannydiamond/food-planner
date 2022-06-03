import express, { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { db } from '../database'
import { generateAccessToken } from '../auth'

const authRouter = express.Router()

authRouter.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body

    if (username === undefined || username.length === 0) {
      res.statusCode = 400
      res.send('Username required')
      return next()
    }

    if (password === undefined || password.length === 0) {
      res.statusCode = 400
      res.send('Password required')
      return next()
    }

    const existingUser = await db.fpUsers.findByName(username)

    if (existingUser) {
      res.statusCode = 400
      res.send('Username does already exist')
      return next()
    }

    try {
      const data = await db.fpUsers.add({
        username,
        password: bcrypt.hashSync(password, 10),
      })

      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

authRouter.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body

    if (username === undefined || username.length === 0) {
      res.statusCode = 400
      res.send('Username required')
      return next()
    }

    if (password === undefined || password.length === 0) {
      res.statusCode = 400
      res.send('Password required')
      return next()
    }

    const existingUser = await db.fpUsers.findByName(username)

    const failureMessage =
      'Authentication failed - please check username and password'

    if (!existingUser) {
      res.statusCode = 401
      res.send(failureMessage)
      return next()
    }

    const passwordIsCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    )

    if (!passwordIsCorrect) {
      res.statusCode = 401
      res.send(failureMessage)
      return next()
    }

    const token = generateAccessToken({
      id: existingUser.id,
      username: existingUser.username,
    })

    res.status(200).json(token)
  }
)

export default authRouter
