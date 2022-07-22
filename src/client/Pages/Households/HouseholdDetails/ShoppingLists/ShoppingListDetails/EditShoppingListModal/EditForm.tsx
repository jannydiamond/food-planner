import { usePutShoppingListMutation } from 'client/Redux/api/shoppingLists'
import { ShoppingList } from 'model/types'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  householdId: string
  shoppingList: ShoppingList
  closeModal: () => void
}

type EditShoppingListFormData = {
  shopping_list_name: string
}

const EditForm = ({ householdId, shoppingList, closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditShoppingListFormData>()

  const [editShoppingList, { isLoading, error }] = usePutShoppingListMutation()

  const handleEditShoppingList = useCallback(
    async (data: EditShoppingListFormData) => {
      editShoppingList({
        id: shoppingList.id,
        shopping_list_name: data.shopping_list_name,
        household_id: householdId,
      })

      closeModal()
    },

    [editShoppingList, shoppingList.id, householdId, closeModal]
  )

  return (
    <form id="editShoppingList" onSubmit={handleSubmit(handleEditShoppingList)}>
      <fieldset>
        <legend>Edit shopping list</legend>
        {error && <p>Something went wrong!</p>}
        <label htmlFor="shopping_list_name">
          <p>Shopping list name</p>
          <input
            type="text"
            defaultValue={shoppingList.shopping_list_name}
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

export default React.memo(EditForm)
