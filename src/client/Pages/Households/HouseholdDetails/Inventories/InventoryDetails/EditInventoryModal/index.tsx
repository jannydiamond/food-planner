import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { Modal } from 'client/types'
import { Inventory } from 'model/types'
import React from 'react'
import EditForm from './EditForm'

type Props = {
  householdId: string
  inventory: Inventory
  modal: Modal
}

const EditInventoryModal = ({ householdId, inventory, modal }: Props) => {
  return (
    <modal.RenderModal titleColor="white" titleLabel="Edit inventory">
      <>
        <ModalBodyWrapper hasFooter>
          <EditForm householdId={householdId} inventory={inventory} closeModal={modal.hide} />
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <input type="submit" form="editInventory" value="Save" />
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(EditInventoryModal)
