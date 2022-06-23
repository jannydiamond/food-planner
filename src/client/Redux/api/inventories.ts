import { Inventory, InventoryHasGrocery } from 'model/types'
import { foodplannerApi } from '.'

export const inventoriesApi = foodplannerApi.injectEndpoints({
  endpoints: (builder) => ({
    getInventories: builder.query<Inventory[], string>({
      query: (householdId) => `households/${householdId}/inventories`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((inventory) => ({
                type: 'Inventory' as const,
                id: inventory.id,
              })),
              'Inventory',
            ]
          : ['Inventory'],
    }),
    postInventory: builder.mutation<
      Inventory[],
      {
        household_id: string
        inventory_name: string
      }
    >({
      query: (inventoriesData) => ({
        url: `households/${inventoriesData.household_id}/inventories`,
        method: 'POST',
        body: {
          inventory_name: inventoriesData.inventory_name,
        },
      }),
      invalidatesTags: ['Inventory'],
    }),
    // TODO: Return new inventory
    putInventory: builder.mutation<
      string,
      {
        id: string
        household_id: string
        inventory_name: string
      }
    >({
      query: (inventoriesData) => ({
        url: `households/${inventoriesData.household_id}/inventories/${inventoriesData.id}`,
        method: 'PUT',
        body: {
          inventory_name: inventoriesData.inventory_name,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Inventory', id: arg.id },
        'Inventory',
      ],
    }),
    // TODO: Include inventory name in result msg
    deleteInventory: builder.mutation<
      string,
      {
        id: string
        household_id: string
      }
    >({
      query: (inventoriesData) => ({
        url: `households/${inventoriesData.household_id}/inventories/${inventoriesData.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Inventory'],
    }),
    getInventoryById: builder.query<
      Inventory,
      {
        id: string
        household_id: string
      }
    >({
      query: (inventoriesData) =>
        `households/${inventoriesData.household_id}/inventories/${inventoriesData.id}`,
      providesTags: (result, error, arg) =>
        result
          ? [{ type: 'Inventory', id: result.id }, 'Inventory']
          : ['Inventory'],
    }),
    getGroceriesOfInventory: builder.query<
      InventoryHasGrocery[],
      {
        id: string
        household_id: string
      }
    >({
      query: (inventoriesData) =>
        `households/${inventoriesData.household_id}/inventories/${inventoriesData.id}/groceries`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((groceryInInventory) => ({
                type: 'GroceryInInventory' as const,
                id: groceryInInventory.grocery_id,
              })),
              'GroceryInInventory',
              { type: 'Inventory', id: arg.id },
              'Inventory',
            ]
          : ['GroceryInInventory'],
    }),
    postGroceryToInventory: builder.mutation<
      InventoryHasGrocery,
      {
        item: Omit<InventoryHasGrocery, 'updated_at'>
        household_id: string
      }
    >({
      query: (data) => ({
        url: `households/${data.household_id}/inventories/${data.item.inventory_id}/groceries`,
        method: 'POST',
        body: data.item,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'GroceryInInventory', id: arg.item.grocery_id },
        { type: 'Inventory', id: arg.item.inventory_id },
      ],
    }),
    putGroceryToInventory: builder.mutation<
      string,
      {
        item: InventoryHasGrocery
        household_id: string
      }
    >({
      query: (data) => ({
        url: `households/${data.household_id}/inventories/${data.item.inventory_id}/groceries/${data.item.grocery_id}`,
        method: 'PUT',
        body: data.item,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'GroceryInInventory', id: arg.item.grocery_id },
        'GroceryInInventory',
        { type: 'Inventory', id: arg.item.inventory_id },
        'Inventory',
      ],
    }),
    deleteGroceryFromInventory: builder.mutation<
      string,
      {
        grocery_id: string
        inventory_id: string
        household_id: string
      }
    >({
      query: (data) => ({
        url: `households/${data.household_id}/inventories/${data.inventory_id}/groceries/${data.grocery_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'GroceryInInventory', id: arg.grocery_id },
        { type: 'Inventory', id: arg.inventory_id },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetInventoriesQuery,
  usePostInventoryMutation,
  usePutInventoryMutation,
  useDeleteInventoryMutation,
  useGetInventoryByIdQuery,
  useGetGroceriesOfInventoryQuery,
  usePostGroceryToInventoryMutation,
  usePutGroceryToInventoryMutation,
  useDeleteGroceryFromInventoryMutation,
} = inventoriesApi
