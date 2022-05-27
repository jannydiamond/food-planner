import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit'
import AuthenticationSlice from 'client/Redux/slices/authentication'

export const authorizationResetMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action) && action.payload.originalStatus === 401) {
      api.dispatch(AuthenticationSlice.actions.reset())
    }

    return next(action)
  }
