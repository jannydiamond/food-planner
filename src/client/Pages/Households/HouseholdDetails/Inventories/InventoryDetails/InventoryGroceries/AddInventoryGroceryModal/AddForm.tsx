import { usePostGroceryToInventoryMutation } from 'client/Redux/api/inventories'
import { useGetGroceriesQuery } from 'client/Redux/api/groceries'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, FieldError, useForm } from 'react-hook-form'
import { SelectOption } from 'client/types'
import { Grocery, Unit } from 'model/types'
import Select, { OnChangeValue } from 'react-select'
import { useGetAllUnitsQuery } from 'client/Redux/api/units'

type AddGroceryFormData = {
  grocery_id: string | null
  amount?: string | null
  unit?: string | null
}

type Props = {
  householdId: string
  id: string
  closeModal: () => void
}

const AddForm = ({ householdId, id, closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddGroceryFormData>()

  const [groceryOptions, setGroceryOptions] = useState<[] | SelectOption[]>([])
  const [groceryValue, setGroceryValue] = useState<null | SelectOption>(null)

  const [unitOptions, setUnitOptions] = useState<[] | SelectOption[]>([])
  const [unitValue, setUnitValue] = useState<null | SelectOption>(null)

  const { data: groceries, isLoading: isLoadingGroceries } =
    useGetGroceriesQuery(undefined)

  const { data: units, isLoading: isLoadingUnits } = useGetAllUnitsQuery()

  const [addGrocery, { isLoading, error }] = usePostGroceryToInventoryMutation()

  const handleAddGrocery = useCallback(
    async (data: AddGroceryFormData) => {
      if (!groceryValue?.value) return

      const groceryToAdd =
        groceries &&
        groceries.find((grocery: Grocery) => grocery.id === groceryValue.value)

      if (!groceryToAdd) return

      addGrocery({
        household_id: householdId,
        item: {
          grocery_id: groceryValue.value,
          inventory_id: id,
          amount: data.amount ? parseInt(data.amount) : null,
          unit: unitValue?.value ?? null,
        },
      })

      closeModal()
    },
    [
      groceryValue?.value,
      groceries,
      addGrocery,
      householdId,
      id,
      unitValue?.value,
      closeModal,
    ]
  )

  const handleGroceryChange = (
    newValue: OnChangeValue<SelectOption, false>
  ) => {
    if (newValue) {
      setGroceryValue(newValue)
    }
  }

  const handleUnitChange = (newValue: OnChangeValue<SelectOption, false>) => {
    if (newValue) {
      setUnitValue(newValue)
    }
  }

  useEffect(() => {
    if (groceries) {
      const options: SelectOption[] = groceries.map((grocery: Grocery) => {
        return {
          value: grocery.id,
          label: grocery.grocery_name,
        }
      })

      setGroceryOptions([{ value: null, label: 'No Grocery' }, ...options])
    }
  }, [groceries])

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

  return (
    <form id="addInventoryGrocery" onSubmit={handleSubmit(handleAddGrocery)}>
      <fieldset>
        <legend>Add grocery</legend>
        {error && <p>Something went wrong!</p>}
        <label htmlFor="grocery_id">
          <p>Grocery</p>
          <Controller
            name="grocery_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="grocery_id"
                isSearchable
                options={groceryOptions}
                value={groceryValue}
                defaultValue={null}
                isDisabled={isLoadingGroceries}
                isLoading={isLoadingGroceries}
                onChange={handleGroceryChange}
                {...(errors.grocery_id && { error: true })}
              />
            )}
          />
        </label>
        {errors.grocery_id && (
          <p>{(errors.grocery_id as FieldError).message}</p>
        )}
        <label htmlFor="amount">
          <p>Amount</p>
          <input type="number" {...register('amount')} />
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
                defaultValue={null}
                isDisabled={isLoadingUnits}
                isLoading={isLoadingUnits}
                onChange={handleUnitChange}
                {...(errors.unit && { error: true })}
              />
            )}
          />
        </label>
        {errors.unit && <p>{(errors.unit as FieldError).message}</p>}
        TODO: add best before date picker
        {isLoading && <p>Loading...</p>}
      </fieldset>
    </form>
  )
}

export default React.memo(AddForm)
