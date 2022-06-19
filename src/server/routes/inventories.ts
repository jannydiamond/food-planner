import express, { NextFunction, Request, Response } from 'express'
import { Inventory, InventoryHasGrocery } from '../../model/types'
import { verifyToken } from '../auth'
import { db } from '../database'
import { RequestWithUser } from '../types'

const inventoriesRouter = express.Router({ mergeParams: true })

/*************************************************
 * Inventories CRUD
 ************************************************/

inventoriesRouter.get('/', verifyToken, async (req: Request, res: Response) => {
  const { householdId } = req.params
  try {
    const data = await db.inventories.selectAll(householdId)
    res.status(200).json(data)
  } catch (error: any) {
    res.json({
      success: false,
      error: error.message || error,
    })
  }
})

inventoriesRouter.post(
  '/',
  verifyToken,
  async (req: Request, res: Response) => {
    const { householdId } = req.params
    const inventory: Omit<Inventory, 'id' | 'created_at' | 'updated_at'> =
      req.body

    const currentUser = (req as RequestWithUser).user.user

    try {
      const data = await db.inventories.add({
        ...inventory,
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

inventoriesRouter.put(
  '/:inventoryId',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { inventoryId } = req.params
    const inventory = req.body
    const currentUser = (req as RequestWithUser).user.user

    const inventoryToUpdate = await db.inventories.findById(inventoryId)

    if (!inventoryToUpdate) {
      res.statusCode = 400
      res.send('Inventory does not exist')
      return next()
    }

    try {
      await db.inventories.update({
        ...inventoryToUpdate,
        ...inventory,
        updated_by: currentUser.username,
      })

      res.status(200).json('Inventory successfully updated!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

inventoriesRouter.delete(
  '/:inventoryId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { inventoryId } = req.params

    try {
      await db.inventories.remove(inventoryId)
      res.status(200).json('Successfully removed inventory!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

/*************************************************
 * Inventories get by
 ************************************************/

inventoriesRouter.get(
  '/:inventoryId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { inventoryId } = req.params

    try {
      const data = await db.inventories.findById(inventoryId)
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
 * Inventory groceries CRUD
 ************************************************/

inventoriesRouter.get(
  '/:inventoryId/groceries',
  verifyToken,
  async (req: Request, res: Response) => {
    const { inventoryId } = req.params

    try {
      const data = await db.inventories.selectAllGroceries(inventoryId)
      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

inventoriesRouter.post(
  '/:inventoryId/groceries',
  verifyToken,
  async (req: Request, res: Response) => {
    const item: Omit<InventoryHasGrocery, 'created_at' | 'updated_at'> =
      req.body

    const currentUser = (req as RequestWithUser).user.user

    try {
      const data = await db.inventories.addGroceryToInventory({
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

inventoriesRouter.put(
  '/:inventoryId/groceries/:groceryId',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { inventoryId, groceryId } = req.params
    const item = req.body
    const currentUser = (req as RequestWithUser).user.user

    const itemToUpdate = await db.inventories.findInventoryHasGroceryItemById(
      inventoryId,
      groceryId
    )

    if (!itemToUpdate) {
      res.statusCode = 400
      res.send('Inventory does not contain this grocery')
      return next()
    }

    try {
      await db.inventories.updateGroceryInInventory({
        ...itemToUpdate,
        ...item,
        updated_by: currentUser.username,
      })

      res.status(200).json('Grocery in inventory successfully updated!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

inventoriesRouter.delete(
  '/:inventoryId/groceries/:groceryId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { inventoryId, groceryId } = req.params

    try {
      await db.inventories.removeGroceryFromInventory(inventoryId, groceryId)
      res.status(200).json('Successfully removed grocery from inventory!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

export default inventoriesRouter
