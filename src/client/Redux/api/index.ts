import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'client/Redux/store'

export const BASE_URL = `${window.location.origin.toString()}`
export const SERVER_BASE_URL = `${BASE_URL}/api/v1`

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
  tagTypes: [
    'User',
    'Household',
    'UserOfHousehold',
    'Grocery',
    'Unit',
    'Inventory',
    'GroceryInInventory',
  ],
  endpoints: () => ({}),
})
