import {
  useDeleteShoppingListMutation,
  useGetShoppingListByIdQuery,
} from 'client/Redux/api/shoppingLists'
import React, { useCallback, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EditForm from './EditForm'
import ShoppingListGroceries from './ShoppingListGroceries'

const ShoppingListDetails = () => {
  const { householdId } = useParams() as { householdId: string }
  const { shoppingListId } = useParams() as { shoppingListId: string }
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { data: shoppingList, isLoading } = useGetShoppingListByIdQuery({
    id: shoppingListId,
    household_id: householdId,
  })

  const toggleEditShoppingList = () => setIsEditing(!isEditing)

  const [
    deleteShoppingList,
    { isLoading: isLoadingDeleteShoppingList, error: errorDeleteShoppingList },
  ] = useDeleteShoppingListMutation()

  const handleDeleteShoppingList = useCallback(async () => {
    deleteShoppingList({
      id: shoppingListId,
      household_id: householdId,
    })
    navigate(`/households/${householdId}/shoppingLists`, { replace: true })
  }, [deleteShoppingList, householdId, shoppingListId, navigate])

  if (!shoppingList) return null

  const { shopping_list_name, created_by } = shoppingList

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Shopping list: {shopping_list_name}</h1>
          <Link to={`/households/${householdId}/shopping-lists`}>Zurück</Link>

          <p>Created by: {created_by}</p>
          <p>
            <button onClick={toggleEditShoppingList}>Edit</button>
            <button onClick={handleDeleteShoppingList}>Delete</button>
          </p>
          {isEditing && (
            <EditForm
              householdId={householdId}
              shoppingList={shoppingList}
              finished={() => setIsEditing(false)}
            />
          )}

          <p>
            {errorDeleteShoppingList && <p>Something went wrong!</p>}
            {isLoadingDeleteShoppingList && <p>Loading...</p>}
          </p>
          <ShoppingListGroceries
            householdId={householdId}
            shoppingListId={shoppingListId}
          />
        </>
      )}
    </>
  )
}

export default React.memo(ShoppingListDetails)
