import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { useDeleteInventoryMutation } from 'client/Redux/api/inventories'
import { Modal } from 'client/types'
import { Inventory } from 'model/types'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  householdId: string
  inventory: Inventory
  modal: Modal
}

const DeleteInventoryModal = ({ householdId, inventory, modal }: Props) => {
  const navigate = useNavigate()

  const [deleteInventory] = useDeleteInventoryMutation()

  const handleDeleteInventory = useCallback(async () => {
    deleteInventory({
      id: inventory.id,
      household_id: householdId
    })
    modal.hide()
    navigate(`/households/${householdId}/inventories`, { replace: true })
  }, [deleteInventory, householdId, inventory.id, modal, navigate])

  return (
    <modal.RenderModal titleColor="white" titleLabel="Delete inventory">
      <>
        <ModalBodyWrapper hasFooter>
          Do you really want to delete inventory "{inventory.inventory_name}"?
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <button onClick={handleDeleteInventory}>Delete</button>
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(DeleteInventoryModal)
