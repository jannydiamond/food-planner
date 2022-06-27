import { usePutHouseholdMutation } from 'client/Redux/api/households'
import { Household } from 'model/types'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  household: Household
  closeModal: () => void
}

type EditHouseholdFormData = {
  household_name: string
}

const EditForm = ({ household, closeModal }: Props) => {
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

      closeModal()
    },

    [editHousehold, household.id, closeModal]
  )

  return (
    <form id="editHousehold" onSubmit={handleSubmit(handleEditHousehold)}>
      <fieldset>
        <legend>Edit household</legend>
        {error && <p>Something went wrong!</p>}
        <label htmlFor="household_name">
          <p>Household name</p>
          <input
            type="text"
            defaultValue={household.household_name}
            {...register('household_name', {
              required: 'Household name is required!',
            })}
          />
        </label>
        {errors.household_name && <p>{errors.household_name.message}</p>}
        {isLoading && <p>Loading...</p>}
      </fieldset>
    </form>
  )
}

export default React.memo(EditForm)
