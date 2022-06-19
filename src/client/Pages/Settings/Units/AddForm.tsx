import { usePostUnitMutation } from 'client/Redux/api/units'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type AddUnitFormData = {
  unit_name: string
}

const AddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUnitFormData>()

  const [addUnit, { isLoading, error }] = usePostUnitMutation()

  const handleAddUnit = useCallback(
    async (data: AddUnitFormData) => {
      const { unit_name } = data

      addUnit({
        unit_name,
      })
    },
    [addUnit]
  )

  return (
    <form onSubmit={handleSubmit(handleAddUnit)}>
      <fieldset>
        <legend>Add unit</legend>
        {error && <p>Something went wrong!</p>}
        <label htmlFor="unit_name">
          <p>Unit name</p>
          <input
            type="text"
            {...register('unit_name', {
              required: 'Unit name is required!',
            })}
          />
        </label>
        {errors.unit_name && <p>{errors.unit_name.message}</p>}

        <input type="submit" />
        {isLoading && <p>Loading...</p>}
      </fieldset>
    </form>
  )
}

export default React.memo(AddForm)
