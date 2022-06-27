import { useGetInventoriesQuery } from 'client/Redux/api/inventories'
import React from 'react'
import { Inventory } from 'model/types'
import AddForm from './AddForm'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Inventories = () => {
  const { householdId } = useParams() as { householdId: string }
  const navigate = useNavigate()

  const { data: inventories, isLoading } = useGetInventoriesQuery(householdId, {
    refetchOnMountOrArgChange: true,
  })

  return (
    <div>
      <h2>Inventories</h2>
      <Link to={`/households/${householdId}`}>Zurück</Link>
      <AddForm householdId={householdId} />
      <h2>Listing</h2>
      {isLoading && <p>Loading...</p>}
      {inventories && inventories.length > 0 && (
        <ul>
          {inventories.map((inventory: Inventory) => (
            <li key={inventory.id}>
              <b>{inventory.inventory_name}</b>{' '}
              <button
                onClick={() =>
                  navigate(
                    `/households/${householdId}/inventories/${inventory.id}`,
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

export default React.memo(Inventories)
