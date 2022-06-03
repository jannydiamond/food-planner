import { setAuthToken } from 'client/utils/localStorage'
import { FpUser } from 'model/types'
import { foodplannerApi } from '.'

export type Token = string

export const authenticationApi = foodplannerApi.injectEndpoints({
  endpoints: (builder) => ({
    postRegistration: builder.mutation<
      FpUser,
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
      Token,
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

        setAuthToken(data)
      },
    }),
  }),
  overrideExisting: false,
})

export const { usePostRegistrationMutation, usePostLoginMutation } =
  authenticationApi
