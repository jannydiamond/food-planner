import { usePutGroceryMutation } from 'client/Redux/api/groceries'
import { SelectOption } from 'client/types'
import { Grocery, Unit } from 'model/types'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, FieldError, useForm } from 'react-hook-form'
import Select, { OnChangeValue } from 'react-select'
import { useGetAllUnitsQuery } from 'client/Redux/api/units'

type Props = {
  grocery: Grocery
  closeModal: () => void
}

type EditGroceryFormData = {
  grocery_name: string
  base_amount?: string | null
  base_unit?: string | null
  alt_amount?: string | null
  alt_unit?: string | null
}

const EditForm = ({ grocery, closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EditGroceryFormData>()

  const [editGrocery, { isLoading, error }] = usePutGroceryMutation()

  const { data: units, isLoading: isLoadingUnits } = useGetAllUnitsQuery()

  const [unitOptions, setUnitOptions] = useState<[] | SelectOption[]>([])
  const [baseUnitValue, setBaseUnitValue] = useState<null | SelectOption>(null)
  const [altUnitValue, setAltUnitValue] = useState<null | SelectOption>(null)

  const handleEditGrocery = useCallback(
    async (data: EditGroceryFormData) => {
      const { grocery_name, base_amount, alt_amount } = data

      editGrocery({
        ...grocery,
        grocery_name,
        base_amount:
          base_amount && base_amount !== '' ? parseInt(base_amount) : null,
        base_unit: baseUnitValue ? baseUnitValue.value : null,
        alt_amount:
          alt_amount && alt_amount !== '' ? parseInt(alt_amount) : null,
        alt_unit: altUnitValue ? altUnitValue.value : null,
      })

      closeModal()
    },

    [editGrocery, grocery, baseUnitValue, altUnitValue, closeModal]
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
      const options = units.map((unit: Unit) => {
        return {
          value: unit.unit_name,
          label: unit.unit_name,
        }
      })

      setUnitOptions([{ value: null, label: 'No Unit' }, ...options])
    }
  }, [units])

  useEffect(() => {
    if (units && grocery.base_unit) {
      const selectedBaseUnit =
        units.find((unit) => unit.unit_name === grocery.base_unit) ?? null

      selectedBaseUnit &&
        setBaseUnitValue({
          value: selectedBaseUnit.unit_name,
          label: selectedBaseUnit.unit_name,
        })
    }
  }, [grocery.base_unit, units])

  useEffect(() => {
    if (units && grocery.alt_unit) {
      const selectedAltUnit =
        units.find((unit) => unit.unit_name === grocery.alt_unit) ?? null

      selectedAltUnit &&
        setAltUnitValue({
          value: selectedAltUnit.unit_name,
          label: selectedAltUnit.unit_name,
        })
    }
  }, [grocery.alt_unit, units])

  return (
    <form id="editGrocery" onSubmit={handleSubmit(handleEditGrocery)}>
      <fieldset>
        <legend>Edit grocery</legend>
        {error && <p>Something went wrong!</p>}
        <label htmlFor="grocery_name">
          <p>Grocery name</p>
          <input
            type="text"
            defaultValue={grocery.grocery_name}
            {...register('grocery_name', {
              required: 'Grocery name is required!',
            })}
          />
        </label>
        {errors.grocery_name && <p>{errors.grocery_name.message}</p>}

        <label htmlFor="base_amount">
          <p>Base amount</p>
          <input
            type="number"
            defaultValue={grocery.base_amount?.toString()}
            {...register('base_amount')}
          />
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
                defaultValue={baseUnitValue}
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
          <input
            type="number"
            defaultValue={grocery.alt_amount?.toString()}
            {...register('alt_amount')}
          />
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
                defaultValue={altUnitValue}
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

export default React.memo(EditForm)
