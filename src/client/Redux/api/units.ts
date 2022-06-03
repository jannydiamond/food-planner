import { Unit } from 'model/types'
import { foodplannerApi } from '.'

export const unitsApi = foodplannerApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUnits: builder.query<Unit[], void>({
      query: () => `units`,
    }),
    getUnitById: builder.query<Unit, string>({
      query: (id) => `units/${id}`,
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllUnitsQuery, useGetUnitByIdQuery } = unitsApi
