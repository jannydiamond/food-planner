import { Grocery } from 'model/types'
import { foodplannerApi } from '.'

export const groceriesApi = foodplannerApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroceries: builder.query<Grocery[], void>({
      query: () => `groceries`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((grocery) => ({
                type: 'Grocery' as const,
                id: grocery.id,
              })),
              'Grocery',
            ]
          : ['Grocery'],
    }),
    postGrocery: builder.mutation<
      Grocery[],
      Omit<Grocery, 'id' | 'updated_at'>
    >({
      query: (groceriesData) => ({
        url: `groceries`,
        method: 'POST',
        body: groceriesData,
      }),
      invalidatesTags: ['Grocery'],
    }),
    // TODO: Return new grocery
    putGrocery: builder.mutation<string, Grocery>({
      query: (groceriesData) => ({
        url: `groceries/${groceriesData.id}`,
        method: 'PUT',
        body: groceriesData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Grocery', id: arg.id },
        'Grocery',
      ],
    }),
    // TODO: Include grocery name in result msg
    deleteGrocery: builder.mutation<string, string>({
      query: (id) => ({
        url: `groceries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Grocery'],
    }),
    getGroceryById: builder.query<Grocery, string>({
      query: (id) => `groceries/${id}`,
      providesTags: (result, error, arg) =>
        result ? [{ type: 'Grocery', id: result.id }, 'Grocery'] : ['Grocery'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetGroceriesQuery,
  usePostGroceryMutation,
  usePutGroceryMutation,
  useDeleteGroceryMutation,
  useGetGroceryByIdQuery,
} = groceriesApi
