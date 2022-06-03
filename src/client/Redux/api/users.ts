import { FpUser } from 'model/types'
import { foodplannerApi } from '.'

export const usersApi = foodplannerApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<Pick<FpUser, 'id' | 'username'>[], void>({
      query: () => `users`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((user) => ({
                type: 'User' as const,
                id: user.id,
              })),
              'User',
            ]
          : ['User'],
    }),
    getUserById: builder.query<Pick<FpUser, 'id' | 'username'>, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, arg) =>
        result ? [{ type: 'User', id: result.id }, 'User'] : ['User'],
    }),
    getUserByName: builder.query<Pick<FpUser, 'id' | 'username'>, string>({
      query: (username) => `users/${username}`,
      providesTags: (result, error, arg) =>
        result ? [{ type: 'User', id: result.id }, 'User'] : ['User'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetUserByNameQuery,
} = usersApi
