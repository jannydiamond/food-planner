import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setAuthToken } from 'client/utils/localStorage'
import { FpUser, Unit } from 'model/types'
import { RootState } from './store'

export const BASE_URL = `${window.location.origin.toString()}`
export const SERVER_BASE_URL = `${BASE_URL}/api/v1`

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

type AllUnitsResponse = {
  success: boolean
  data: Unit[]
}

type UnitByIdResponse = {
  success: boolean
  data: Unit
}

// Define a service using a base URL and expected endpoints
export const foodplannerApi = createApi({
  reducerPath: 'foodplannerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).authentication.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
    credentials: 'include',
  }),
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
    getAllUnits: builder.query<AllUnitsResponse, void>({
      query: () => `units`,
    }),
    getUnitById: builder.query<UnitByIdResponse, string>({
      query: (id) => `units/${id}`,
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  usePostRegistrationMutation,
  usePostLoginMutation,
  useGetAllUnitsQuery,
  useGetUnitByIdQuery,
} = foodplannerApi
