import { usePutHouseholdMutation } from 'client/Redux/api'
import { Household } from 'model/types'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  household: Household
  finished: () => void
}

type EditHouseholdFormData = {
  household_name: string
}

const EditForm = ({ household, finished }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditHouseholdFormData>()

  const [editHousehold, { isLoading, error }] = usePutHouseholdMutation()

  const handleEditHousehold = useCallback(
    async (data: EditHouseholdFormData) => {
      editHousehold({
        id: household.id,
        household_name: data.household_name,
      })

      finished()
    },

    [editHousehold, household.id, finished]
  )

  return (
    <form onSubmit={handleSubmit(handleEditHousehold)}>
      <fieldset>
        <legend>Edit household</legend>
        {error && <p>Something went wrong!</p>}
        <label htmlFor="household_name">
          <p>Household name</p>
          <input
            type="text"
            {...register('household_name', {
              required: 'Household name is required!',
            })}
          />
        </label>
        {errors.household_name && <p>{errors.household_name.message}</p>}
        <input type="submit" />
        {isLoading && <p>Loading...</p>}
      </fieldset>
    </form>
  )
}

export default React.memo(EditForm)
