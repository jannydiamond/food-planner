import { usePostGroceryMutation } from 'client/Redux/api/groceries'
import { useGetAllUnitsQuery } from 'client/Redux/api/units'
import { Grocery, Unit } from 'model/types'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, FieldError, useForm } from 'react-hook-form'
import Select, { OnChangeValue } from 'react-select'
import { SelectOption } from 'client/types'

type AddGroceryFormData = {
  grocery_name: string
  base_amount?: string | null
  base_unit?: string | null
  alt_amount?: string | null
  alt_unit?: string | null
}

type Props = {
  closeModal: () => void
}

const AddForm = ({ closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddGroceryFormData>()

  const [unitOptions, setUnitOptions] = useState<[] | SelectOption[]>([])
  const [baseUnitValue, setBaseUnitValue] = useState<null | SelectOption>(null)
  const [altUnitValue, setAltUnitValue] = useState<null | SelectOption>(null)

  const [addGrocery, { isLoading, error }] = usePostGroceryMutation()

  const { data: units, isLoading: isLoadingUnits } = useGetAllUnitsQuery()

  const handleAddGrocery = useCallback(
    async (data: AddGroceryFormData) => {
      const { grocery_name, base_amount, alt_amount } = data
      const newGrocery: Omit<Grocery, 'id' | 'created_by' | 'updated_at'> = {
        grocery_name,
        base_amount:
          base_amount && base_amount !== '' ? parseInt(base_amount) : null,
        base_unit: baseUnitValue ? baseUnitValue.value : null,
        alt_amount:
          alt_amount && alt_amount !== '' ? parseInt(alt_amount) : null,
        alt_unit: altUnitValue ? altUnitValue.value : null,
      }

      addGrocery(newGrocery)
      closeModal()
    },
    [addGrocery, altUnitValue, baseUnitValue, closeModal]
  )

  const handleBaseUnitChange = (
    newValue: OnChangeValue<SelectOption, false>
  ) => {
    if (newValue) {
      setBaseUnitValue(newValue)
    }
  }

  const handleAltUnitChange = (
    newValue: OnChangeValue<SelectOption, false>
  ) => {
    if (newValue) {
      setAltUnitValue(newValue)
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

  return (
    <form id="addGrocery" onSubmit={handleSubmit(handleAddGrocery)}>
      <fieldset>
        <legend>Add grocery</legend>
        {error && <p>Something went wrong!</p>}
        <label htmlFor="grocery_name">
          <p>Grocery name</p>
          <input
            type="text"
            {...register('grocery_name', {
              required: 'Grocery name is required!',
            })}
          />
        </label>
        {errors.grocery_name && <p>{errors.grocery_name.message}</p>}

        <label htmlFor="base_amount">
          <p>Base amount</p>
          <input type="number" {...register('base_amount')} />
        </label>
        {errors.base_amount && <p>{errors.base_amount.message}</p>}

        <label htmlFor="base_unit">
          <p>Base unit</p>
          <Controller
            name="base_unit"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="base_unit"
                isSearchable
                options={unitOptions}
                value={baseUnitValue}
                defaultValue={null}
                isDisabled={isLoadingUnits}
                isLoading={isLoadingUnits}
                onChange={handleBaseUnitChange}
                {...(errors.base_unit && { error: true })}
              />
            )}
          />
        </label>
        {errors.base_unit && <p>{(errors.base_unit as FieldError).message}</p>}

        <label htmlFor="alt_amount">
          <p>Alternative amount</p>
          <input type="number" {...register('alt_amount')} />
        </label>
        {errors.alt_amount && <p>{errors.alt_amount.message}</p>}

        <label htmlFor="alt_unit">
          <p>Alternative unit</p>
          <Controller
            name="alt_unit"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="alt_unit"
                isSearchable
                options={unitOptions}
                value={altUnitValue}
                defaultValue={null}
                isDisabled={isLoadingUnits}
                isLoading={isLoadingUnits}
                onChange={handleAltUnitChange}
                {...(errors.alt_unit && { error: true })}
              />
            )}
          />
        </label>
        {errors.alt_unit && <p>{(errors.alt_unit as FieldError).message}</p>}
        {isLoading && <p>Loading...</p>}
      </fieldset>
    </form>
  )
}

export default React.memo(AddForm)
