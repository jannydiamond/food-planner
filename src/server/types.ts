import { Request } from 'express'
import { FpUser } from '../model/types'

export type RequestWithUser = Request & {
  user: {
    user: FpUser
  }
}
