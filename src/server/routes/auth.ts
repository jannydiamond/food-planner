import express, { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { db } from '../database'
import { generateAccessToken } from '../auth'

const authRouter = express.Router()

/**
 * @swagger
 * /register:
 *   post:
 *     description: Register new user
 *     parameters:
 *     - username: String
 *       description: Username
 *       in: formData
 *       required: true
 *       type: String
 *     - password: String
 *       description: Password
 *       in: formData
 *       required: true
 *       type: String
 *     responses:
 *       201:
 *         description: Created
 *
 */
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
  }
)

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login a user
 *     parameters:
 *     - username: String
 *       description: Username
 *       in: formData
 *       required: true
 *       type: String
 *     - password: String
 *       description: Password
 *       in: formData
 *       required: true
 *       type: String
 *     responses:
 *       200:
 *         description: Success
 *
 */
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

    res.statusCode = 200
    res.json({
      success: true,
      token,
    })
  }
)

export default authRouter
