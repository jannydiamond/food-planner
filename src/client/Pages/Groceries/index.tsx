import { useModal } from 'client/hooks/useModal'
import { useGetGroceriesQuery } from 'client/Redux/api/groceries'
import { Grocery } from 'model/types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddGroceryModal from './AddGroceryModal'

const Groceries = () => {
  const navigate = useNavigate()
  const addGroceryModal = useModal()

  const { data: groceries, isLoading } = useGetGroceriesQuery(undefined)

  return (
    <div>
      <h1>Groceries</h1>
      <button onClick={addGroceryModal.show}>Add</button>
      <AddGroceryModal modal={addGroceryModal} />
      {isLoading && <p>Loading...</p>}
      {groceries && groceries.length > 0 ? (
        <ul>
          {groceries.map((grocery: Grocery) => (
            <li key={grocery.id}>
              <b>{grocery.grocery_name}</b>{' '}
              <button
                onClick={() =>
                  navigate(`/groceries/${grocery.id}`, {
                    replace: true,
                  })
                }
              >
                Details
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No groceries found.</p>
      )}
    </div>
  )
}

export default React.memo(Groceries)
