import { createSlice } from '@reduxjs/toolkit'
import { foodplannerApi, Token } from '../api'
import { RootState } from '../store'

type AuthenticationState = {
  token: Token | null
}

const slice = createSlice({
  name: 'authentication',
  initialState: { token: null } as AuthenticationState,
  reducers: {
    reset: () => ({ token: null }),
    setToken: (_state, action) => ({
      token: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      foodplannerApi.endpoints.postLogin.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token
      }
    )
  },
})

export default slice

const selectToken = (state: RootState) => state.authentication.token

export const selectors = {
  selectToken,
}
