import { setAuthToken } from 'client/utils/localStorage'
import { FpUser } from 'model/types'
import { foodplannerApi } from '.'

export type Token = string

type PostRegistrationResponse = {
  success: boolean
  data: FpUser
}

type PostLoginResponse = {
  success: boolean
  token: Token
  user: FpUser
}

export const authenticationApi = foodplannerApi.injectEndpoints({
  endpoints: (builder) => ({
    postRegistration: builder.mutation<
      PostRegistrationResponse,
      {
        username: string
        password: string
      }
    >({
      query: (registerData) => ({
        url: `register`,
        method: 'POST',
        body: registerData,
      }),
    }),
    postLogin: builder.mutation<
      PostLoginResponse,
      {
        username: string
        password: string
      }
    >({
      query: (loginData) => ({
        url: `login`,
        method: 'POST',
        body: loginData,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        const { data } = await queryFulfilled

        setAuthToken(data.token)
      },
    }),
  }),
  overrideExisting: false,
})

export const { usePostRegistrationMutation, usePostLoginMutation } =
  authenticationApi
