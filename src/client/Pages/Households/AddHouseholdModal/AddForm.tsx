import { usePostHouseholdMutation } from 'client/Redux/api/households'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type AddHouseholdFormData = {
  household_name: string
}

type Props = {
  closeModal: () => void
}

const AddForm = ({ closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddHouseholdFormData>()

  const [addHousehold, { isLoading, error }] = usePostHouseholdMutation()

  const handleAddHousehold = useCallback(
    async (data: AddHouseholdFormData) => {
      addHousehold(data)
      closeModal()
    },
    [addHousehold, closeModal]
  )

  return (
    <form id="addHousehold" onSubmit={handleSubmit(handleAddHousehold)}>
      <fieldset>
        <legend>Add household</legend>
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
        {isLoading && <p>Loading...</p>}
      </fieldset>
    </form>
  )
}

export default React.memo(AddForm)
