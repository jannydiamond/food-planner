import { useGetShoppingListsQuery } from 'client/Redux/api/shoppingLists'
import React from 'react'
import { ShoppingList } from 'model/types'
import AddForm from './AddForm'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ShoppingLists = () => {
  const { householdId } = useParams() as { householdId: string }
  const navigate = useNavigate()

  const { data: shoppingLists, isLoading } = useGetShoppingListsQuery(
    householdId,
    {
      refetchOnMountOrArgChange: true,
    }
  )

  return (
    <div>
      <h2>Shopping lists</h2>
      <Link to={`/households/${householdId}`}>Zurück</Link>
      <AddForm householdId={householdId} />
      <h2>Listing</h2>
      {isLoading && <p>Loading...</p>}
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
    </div>
  )
}

export default React.memo(ShoppingLists)
