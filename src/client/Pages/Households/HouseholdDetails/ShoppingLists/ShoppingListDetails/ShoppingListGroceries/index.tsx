import { useGetGroceriesQuery } from 'client/Redux/api/groceries'
import {
  useDeleteGroceryFromShoppingListMutation,
  useGetGroceriesOfShoppingListQuery,
  useGetShoppingListByIdQuery,
} from 'client/Redux/api/shoppingLists'
import { Grocery, ShoppingListHasGrocery } from 'model/types'
import React, { useCallback, useState } from 'react'
import AddForm from './AddForm'
import EditForm from './EditForm'

type Props = {
  householdId: string
  shoppingListId: string
}

const ShoppingListGroceries = ({ householdId, shoppingListId }: Props) => {
  const [groceryToEdit, setGroceryToEdit] =
    useState<null | ShoppingListHasGrocery>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { data: shoppingList, isLoading } = useGetShoppingListByIdQuery({
    id: shoppingListId,
    household_id: householdId,
  })

  const { data: groceries, isLoading: isLoadingGroceries } =
    useGetGroceriesQuery(undefined)

  const { data: shoppingListGroceries } = useGetGroceriesOfShoppingListQuery({
    id: shoppingListId,
    household_id: householdId,
  })

  const toggleEditGrocery = (grocery: ShoppingListHasGrocery) => {
    setIsEditing(!isEditing)
    setGroceryToEdit(grocery)
  }

  const [removeGroceryFromShoppingList] =
    useDeleteGroceryFromShoppingListMutation()

  const handleDeleteGrocery = useCallback(
    async (grocery_id: string) => {
      removeGroceryFromShoppingList({
        grocery_id,
        shopping_list_id: shoppingListId,
        household_id: householdId,
      })
    },
    [householdId, shoppingListId, removeGroceryFromShoppingList]
  )

  if (!shoppingList) return null

  return (
    <>
      {isLoading || isLoadingGroceries ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Groceries</h2>
          <AddForm householdId={householdId} id={shoppingListId} />
          {shoppingListGroceries ? (
            <ul>
              {shoppingListGroceries.map((grocery) => {
                return (
                  <li key={grocery.grocery_id}>
                    {
                      groceries?.find(
                        (g: Grocery) => g.id === grocery.grocery_id
                      )?.grocery_name
                    }
                    {grocery.amount &&
                      grocery.unit &&
                      `: ${grocery.amount} ${grocery.unit}`}
                    <button onClick={() => toggleEditGrocery(grocery)}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGrocery(grocery.grocery_id)}
                    >
                      Delete
                    </button>
                    {isEditing &&
                      groceryToEdit &&
                      groceryToEdit.grocery_id === grocery.grocery_id && (
                        <EditForm
                          householdId={householdId}
                          grocery={grocery}
                          finished={() => setIsEditing(false)}
                        />
                      )}
                  </li>
                )
              })}
            </ul>
          ) : (
            '-'
          )}
        </>
      )}
    </>
  )
}

export default React.memo(ShoppingListGroceries)
