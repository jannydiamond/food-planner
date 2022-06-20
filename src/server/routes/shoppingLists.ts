import express, { NextFunction, Request, Response } from 'express'
import { ShoppingList, ShoppingListHasGrocery } from '../../model/types'
import { verifyToken } from '../auth'
import { db } from '../database'
import { RequestWithUser } from '../types'

const shoppingListsRouter = express.Router({ mergeParams: true })

/*************************************************
 * Shopping lists CRUD
 ************************************************/

shoppingListsRouter.get(
  '/',
  verifyToken,
  async (req: Request, res: Response) => {
    const { householdId } = req.params
    try {
      const data = await db.shoppingLists.selectAll(householdId)
      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

shoppingListsRouter.post(
  '/',
  verifyToken,
  async (req: Request, res: Response) => {
    const { householdId } = req.params
    const shoppingList: Omit<ShoppingList, 'id' | 'created_at' | 'updated_at'> =
      req.body

    const currentUser = (req as RequestWithUser).user.user

    try {
      const data = await db.shoppingLists.add({
        ...shoppingList,
        created_by: currentUser.username,
        updated_by: currentUser.username,
        household_id: householdId,
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

shoppingListsRouter.put(
  '/:shoppingListId',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { shoppingListId } = req.params
    const shoppingList = req.body
    const currentUser = (req as RequestWithUser).user.user

    const shoppingListToUpdate = await db.shoppingLists.findById(shoppingListId)

    if (!shoppingListToUpdate) {
      res.statusCode = 400
      res.send('Shopping list does not exist')
      return next()
    }

    try {
      await db.shoppingLists.update({
        ...shoppingListToUpdate,
        ...shoppingList,
        updated_by: currentUser.username,
      })

      res.status(200).json('Shopping list successfully updated!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

shoppingListsRouter.delete(
  '/:shoppingListId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { shoppingListId } = req.params

    try {
      await db.shoppingLists.remove(shoppingListId)
      res.status(200).json('Successfully removed shopping list!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

/*************************************************
 * Shopping lists get by
 ************************************************/

shoppingListsRouter.get(
  '/:shoppingListId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { shoppingListId } = req.params

    try {
      const data = await db.shoppingLists.findById(shoppingListId)
      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

/*************************************************
 * Shopping list groceries CRUD
 ************************************************/

shoppingListsRouter.get(
  '/:shoppingListId/groceries',
  verifyToken,
  async (req: Request, res: Response) => {
    const { shoppingListId } = req.params

    try {
      const data = await db.shoppingLists.selectAllGroceries(shoppingListId)
      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

shoppingListsRouter.post(
  '/:shoppingListId/groceries',
  verifyToken,
  async (req: Request, res: Response) => {
    const item: Omit<ShoppingListHasGrocery, 'created_at' | 'updated_at'> =
      req.body

    const currentUser = (req as RequestWithUser).user.user

    try {
      const data = await db.shoppingLists.addGroceryToShoppingList({
        ...item,
        added_by: currentUser.username,
        updated_by: currentUser.username,
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

shoppingListsRouter.put(
  '/:shoppingListId/groceries/:groceryId',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { shoppingListId, groceryId } = req.params
    const item = req.body
    const currentUser = (req as RequestWithUser).user.user

    const itemToUpdate =
      await db.shoppingLists.findShoppingListHasGroceryItemById(
        shoppingListId,
        groceryId
      )

    if (!itemToUpdate) {
      res.statusCode = 400
      res.send('Shopping list does not contain this grocery')
      return next()
    }

    try {
      await db.shoppingLists.updateGroceryInShoppingList({
        ...itemToUpdate,
        ...item,
        updated_by: currentUser.username,
      })

      res.status(200).json('Grocery in shopping list successfully updated!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

shoppingListsRouter.delete(
  '/:shoppingListId/groceries/:groceryId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { shoppingListId, groceryId } = req.params

    try {
      await db.shoppingLists.removeGroceryFromShoppingList(
        shoppingListId,
        groceryId
      )
      res.status(200).json('Successfully removed grocery from shopping list!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

export default shoppingListsRouter
