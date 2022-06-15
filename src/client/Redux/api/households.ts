import { FpUser, Household, HouseholdHasUser } from 'model/types'
import { foodplannerApi } from '.'

export const householdsApi = foodplannerApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHouseholdsOfUser: builder.query<Household[], void>({
      query: () => `households`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((household) => ({
                type: 'Household' as const,
                id: household.id,
              })),
              'Household',
            ]
          : ['Household'],
    }),
    postHousehold: builder.mutation<
      Household[],
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
    // TODO: Return new household
    putHousehold: builder.mutation<
      string,
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
    // TODO: Include household name in result msg
    deleteHousehold: builder.mutation<string, string>({
      query: (id) => ({
        url: `households/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Household'],
    }),
    getHouseholdById: builder.query<Household, string>({
      query: (id) => `households/${id}`,
      providesTags: (result, error, arg) =>
        result
          ? [{ type: 'Household', id: result.id }, 'Household']
          : ['Household'],
    }),
    getAllUsersOfHousehold: builder.query<
      Pick<FpUser, 'id' | 'username'>[],
      string
    >({
      query: (id) => `households/${id}/users`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((user) => ({
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
      HouseholdHasUser,
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
    // TODO: Include username and household name in result msg
    deleteUserFromHousehold: builder.mutation<
      string,
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
  overrideExisting: false,
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
