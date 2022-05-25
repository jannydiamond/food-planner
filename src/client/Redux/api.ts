import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Unit } from 'model/types'

const serverHostname = process.env.HOST ? process.env.HOST : '0.0.0.0'
const serverPort = process.env.PORT ? parseInt(process.env.PORT) : 8080

export const SERVER_BASE_URL = `http://${serverHostname}:${serverPort}/api/v1/`

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
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_BASE_URL }),
  endpoints: (builder) => ({
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
export const { useGetAllUnitsQuery, useGetUnitByIdQuery } = foodplannerApi
