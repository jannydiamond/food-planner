import { useGetGroceriesQuery } from 'client/Redux/api/groceries'
import {
  useDeleteGroceryFromInventoryMutation,
  useGetGroceriesOfInventoryQuery,
  useGetInventoryByIdQuery,
} from 'client/Redux/api/inventories'
import { Grocery, InventoryHasGrocery } from 'model/types'
import React, { useCallback, useState } from 'react'
import AddForm from './AddForm'
import EditForm from './EditForm'

type Props = {
  householdId: string
  inventoryId: string
}

const InventoryGroceries = ({ householdId, inventoryId }: Props) => {
  const [groceryToEdit, setGroceryToEdit] =
    useState<null | InventoryHasGrocery>(null)
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

  const { data: groceries, isLoading: isLoadingGroceries } =
    useGetGroceriesQuery(undefined, {
      refetchOnMountOrArgChange: true,
    })

  const { data: inventoryGroceries } = useGetGroceriesOfInventoryQuery(
    {
      id: inventoryId,
      household_id: householdId,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const toggleEditGrocery = (grocery: InventoryHasGrocery) => {
    setIsEditing(!isEditing)
    setGroceryToEdit(grocery)
  }

  const [removeGroceryFromInventory] = useDeleteGroceryFromInventoryMutation()

  const handleDeleteGrocery = useCallback(
    async (grocery_id: string) => {
      removeGroceryFromInventory({
        grocery_id,
        inventory_id: inventoryId,
        household_id: householdId,
      })
    },
    [householdId, inventoryId, removeGroceryFromInventory]
  )

  if (!inventory) return null

  return (
    <>
      {isLoading || isLoadingGroceries ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Groceries</h2>
          <AddForm householdId={householdId} id={inventoryId} />
          {inventoryGroceries ? (
            <ul>
              {inventoryGroceries.map((grocery) => {
                return (
                  <li key={grocery.grocery_id}>
                    {
                      groceries?.find(
                        (g: Grocery) => g.id === grocery.grocery_id
                      )?.grocery_name
                    }
                    {grocery.amount &&
                      grocery.unit &&
                      `: ${grocery.amount} ${grocery.unit}`}
                    <button onClick={() => toggleEditGrocery(grocery)}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGrocery(grocery.grocery_id)}
                    >
                      Delete
                    </button>
                    {isEditing &&
                      groceryToEdit &&
                      groceryToEdit.grocery_id === grocery.grocery_id && (
                        <EditForm
                          householdId={householdId}
                          grocery={grocery}
                          finished={() => setIsEditing(false)}
                        />
                      )}
                  </li>
                )
              })}
            </ul>
          ) : (
            '-'
          )}
        </>
      )}
    </>
  )
}

export default React.memo(InventoryGroceries)
