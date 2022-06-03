import { FpUser } from 'model/types'
import { foodplannerApi } from '.'

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

export const usersApi = foodplannerApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
})

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetUserByNameQuery,
} = usersApi
