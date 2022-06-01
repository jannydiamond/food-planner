import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setAuthToken } from 'client/utils/localStorage'
import { FpUser, Household, HouseholdHasUser, Unit } from 'model/types'
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

type UserByIdResponse = {
  success: boolean
  data: Pick<FpUser, 'id' | 'username'>
}

type UserByNameResponse = {
  success: boolean
  data: Pick<FpUser, 'id' | 'username'>
}

type AllUsersResponse = {
  success: boolean
  data: Pick<FpUser, 'id' | 'username'>[]
}

type AllHouseholdsOfUserResponse = {
  success: boolean
  data: Household[]
}

type PostHouseholdResponse = {
  success: boolean
  data: Household[]
}

type PutHouseholdResponse = {
  success: boolean
  data: string // TODO: Return new household
}

type DeleteHouseholdResponse = {
  success: boolean
  data: string // TODO: Include household name in msg
}

type HouseholdByIdResponse = {
  success: boolean
  data: Household
}

type AllUsersOfHouseholdResponse = {
  success: boolean
  data: Pick<FpUser, 'id' | 'username'>[]
}

type PostUserToHouseholdResponse = {
  success: boolean
  data: HouseholdHasUser
}

type DeleteUserFromHouseholdResponse = {
  success: boolean
  data: string // TODO: Include username and household name in msg
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
  tagTypes: ['User', 'Household', 'UserOfHousehold'],
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
    getAllUsers: builder.query<AllUsersResponse, void>({
      query: () => `users`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map((user) => ({
                type: 'User' as const,
                id: user.id,
              })),
              'User',
            ]
          : ['User'],
    }),
    getUserById: builder.query<UserByIdResponse, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, arg) =>
        result ? [{ type: 'User', id: result.data.id }, 'User'] : ['User'],
    }),
    getUserByName: builder.query<UserByNameResponse, string>({
      query: (username) => `users/${username}`,
      providesTags: (result, error, arg) =>
        result ? [{ type: 'User', id: result.data.id }, 'User'] : ['User'],
    }),
    getAllHouseholdsOfUser: builder.query<AllHouseholdsOfUserResponse, void>({
      query: () => `households`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map((household) => ({
                type: 'Household' as const,
                id: household.id,
              })),
              'Household',
            ]
          : ['Household'],
    }),
    postHousehold: builder.mutation<
      PostHouseholdResponse,
      {
        household_name: string
      }
    >({
      query: (householdsData) => ({
        url: `households`,
        method: 'POST',
        body: householdsData,
      }),
      invalidatesTags: ['Household'],
    }),
    putHousehold: builder.mutation<
      PutHouseholdResponse,
      {
        id: string
        household_name: string
      }
    >({
      query: (householdsData) => ({
        url: `households/${householdsData.id}`,
        method: 'PUT',
        body: {
          household_name: householdsData.household_name,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Household', id: arg.id },
      ],
    }),
    deleteHousehold: builder.mutation<
      DeleteHouseholdResponse,
      {
        id: string
      }
    >({
      query: (householdsData) => ({
        url: `households`,
        method: 'DELETE',
        body: householdsData,
      }),
      invalidatesTags: ['Household'],
    }),
    getHouseholdById: builder.query<HouseholdByIdResponse, string>({
      query: (id) => `households/${id}`,
      providesTags: (result, error, arg) =>
        result
          ? [{ type: 'Household', id: result.data.id }, 'Household']
          : ['Household'],
    }),
    getAllUsersOfHousehold: builder.query<AllUsersOfHouseholdResponse, string>({
      query: (id) => `households/${id}/users`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map((user) => ({
                type: 'UserOfHousehold' as const,
                id: user.id,
              })),
              'UserOfHousehold',
              { type: 'Household', id: arg },
              'Household',
            ]
          : ['UserOfHousehold'],
    }),
    postUserToHousehold: builder.mutation<
      PostUserToHouseholdResponse,
      {
        user_id: string
        household_id: string
      }
    >({
      query: (data) => ({
        url: `households/${data.household_id}/users`,
        method: 'POST',
        body: {
          user_id: data.user_id,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'UserOfHousehold', id: arg.user_id },
        { type: 'Household', id: arg.household_id },
      ],
    }),
    deleteUserFromHousehold: builder.mutation<
      DeleteUserFromHouseholdResponse,
      {
        user_id: string
        household_id: string
      }
    >({
      query: (data) => ({
        url: `households/${data.household_id}/users`,
        method: 'DELETE',
        body: {
          user_id: data.user_id,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'UserOfHousehold', id: arg.user_id },
        { type: 'Household', id: arg.household_id },
      ],
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
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetUserByNameQuery,
  useGetAllHouseholdsOfUserQuery,
  usePostHouseholdMutation,
  usePutHouseholdMutation,
  useDeleteHouseholdMutation,
  useGetHouseholdByIdQuery,
  useGetAllUsersOfHouseholdQuery,
  usePostUserToHouseholdMutation,
  useDeleteUserFromHouseholdMutation,
  useGetAllUnitsQuery,
  useGetUnitByIdQuery,
} = foodplannerApi
