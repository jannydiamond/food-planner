import { useModal } from 'client/hooks/useModal'
import { useGetGroceriesQuery } from 'client/Redux/api/groceries'
import {
  useGetGroceriesOfShoppingListQuery,
  usePutGroceryToShoppingListMutation,
} from 'client/Redux/api/shoppingLists'
import { Grocery, ShoppingList, ShoppingListHasGrocery } from 'model/types'
import React, { ChangeEvent, useCallback, useState } from 'react'
import AddShoppingListGroceryModal from './AddShoppingListGroceryModal'
import DeleteShoppingListGroceryModal from './DeleteShoppingListGroceryModal'
import EditShoppingListGroceryModal from './EditShoppingListGroceryModal'

type Props = {
  householdId: string
  shoppingList: ShoppingList
}

const ShoppingListGroceries = ({ householdId, shoppingList }: Props) => {
  const addShoppingListGroceryModal = useModal()
  const editShoppingListGroceryModal = useModal()
  const deleteShoppingListGroceryModal = useModal()

  const [groceryToEdit, setGroceryToEdit] =
    useState<null | ShoppingListHasGrocery>(null)
  const [groceryToDelete, setGroceryToDelete] =
    useState<null | ShoppingListHasGrocery>(null)

  const { data: groceries, isLoading: isLoadingGroceries } =
    useGetGroceriesQuery(undefined)

  const { data: shoppingListGroceries } = useGetGroceriesOfShoppingListQuery({
    id: shoppingList.id,
    household_id: householdId,
  })

  const toggleEditGrocery = (grocery: ShoppingListHasGrocery) => {
    setGroceryToEdit(grocery)
    editShoppingListGroceryModal.show()
  }

  const toggleDeleteGrocery = (grocery: ShoppingListHasGrocery) => {
    setGroceryToDelete(grocery)
    deleteShoppingListGroceryModal.show()
  }

  const [editGrocery] = usePutGroceryToShoppingListMutation()

  const handleCheckboxChange = useCallback(
    async (
      event: ChangeEvent<HTMLInputElement>,
      shoppingListGrocery: ShoppingListHasGrocery
    ) => {
      console.log(event.target.checked)
      editGrocery({
        household_id: householdId,
        item: {
          ...shoppingListGrocery,
          in_basket: event.target.checked,
        },
      })
    },
    [editGrocery, householdId]
  )

  if (!shoppingList) return null

  return (
    <>
      {isLoadingGroceries ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Groceries</h3>
          <button onClick={addShoppingListGroceryModal.show}>Add</button>
          <AddShoppingListGroceryModal
            householdId={householdId}
            shoppingListId={shoppingList.id}
            modal={addShoppingListGroceryModal}
          />
          {shoppingListGroceries ? (
            <ul>
              {shoppingListGroceries.map((grocery) => {
                return (
                  <li key={grocery.grocery_id}>
                    <label htmlFor={`addToBasket-${grocery.grocery_id}`}>
                      <input
                        id={`addToBasket-${grocery.grocery_id}`}
                        type="checkbox"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleCheckboxChange(event, grocery)
                        }
                        checked={grocery.in_basket}
                      />
                      {
                        groceries?.find(
                          (g: Grocery) => g.id === grocery.grocery_id
                        )?.grocery_name
                      }
                    </label>
                    {grocery.amount &&
                      grocery.unit &&
                      ` | ${grocery.amount} ${grocery.unit}`}
                    <button onClick={() => toggleEditGrocery(grocery)}>
                      Edit
                    </button>
                    <button onClick={() => toggleDeleteGrocery(grocery)}>
                      Delete
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            '-'
          )}
        </>
      )}

      {groceryToEdit && (
        <EditShoppingListGroceryModal
          householdId={householdId}
          shoppingListGrocery={groceryToEdit}
          modal={editShoppingListGroceryModal}
        />
      )}
      {groceryToDelete && (
        <DeleteShoppingListGroceryModal
          householdId={householdId}
          shoppingListGrocery={groceryToDelete}
          modal={deleteShoppingListGroceryModal}
        />
      )}
    </>
  )
}

export default React.memo(ShoppingListGroceries)
