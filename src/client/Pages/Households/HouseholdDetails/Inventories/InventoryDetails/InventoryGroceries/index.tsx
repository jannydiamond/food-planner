import { useModal } from 'client/hooks/useModal'
import { useGetGroceriesQuery } from 'client/Redux/api/groceries'
import {
  useGetGroceriesOfInventoryQuery
} from 'client/Redux/api/inventories'
import { Grocery, Inventory, InventoryHasGrocery } from 'model/types'
import React, { useState } from 'react'
import AddInventoryGroceryModal from './AddInventoryGroceryModal'
import DeleteInventoryGroceryModal from './DeleteInventoryGroceryModal'
import EditInventoryGroceryModal from './EditInventoryGroceryModal'

type Props = {
  householdId: string
  inventory: Inventory
}

const InventoryGroceries = ({ householdId, inventory }: Props) => {
  const addInventoryGroceryModal = useModal()
  const editInventoryGroceryModal = useModal()
  const deleteInventoryGroceryModal = useModal()

  const [groceryToEdit, setGroceryToEdit] =
  useState<null | InventoryHasGrocery>(null)

  const { data: groceries } =
    useGetGroceriesQuery(undefined, {
      refetchOnMountOrArgChange: true,
    })

  const { data: inventoryGroceries, isLoading } = useGetGroceriesOfInventoryQuery(
    {
      id: inventory.id,
      household_id: householdId,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const toggleEditGrocery = (grocery: InventoryHasGrocery) => {
    setGroceryToEdit(grocery)
    editInventoryGroceryModal.show()
  }

  if (!inventory) return null

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Groceries</h3>
          <button onClick={addInventoryGroceryModal.show}>Add</button>
          <AddInventoryGroceryModal householdId={householdId} inventoryId={inventory.id} modal={addInventoryGroceryModal} />
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
                      onClick={deleteInventoryGroceryModal.show}
                    >
                      Delete
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            '-'
          )}
        </>
      )}
      {groceryToEdit && (
        <>
          <EditInventoryGroceryModal
            householdId={householdId}
            inventoryGrocery={groceryToEdit}
            modal={editInventoryGroceryModal}
          />
          <DeleteInventoryGroceryModal
            householdId={householdId}
            inventoryGrocery={groceryToEdit}
            modal={deleteInventoryGroceryModal}
          />
        </>
      )}
    </>
  )
}

export default React.memo(InventoryGroceries)
