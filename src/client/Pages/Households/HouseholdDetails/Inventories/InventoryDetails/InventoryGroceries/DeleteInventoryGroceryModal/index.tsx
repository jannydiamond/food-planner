import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { useGetGroceriesQuery } from 'client/Redux/api/groceries'
import {
  useDeleteGroceryFromInventoryMutation,
  useGetInventoriesQuery,
} from 'client/Redux/api/inventories'
import { Modal } from 'client/types'
import { Grocery, Inventory, InventoryHasGrocery } from 'model/types'
import React, { useCallback } from 'react'

type Props = {
  householdId: string
  inventoryGrocery: InventoryHasGrocery
  modal: Modal
}

const DeleteInventoryGroceryModal = ({
  householdId,
  inventoryGrocery,
  modal,
}: Props) => {
  const { data: groceries } = useGetGroceriesQuery(undefined)

  const { data: inventories } = useGetInventoriesQuery(householdId)

  const [removeGroceryFromInventory] = useDeleteGroceryFromInventoryMutation()

  const handleDeleteInventoryGrocery = useCallback(async () => {
    removeGroceryFromInventory({
      grocery_id: inventoryGrocery.grocery_id,
      inventory_id: inventoryGrocery.inventory_id,
      household_id: householdId,
    })

    modal.hide()
  }, [
    removeGroceryFromInventory,
    inventoryGrocery.grocery_id,
    inventoryGrocery.inventory_id,
    householdId,
    modal,
  ])
  return (
    <modal.RenderModal titleColor="white" titleLabel="Delete inventory grocery">
      <>
        <ModalBodyWrapper hasFooter>
          Do you really want to delete grocery "
          {
            groceries?.find(
              (g: Grocery) => g.id === inventoryGrocery.grocery_id
            )?.grocery_name
          }
          " from inventory "
          {
            inventories?.find(
              (i: Inventory) => i.id === inventoryGrocery.inventory_id
            )?.inventory_name
          }
          "?
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <button onClick={handleDeleteInventoryGrocery}>Delete</button>
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(DeleteInventoryGroceryModal)
