import { usePostShoppingListMutation } from 'client/Redux/api/shoppingLists'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type AddShoppingListFormData = {
  shopping_list_name: string
}

type Props = {
  householdId: string
  closeModal: () => void
}

const AddForm = ({ householdId, closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddShoppingListFormData>()

  const [addShoppingList, { isLoading, error }] = usePostShoppingListMutation()

  const handleAddShoppingList = useCallback(
    async (data: AddShoppingListFormData) => {
      addShoppingList({
        household_id: householdId,
        shopping_list_name: data.shopping_list_name,
      })
      closeModal()
    },
    [addShoppingList, closeModal, householdId]
  )

  return (
    <form id="addShoppingList" onSubmit={handleSubmit(handleAddShoppingList)}>
      <fieldset>
        <legend>Add shopping list</legend>
        {error && <p>Something went wrong!</p>}
        <label htmlFor="shopping_list_name">
          <p>Shopping list name</p>
          <input
            type="text"
            {...register('shopping_list_name', {
              required: 'Shopping list name is required!',
            })}
          />
        </label>
        {errors.shopping_list_name && (
          <p>{errors.shopping_list_name.message}</p>
        )}
        {isLoading && <p>Loading...</p>}
      </fieldset>
    </form>
  )
}

export default React.memo(AddForm)
