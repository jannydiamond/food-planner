import { usePutGroceryToInventoryMutation } from 'client/Redux/api/inventories'
import { useGetAllUnitsQuery } from 'client/Redux/api/units'
import { SelectOption } from 'client/types'
import { InventoryHasGrocery, Unit } from 'model/types'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, FieldError, useForm } from 'react-hook-form'
import Select, { OnChangeValue } from 'react-select'

type Props = {
  householdId: string
  inventoryGrocery: InventoryHasGrocery
  closeModal: () => void
}

type EditGroceryFormData = {
  amount?: string | null
  unit?: string | null
}

const EditForm = ({ householdId, inventoryGrocery, closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EditGroceryFormData>()

  const [unitOptions, setUnitOptions] = useState<[] | SelectOption[]>([])
  const [unitValue, setUnitValue] = useState<null | SelectOption>(null)

  const { data: units, isLoading: isLoadingUnits } = useGetAllUnitsQuery()

  const [editGrocery, { isLoading, error }] = usePutGroceryToInventoryMutation()

  const handleEditGrocery = useCallback(
    async (data: EditGroceryFormData) => {
      editGrocery({
        household_id: householdId,
        item: {
          ...inventoryGrocery,
          amount: data.amount ? parseInt(data.amount) : null,
          unit: unitValue?.value ?? null,
        },
      })

      closeModal()
    },

    [editGrocery, householdId, inventoryGrocery, unitValue?.value, closeModal]
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
    if (units && inventoryGrocery.unit) {
      const selectedBaseUnit =
        units.find((unit) => unit.unit_name === inventoryGrocery.unit) ?? null

      selectedBaseUnit &&
        setUnitValue({
          value: selectedBaseUnit.unit_name,
          label: selectedBaseUnit.unit_name,
        })
    }
  }, [inventoryGrocery.unit, units])

  return (
    <form onSubmit={handleSubmit(handleEditGrocery)}>
      <fieldset>
        <legend>Edit unit</legend>
        {error && <p>Something went wrong!</p>}
        <label htmlFor="amount">
          <p>Amount</p>
          <input
            type="number"
            defaultValue={inventoryGrocery.amount?.toString()}
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
        {isLoading && <p>Loading...</p>}
      </fieldset>
    </form>
  )
}

export default React.memo(EditForm)
