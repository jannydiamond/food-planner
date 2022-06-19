import { usePutUnitMutation } from 'client/Redux/api/units'
import { Unit } from 'model/types'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  unit: Unit
  finished: () => void
}

type EditUnitFormData = {
  unit_name: string
}

const EditForm = ({ unit, finished }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUnitFormData>()

  const [editUnit, { isLoading, error }] = usePutUnitMutation()

  const handleEditUnit = useCallback(
    async (data: EditUnitFormData) => {
      const { unit_name } = data
      console.log(unit)
      console.log(unit_name)

      editUnit({
        ...unit,
        unit_name,
      })

      finished()
    },

    [editUnit, unit, finished]
  )

  return (
    <form onSubmit={handleSubmit(handleEditUnit)}>
      <fieldset>
        <legend>Edit unit</legend>
        {error && <p>Something went wrong!</p>}
        <label htmlFor="unit_name">
          <p>Unit name</p>
          <input
            type="text"
            defaultValue={unit.unit_name}
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

export default React.memo(EditForm)
