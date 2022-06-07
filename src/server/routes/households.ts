import express, { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../auth'
import { db } from '../database'
import { RequestWithUser } from '../types'

const householdsRouter = express.Router()

/*************************************************
 * Households CRUD
 ************************************************/

householdsRouter.get('/', verifyToken, async (req: Request, res: Response) => {
  const currentUser = (req as RequestWithUser).user.user

  try {
    const data = await db.households.selectAllHouseholdsOfUser(currentUser.id)
    res.status(200).json(data)
  } catch (error: any) {
    res.json({
      success: false,
      error: error.message || error,
    })
  }
})

householdsRouter.post('/', verifyToken, async (req: Request, res: Response) => {
  const { household_name } = req.body
  const currentUser = (req as RequestWithUser).user.user

  try {
    await db
      .tx('tx-add-household', async () => {
        const household = await db.households.add({
          household_name,
          created_by: currentUser.username,
        })
        return db.households.addUserToHousehold(household.id, currentUser.id)
      })
      .then(async (data) => {
        const addedHousehold = await db.households.findById(data.household_id)

        res.status(200).json(addedHousehold)
      })
      .catch((error: any) => {
        res.json({
          success: false,
          error: error.message || error,
        })
      })
  } catch (error: any) {
    res.json({
      success: false,
      error: error.message || error,
    })
  }
})

householdsRouter.put(
  '/:householdId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { householdId } = req.params
    const { household_name } = req.body

    try {
      db.tx('tx-update-household', async () => {
        const household = await db.households.findById(householdId)

        if (!household) return

        return db.households.update({
          ...household,
          household_name,
        })
      })

      res.status(200).json('Household successfully updated!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

householdsRouter.delete(
  '/:householdId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { householdId } = req.params

    try {
      await db.households.remove(householdId)
      res.status(200).json('Successfully removed household!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

/*************************************************
 * Households get by
 ************************************************/

householdsRouter.get(
  '/:householdId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { householdId } = req.params
    try {
      const data = await db.households.findById(householdId)
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
 * Households Users CRUD
 ************************************************/

householdsRouter.get(
  '/:householdId/users',
  verifyToken,
  async (req: Request, res: Response) => {
    const { householdId } = req.params

    try {
      const data = await db.households.selectAllUsersOfHousehold(householdId)
      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

householdsRouter.post(
  '/:householdId/users',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { householdId } = req.params
    const { user_id } = req.body

    const existingUser = await db.fpUsers.findById(user_id)

    if (!existingUser) {
      res.statusCode = 404
      res.send('User does not exist!')
      return next()
    }

    try {
      const data = await db.households.addUserToHousehold(householdId, user_id)

      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

householdsRouter.delete(
  '/:householdId/users/:userId',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { householdId, userId } = req.params

    const household = await db.households.findById(householdId)
    const userToRemove = await db.fpUsers.findById(userId)
    const userIsCreatorOfHousehold =
      household?.created_by === userToRemove?.username

    if (userIsCreatorOfHousehold) {
      res.statusCode = 403
      res.send('The creator of the household can not be deleted!')
      return next()
    }

    try {
      await db.households.removeUserFromHousehold(householdId, userId)
      res.status(200).json('Successfully removed user from household!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

export default householdsRouter
