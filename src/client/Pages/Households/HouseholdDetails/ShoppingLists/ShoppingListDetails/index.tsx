import { useModal } from 'client/hooks/useModal'
import { useGetShoppingListByIdQuery } from 'client/Redux/api/shoppingLists'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DeleteShoppingListModal from './DeleteShoppingListModal'
import EditShoppingListModal from './EditShoppingListModal'
import ShoppingListGroceries from './ShoppingListGroceries'

const ShoppingListDetails = () => {
  const { householdId } = useParams() as { householdId: string }
  const { shoppingListId } = useParams() as { shoppingListId: string }

  const editShoppingListModal = useModal()
  const deleteShoppingListModal = useModal()

  const { data: shoppingList, isLoading } = useGetShoppingListByIdQuery({
    id: shoppingListId,
    household_id: householdId,
  })

  if (!shoppingList) return null

  const { shopping_list_name, created_by } = shoppingList

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{shopping_list_name}</h2>
          <Link to={`/households/${householdId}/shopping-lists`}>Zurück</Link>

          <p>Created by: {created_by}</p>
          <p>
            <button onClick={editShoppingListModal.show}>Edit</button>
            <button onClick={deleteShoppingListModal.show}>Delete</button>
          </p>
          <EditShoppingListModal
            householdId={householdId}
            shoppingList={shoppingList}
            modal={editShoppingListModal}
          />
          <DeleteShoppingListModal
            householdId={householdId}
            shoppingList={shoppingList}
            modal={deleteShoppingListModal}
          />
          <ShoppingListGroceries
            householdId={householdId}
            shoppingList={shoppingList}
          />
        </>
      )}
    </>
  )
}

export default React.memo(ShoppingListDetails)
