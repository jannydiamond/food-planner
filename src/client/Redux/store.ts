import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { foodplannerApi } from './api'
import { authorizationResetMiddleware } from './middlewares/authorizationReset'
import AuthenticationSlice, {
  selectors as authenticationSelectors,
} from './slices/authentication'

export const store = configureStore({
  reducer: combineReducers({
    authentication: AuthenticationSlice.reducer,
    // Add the generated reducer as a specific top-level slice
    [foodplannerApi.reducerPath]: foodplannerApi.reducer,
  }),
  devTools: process.env.NODE_ENV !== 'production',
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      foodplannerApi.middleware,
      authorizationResetMiddleware
    ),
})

export const actions = {
  authentication: AuthenticationSlice.actions,
}

export const selectors = {
  authentication: authenticationSelectors,
}

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
