import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { FpUser } from '../model/types'

export const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'foodplanner'

export const generateAccessToken = (user: Pick<FpUser, 'id' | 'username'>) => {
  return jwt.sign({ user: user }, TOKEN_SECRET, {
    expiresIn: '7 days',
  })
}

export const verifyToken: any = (
  req: Request & { user: Pick<FpUser, 'id' | 'username'> },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token === null) {
    res.statusCode = 401
    res.send('Unauthorized!')
    return
  }

  jwt.verify(token as string, TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) {
      res.statusCode = 403
      res.send('Forbidden!')
      return
    }

    req.user = user

    next()
  })
}
