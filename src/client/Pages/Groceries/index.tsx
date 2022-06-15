import { useGetGroceriesQuery } from 'client/Redux/api/groceries'
import { Grocery } from 'model/types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddForm from './AddForm'

const Groceries = () => {
  const navigate = useNavigate()

  const { data: groceries, isLoading } = useGetGroceriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  return (
    <div>
      <h1>Groceries</h1>
      <AddForm />
      <h2>Listing</h2>
      {isLoading && <p>Loading...</p>}
      {groceries && groceries.length > 0 && (
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
      )}
    </div>
  )
}

export default React.memo(Groceries)
