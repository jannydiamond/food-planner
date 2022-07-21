import { useGetInventoriesQuery } from 'client/Redux/api/inventories'
import React from 'react'
import { Inventory } from 'model/types'
import { useNavigate, useParams } from 'react-router-dom'
import { useModal } from 'client/hooks/useModal'
import AddInventoryModal from './AddInventoryModal'

const Inventories = () => {
  const { householdId } = useParams() as { householdId: string }
  const navigate = useNavigate()

  const addInventoryModal = useModal()

  const { data: inventories, isLoading } = useGetInventoriesQuery(householdId, {
    refetchOnMountOrArgChange: true,
  })

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={addInventoryModal.show}>Add</button>
          <AddInventoryModal
            householdId={householdId}
            modal={addInventoryModal}
          />

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
        </>
      )}
    </>
  )
}

export default React.memo(Inventories)
