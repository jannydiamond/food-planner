import { FpUser, Household, HouseholdHasUser } from 'model/types'
import { foodplannerApi } from '.'

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

export const householdsApi = foodplannerApi.injectEndpoints({
  endpoints: (builder) => ({
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
        'Household',
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
  }),
})

export const {
  useGetAllHouseholdsOfUserQuery,
  usePostHouseholdMutation,
  usePutHouseholdMutation,
  useDeleteHouseholdMutation,
  useGetHouseholdByIdQuery,
  useGetAllUsersOfHouseholdQuery,
  usePostUserToHouseholdMutation,
  useDeleteUserFromHouseholdMutation,
} = householdsApi
