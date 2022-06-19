import express, { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../auth'
import { db } from '../database'
import { RequestWithUser } from '../types'

const unitsRouter = express.Router()

/*************************************************
 * Units CRUD
 ************************************************/

unitsRouter.get('/', verifyToken, async (_req: Request, res: Response) => {
  try {
    const data = await db.units.selectAll()
    res.status(200).json(data)
  } catch (error: any) {
    res.json({
      success: false,
      error: error.message || error,
    })
  }
})

unitsRouter.post('/', verifyToken, async (req: Request, res: Response) => {
  const { unit_name } = req.body
  const currentUser = (req as RequestWithUser).user.user

  try {
    const data = await db.units.add({
      unit_name,
      created_by: currentUser.username,
    })
    res.status(200).json(data)
  } catch (error: any) {
    res.json({
      success: false,
      error: error.message || error,
    })
  }
})

unitsRouter.put(
  '/:unitId',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { unitId } = req.params
    const unit = req.body
    const currentUser = (req as RequestWithUser).user.user

    const unitToUpdate = await db.units.findById(parseInt(unitId))

    if (!unitToUpdate) {
      res.statusCode = 400
      res.send('Unit does not exist')
      return next()
    }

    if (unitToUpdate.created_by !== currentUser.username) {
      res.statusCode = 403
      res.send('You are not permitted to edit this unit.')
      return next()
    }

    try {
      await db.units.update({
        ...unitToUpdate,
        ...unit,
        updated_by: currentUser.username,
      })
      res.status(200).json('Unit successfully updated!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

unitsRouter.delete(
  '/:unitId',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { unitId } = req.params

    const currentUser = (req as RequestWithUser).user.user

    const unitToDelete = await db.units.findById(parseInt(unitId))

    if (!unitToDelete) {
      res.statusCode = 400
      res.send('Unit does not exist')
      return next()
    }

    if (unitToDelete.created_by !== currentUser.username) {
      res.statusCode = 403
      res.send('You are not permitted to delete this unit.')
      return next()
    }

    try {
      await db.units.remove(parseInt(unitId))
      res.status(200).json('Successfully removed unit!')
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

/*************************************************
 * Units get by
 ************************************************/

unitsRouter.get(
  '/:unitId',
  verifyToken,
  async (req: Request, res: Response) => {
    const { unitId } = req.params

    try {
      const data = await db.units.findById(parseInt(unitId))
      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

unitsRouter.get(
  '/:unitName',
  verifyToken,
  async (req: Request, res: Response) => {
    const { unitName } = req.params

    try {
      const data = await db.units.findByName(unitName)
      res.status(200).json(data)
    } catch (error: any) {
      res.json({
        success: false,
        error: error.message || error,
      })
    }
  }
)

export default unitsRouter
