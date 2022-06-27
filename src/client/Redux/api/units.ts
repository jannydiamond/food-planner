import { Unit } from 'model/types'
import { foodplannerApi } from '.'

export const unitsApi = foodplannerApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUnits: builder.query<Unit[], void>({
      query: () => `units`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((unit) => ({
                type: 'Unit' as const,
                id: unit.id,
              })),
              'Unit',
            ]
          : ['Unit'],
    }),
    postUnit: builder.mutation<
      Unit[],
      Omit<
        Unit,
        'id' | 'created_at' | 'created_by' | 'updated_by' | 'updated_at'
      >
    >({
      query: (unitData) => ({
        url: `units`,
        method: 'POST',
        body: unitData,
      }),
      invalidatesTags: ['Unit'],
    }),
    // TODO: Return new unit
    putUnit: builder.mutation<string, Unit>({
      query: (unitData) => ({
        url: `units/${unitData.id}`,
        method: 'PUT',
        body: unitData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Unit', id: arg.id },
        'Unit',
      ],
    }),
    // TODO: Include unit name in result msg
    deleteUnit: builder.mutation<string, number>({
      query: (id) => ({
        url: `units/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Unit'],
    }),
    getUnitById: builder.query<Unit, string>({
      query: (id) => `units/${id}`,
      providesTags: (result, error, arg) =>
        result ? [{ type: 'Unit', id: result.id }, 'Unit'] : ['Unit'],
    }),
    getUnitByName: builder.query<Unit, string>({
      query: (name) => `units/${name}`,
      providesTags: (result, error, arg) =>
        result ? [{ type: 'Unit', id: result.id }, 'Unit'] : ['Unit'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllUnitsQuery,
  usePostUnitMutation,
  usePutUnitMutation,
  useDeleteUnitMutation,
  useGetUnitByIdQuery,
} = unitsApi
