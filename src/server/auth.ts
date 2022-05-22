import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'foodplanner'

export const generateAccessToken = (username: string) => {
  return jwt.sign({ user: username }, TOKEN_SECRET, {
    expiresIn: '7 days',
  })
}

export const verifyToken = (
  req: Request & { user: any },
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

  jwt.verify(token, TOKEN_SECRET as string, (err: any, user: any) => {
    console.log(err)

    if (err) {
      res.statusCode = 403
      res.send('Forbidden!')
      return
    }

    req.user = user

    next()
  })
}
