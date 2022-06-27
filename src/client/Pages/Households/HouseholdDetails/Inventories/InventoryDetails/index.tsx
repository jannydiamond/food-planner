import {
  useDeleteInventoryMutation,
  useGetInventoryByIdQuery,
} from 'client/Redux/api/inventories'
import React, { useCallback, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EditForm from './EditForm'
import InventoryGroceries from './InventoryGroceries'

const InventoryDetails = () => {
  const { householdId } = useParams() as { householdId: string }
  const { inventoryId } = useParams() as { inventoryId: string }
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { data: inventory, isLoading } = useGetInventoryByIdQuery(
    {
      id: inventoryId,
      household_id: householdId,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const toggleEditInventory = () => setIsEditing(!isEditing)

  const [
    deleteInventory,
    { isLoading: isLoadingDeleteInventory, error: errorDeleteInventory },
  ] = useDeleteInventoryMutation()

  const handleDeleteInventory = useCallback(async () => {
    deleteInventory({
      id: inventoryId,
      household_id: householdId,
    })
    navigate(`/households/${householdId}/inventories`, { replace: true })
  }, [deleteInventory, householdId, inventoryId, navigate])

  if (!inventory) return null

  const { inventory_name, created_by } = inventory

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Inventory: {inventory_name}</h1>
          <Link to={`/households/${householdId}/inventories`}>Zurück</Link>

          <p>Created by: {created_by}</p>
          <p>
            <button onClick={toggleEditInventory}>Edit</button>
            <button onClick={handleDeleteInventory}>Delete</button>
          </p>
          {isEditing && (
            <EditForm
              householdId={householdId}
              inventory={inventory}
              finished={() => setIsEditing(false)}
            />
          )}

          <p>
            {errorDeleteInventory && <p>Something went wrong!</p>}
            {isLoadingDeleteInventory && <p>Loading...</p>}
          </p>
          <InventoryGroceries
            householdId={householdId}
            inventoryId={inventoryId}
          />
        </>
      )}
    </>
  )
}

export default React.memo(InventoryDetails)
