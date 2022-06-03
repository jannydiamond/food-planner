import { createSlice } from '@reduxjs/toolkit'
import { authenticationApi, Token } from 'client/Redux/api/authentication'
import { RootState } from 'client/Redux/store'

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
      authenticationApi.endpoints.postLogin.matchFulfilled,
      (state, { payload }) => {
        state.token = payload
      }
    )
  },
})

export default slice

const selectToken = (state: RootState) => state.authentication.token

export const selectors = {
  selectToken,
}
