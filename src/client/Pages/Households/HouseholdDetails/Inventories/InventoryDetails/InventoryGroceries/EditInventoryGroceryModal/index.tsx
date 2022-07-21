import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { Modal } from 'client/types'
import { InventoryHasGrocery } from 'model/types'
import React from 'react'
import EditForm from './EditForm'

type Props = {
  householdId: string
  inventoryGrocery: InventoryHasGrocery
  modal: Modal
}

const EditInventoryGroceryModal = ({ householdId, inventoryGrocery, modal }: Props) => {
  return (
    <modal.RenderModal titleColor="white" titleLabel="Edit inventory grocery">
      <>
        <ModalBodyWrapper hasFooter>
          <EditForm householdId={householdId} inventoryGrocery={inventoryGrocery} closeModal={modal.hide} />
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <input type="submit" form="editInventoryGrocery" value="Save" />
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(EditInventoryGroceryModal)
