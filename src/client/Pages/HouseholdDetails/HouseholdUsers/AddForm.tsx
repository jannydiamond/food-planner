import { usePostUserToHouseholdMutation } from 'client/Redux/api/households'
import { useGetAllUsersQuery } from 'client/Redux/api/users'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type AddUserFormData = {
  username: string
}

type Props = {
  id: string
}

const AddForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserFormData>()

  const { data: users } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const [addUser, { isLoading, error }] = usePostUserToHouseholdMutation()

  const handleAddUser = useCallback(
    async (data: AddUserFormData) => {
      const userToAdd = users?.data.find(
        (user) => user.username === data.username
      )

      if (!userToAdd) return

      addUser({
        user_id: userToAdd.id,
        household_id: props.id,
      })
    },
    [addUser, props.id, users?.data]
  )

  return (
    <form onSubmit={handleSubmit(handleAddUser)}>
      <fieldset>
        <legend>Add user</legend>
        {error && <p>Something went wrong!</p>}
        <label htmlFor="username">
          <p>Username</p>
          <input
            type="text"
            {...register('username', {
              required: 'Username is required!',
            })}
          />
        </label>
        {errors.username && <p>{errors.username.message}</p>}
        <input type="submit" />
        {isLoading && <p>Loading...</p>}
      </fieldset>
    </form>
  )
}

export default React.memo(AddForm)
