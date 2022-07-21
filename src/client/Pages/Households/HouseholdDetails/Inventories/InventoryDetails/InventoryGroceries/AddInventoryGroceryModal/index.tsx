import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { Modal } from 'client/types'
import React from 'react'
import AddForm from './AddForm'

type Props = {
  householdId: string
  inventoryId: string
  modal: Modal
}

const AddInventoryGroceryModal = ({ householdId, inventoryId, modal }: Props) => {
  return (
    <modal.RenderModal titleColor="white" titleLabel="Add inventory grocery">
      <>
        <ModalBodyWrapper hasFooter>
          <AddForm householdId={householdId} id={inventoryId} closeModal={modal.hide} />
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <input type="submit" form="addInventoryGrocery" value="Add" />
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(AddInventoryGroceryModal)
