import { ShoppingList, ShoppingListHasGrocery } from 'model/types'
import { foodplannerApi } from '.'

export const shoppingListsApi = foodplannerApi.injectEndpoints({
  endpoints: (builder) => ({
    getShoppingLists: builder.query<ShoppingList[], string>({
      query: (householdId) => `households/${householdId}/shopping-lists`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((shoppingList) => ({
                type: 'ShoppingList' as const,
                id: shoppingList.id,
              })),
              'ShoppingList',
            ]
          : ['ShoppingList'],
    }),
    postShoppingList: builder.mutation<
      ShoppingList[],
      {
        household_id: string
        shopping_list_name: string
      }
    >({
      query: (shoppingListsData) => ({
        url: `households/${shoppingListsData.household_id}/shopping-lists`,
        method: 'POST',
        body: {
          shopping_list_name: shoppingListsData.shopping_list_name,
        },
      }),
      invalidatesTags: ['ShoppingList'],
    }),
    // TODO: Return new shopping list
    putShoppingList: builder.mutation<
      string,
      {
        id: string
        household_id: string
        shopping_list_name: string
      }
    >({
      query: (shoppingListsData) => ({
        url: `households/${shoppingListsData.household_id}/shopping-lists/${shoppingListsData.id}`,
        method: 'PUT',
        body: {
          shopping_list_name: shoppingListsData.shopping_list_name,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'ShoppingList', id: arg.id },
        'ShoppingList',
      ],
    }),
    // TODO: Include shopping list name in result msg
    deleteShoppingList: builder.mutation<
      string,
      {
        id: string
        household_id: string
      }
    >({
      query: (shoppingListsData) => ({
        url: `households/${shoppingListsData.household_id}/shopping-lists/${shoppingListsData.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ShoppingList'],
    }),
    getShoppingListById: builder.query<
      ShoppingList,
      {
        id: string
        household_id: string
      }
    >({
      query: (shoppingListsData) =>
        `households/${shoppingListsData.household_id}/shopping-lists/${shoppingListsData.id}`,
      providesTags: (result, error, arg) =>
        result
          ? [{ type: 'ShoppingList', id: result.id }, 'ShoppingList']
          : ['ShoppingList'],
    }),
    getGroceriesOfShoppingList: builder.query<
      ShoppingListHasGrocery[],
      {
        id: string
        household_id: string
      }
    >({
      query: (shoppingListsData) =>
        `households/${shoppingListsData.household_id}/shopping-lists/${shoppingListsData.id}/groceries`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((groceryInShoppingList) => ({
                type: 'GroceryInShoppingList' as const,
                id: groceryInShoppingList.grocery_id,
              })),
              'GroceryInShoppingList',
              { type: 'ShoppingList', id: arg.id },
              'ShoppingList',
            ]
          : ['GroceryInShoppingList'],
    }),
    postGroceryToShoppingList: builder.mutation<
      ShoppingListHasGrocery,
      {
        item: Omit<ShoppingListHasGrocery, 'updated_at' | 'in_basket'>
        household_id: string
      }
    >({
      query: (data) => ({
        url: `households/${data.household_id}/shopping-lists/${data.item.shopping_list_id}/groceries`,
        method: 'POST',
        body: data.item,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'GroceryInShoppingList', id: arg.item.grocery_id },
        { type: 'ShoppingList', id: arg.item.shopping_list_id },
      ],
    }),
    putGroceryToShoppingList: builder.mutation<
      string,
      {
        item: ShoppingListHasGrocery
        household_id: string
      }
    >({
      query: (data) => ({
        url: `households/${data.household_id}/shopping-lists/${data.item.shopping_list_id}/groceries/${data.item.grocery_id}`,
        method: 'PUT',
        body: data.item,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'GroceryInShoppingList', id: arg.item.grocery_id },
        'GroceryInShoppingList',
        { type: 'ShoppingList', id: arg.item.shopping_list_id },
        'ShoppingList',
      ],
    }),
    deleteGroceryFromShoppingList: builder.mutation<
      string,
      {
        grocery_id: string
        shopping_list_id: string
        household_id: string
      }
    >({
      query: (data) => ({
        url: `households/${data.household_id}/shopping-lists/${data.shopping_list_id}/groceries/${data.grocery_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'GroceryInShoppingList', id: arg.grocery_id },
        { type: 'ShoppingList', id: arg.shopping_list_id },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetShoppingListsQuery,
  usePostShoppingListMutation,
  usePutShoppingListMutation,
  useDeleteShoppingListMutation,
  useGetShoppingListByIdQuery,
  useGetGroceriesOfShoppingListQuery,
  usePostGroceryToShoppingListMutation,
  usePutGroceryToShoppingListMutation,
  useDeleteGroceryFromShoppingListMutation,
} = shoppingListsApi
