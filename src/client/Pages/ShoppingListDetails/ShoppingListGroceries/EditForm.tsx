import { usePutGroceryToShoppingListMutation } from 'client/Redux/api/shoppingLists'
import { useGetAllUnitsQuery } from 'client/Redux/api/units'
import { SelectOption } from 'client/types'
import { ShoppingListHasGrocery, Unit } from 'model/types'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, FieldError, useForm } from 'react-hook-form'
import Select, { OnChangeValue } from 'react-select'

type Props = {
  householdId: string
  grocery: ShoppingListHasGrocery
  finished: () => void
}

type EditGroceryFormData = {
  amount?: string | null
  unit?: string | null
  in_basket: boolean
}

const EditForm = ({ householdId, grocery, finished }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EditGroceryFormData>()

  const [unitOptions, setUnitOptions] = useState<[] | SelectOption[]>([])
  const [unitValue, setUnitValue] = useState<null | SelectOption>(null)

  const { data: units, isLoading: isLoadingUnits } = useGetAllUnitsQuery()

  const [editGrocery, { isLoading, error }] =
    usePutGroceryToShoppingListMutation()

  const handleEditGrocery = useCallback(
    async (data: EditGroceryFormData) => {
      editGrocery({
        household_id: householdId,
        item: {
          ...grocery,
          amount: data.amount ? parseInt(data.amount) : null,
          unit: unitValue?.value ?? null,
          in_basket: false, // TODO
        },
      })

      finished()
    },

    [editGrocery, householdId, grocery, unitValue?.value, finished]
  )

  const handleUnitChange = (newValue: OnChangeValue<SelectOption, false>) => {
    if (newValue) {
      setUnitValue(newValue)
    }
  }

  useEffect(() => {
    if (units) {
      const options: SelectOption[] = units.map((unit: Unit) => {
        return {
          value: unit.unit_name,
          label: unit.unit_name,
        }
      })

      setUnitOptions([{ value: null, label: 'No Unit' }, ...options])
    }
  }, [units])

  useEffect(() => {
    if (units && grocery.unit) {
      const selectedBaseUnit =
        units.find((unit) => unit.unit_name === grocery.unit) ?? null

      selectedBaseUnit &&
        setUnitValue({
          value: selectedBaseUnit.unit_name,
          label: selectedBaseUnit.unit_name,
        })
    }
  }, [grocery.unit, units])

  return (
    <form onSubmit={handleSubmit(handleEditGrocery)}>
      <fieldset>
        <legend>Edit unit</legend>
        {error && <p>Something went wrong!</p>}
        <label htmlFor="amount">
          <p>Amount</p>
          <input
            type="number"
            defaultValue={grocery.amount?.toString()}
            {...register('amount')}
          />
        </label>
        {errors.amount && <p>{errors.amount.message}</p>}
        TODO: if amount is set, unit is required and vice versa
        <label htmlFor="unit">
          <p>Unit</p>
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="unit"
                isSearchable
                options={unitOptions}
                value={unitValue}
                defaultValue={unitValue}
                isDisabled={isLoadingUnits}
                isLoading={isLoadingUnits}
                onChange={handleUnitChange}
                {...(errors.unit && { error: true })}
              />
            )}
          />
        </label>
        {errors.unit && <p>{(errors.unit as FieldError).message}</p>}
        <input type="submit" />
        {isLoading && <p>Loading...</p>}
      </fieldset>
    </form>
  )
}

export default React.memo(EditForm)
