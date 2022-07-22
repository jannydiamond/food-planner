import { useGetShoppingListsQuery } from 'client/Redux/api/shoppingLists'
import React from 'react'
import { ShoppingList } from 'model/types'
import { useNavigate, useParams } from 'react-router-dom'
import AddShoppingListModal from './AddShoppingListModal'
import { useModal } from 'client/hooks/useModal'

const ShoppingLists = () => {
  const { householdId } = useParams() as { householdId: string }
  const navigate = useNavigate()

  const addShoppingListModal = useModal()

  const { data: shoppingLists, isLoading } =
    useGetShoppingListsQuery(householdId)

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={addShoppingListModal.show}>Add</button>
          <AddShoppingListModal
            householdId={householdId}
            modal={addShoppingListModal}
          />

          {shoppingLists && shoppingLists.length > 0 && (
            <ul>
              {shoppingLists.map((shoppingList: ShoppingList) => (
                <li key={shoppingList.id}>
                  <b>{shoppingList.shopping_list_name}</b>{' '}
                  <button
                    onClick={() =>
                      navigate(
                        `/households/${householdId}/shopping-lists/${shoppingList.id}`,
                        {
                          replace: true,
                        }
                      )
                    }
                  >
                    Details
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  )
}

export default React.memo(ShoppingLists)
