import { Unit } from 'model/types'
import { foodplannerApi } from '.'

type AllUnitsResponse = {
  success: boolean
  data: Unit[]
}

type UnitByIdResponse = {
  success: boolean
  data: Unit
}

export const unitsApi = foodplannerApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUnits: builder.query<AllUnitsResponse, void>({
      query: () => `units`,
    }),
    getUnitById: builder.query<UnitByIdResponse, string>({
      query: (id) => `units/${id}`,
    }),
  }),
})

export const { useGetAllUnitsQuery, useGetUnitByIdQuery } = unitsApi
