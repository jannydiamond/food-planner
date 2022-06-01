import express, { NextFunction, Request, Response } from 'express'
import { FpUser } from '../../model/types'
import { verifyToken } from '../auth'
import { db } from '../database'

type RequestWithUser = Request & {
  user: {
    user: FpUser
  }
}

const householdsRouter = express.Router()

/*************************************************
 * Households CRUD
 ************************************************/

householdsRouter.get('/', verifyToken, async (req: Request, res: Response) => {
  const currentUser = (req as RequestWithUser).user.user

  try {
    const data = await db.households.selectAllHouseholdsOfUser(currentUser.id)
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

        res.json({
          success: true,
          data: addedHousehold,
        })
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

      res.json({
        success: true,
        data: 'Household successfully updated!',
      })
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

householdsRouter.delete(
  '/',
  verifyToken,
  async (req: Request, res: Response) => {
    const { id } = req.body

    try {
      await db.households.remove(id)
      res.json({
        success: true,
        data: 'Successfully removed household!',
      })
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

/*************************************************
 * Households Others
 ************************************************/

householdsRouter.get(
  '/:householdId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { householdId } = req.params
    try {
      const data = await db.households.findById(householdId)
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

householdsRouter.delete(
  '/:householdId/users',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { householdId } = req.params
    const { user_id } = req.body

    const household = await db.households.findById(householdId)
    const creator = await db.fpUsers.findById(user_id)
    const userIsCreatorOfHousehold = household?.created_by === creator?.username

    if (userIsCreatorOfHousehold) {
      res.statusCode = 403
      res.send('The creator of the household can not be deleted!')
      return next()
    }

    try {
      await db.households.removeUserFromHousehold(householdId, user_id)
      res.json({
        success: true,
        data: 'Successfully removed user from household!',
      })
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

export default householdsRouter
