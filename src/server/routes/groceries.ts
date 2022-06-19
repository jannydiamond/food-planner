import express, { NextFunction, Request, Response } from 'express'
import { Grocery } from '../../model/types'
import { verifyToken } from '../auth'
import { db } from '../database'
import { RequestWithUser } from '../types'

const groceriesRouter = express.Router()

/*************************************************
 * Groceries CRUD
 ************************************************/

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

groceriesRouter.post(
  '/',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const grocery: Omit<Grocery, 'id' | 'updated_at'> = req.body

    const existingGrocery = await db.groceries.findByName(grocery.grocery_name)

    if (existingGrocery) {
      res.statusCode = 400
      res.send('Grocery does already exist')
      return next()
    }

    const currentUser = (req as RequestWithUser).user.user

    try {
      const data = await db.groceries.add({
        ...grocery,
        created_by: currentUser.username,
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

groceriesRouter.put(
  '/:groceryId',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { groceryId } = req.params
    const grocery = req.body
    const currentUser = (req as RequestWithUser).user.user

    const groceryToUpdate = await db.groceries.findById(groceryId)

    if (!groceryToUpdate) {
      res.statusCode = 400
      res.send('Grocery does not exist')
      return next()
    }

    try {
      await db.groceries.update({
        ...groceryToUpdate,
        ...grocery,
        updated_by: currentUser.username,
      })

      res.status(200).json('Grocery successfully updated!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

groceriesRouter.delete(
  '/:groceryId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { groceryId } = req.params

    try {
      await db.groceries.remove(groceryId)
      res.status(200).json('Successfully removed grocery!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

/*************************************************
 * Groceries get by
 ************************************************/

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

groceriesRouter.get(
  '/:groceryName',
  verifyToken,
  async (req: Request, res: Response) => {
    const { groceryName } = req.params

    try {
      const data = await db.groceries.findByName(groceryName)
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
