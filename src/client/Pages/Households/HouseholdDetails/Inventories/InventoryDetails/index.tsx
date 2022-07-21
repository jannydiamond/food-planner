import { useModal } from 'client/hooks/useModal'
import {
  useGetInventoryByIdQuery,
} from 'client/Redux/api/inventories'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DeleteInventoryModal from './DeleteInventoryModal'
import EditInventoryModal from './EditInventoryModal'
import InventoryGroceries from './InventoryGroceries'

const InventoryDetails = () => {
  const { householdId } = useParams() as { householdId: string }
  const { inventoryId } = useParams() as { inventoryId: string }

  const editInventoryModal = useModal()
  const deleteInventoryModal = useModal()

  const { data: inventory, isLoading } = useGetInventoryByIdQuery(
    {
      id: inventoryId,
      household_id: householdId,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  if (!inventory) return null

  console.log('Details', inventory)

  const { inventory_name, created_by } = inventory

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{inventory_name}</h2>
          <Link to={`/households/${householdId}/inventories`}>Zurück</Link>

          <p>Created by: {created_by}</p>
          <p>
            <button onClick={editInventoryModal.show}>Edit</button>
            <button onClick={deleteInventoryModal.show}>Delete</button>
          </p>
          <EditInventoryModal
            householdId={householdId}
            inventory={inventory}
            modal={editInventoryModal}
          />
          <DeleteInventoryModal
            householdId={householdId}
            inventory={inventory}
            modal={deleteInventoryModal}
          />
          <InventoryGroceries
            householdId={householdId}
            inventory={inventory}
          />
        </>
      )}
    </>
  )
}

export default React.memo(InventoryDetails)
