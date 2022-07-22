import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { Modal } from 'client/types'
import React from 'react'
import AddForm from './AddForm'

type Props = {
  householdId: string
  shoppingListId: string
  modal: Modal
}

const AddShoppingListGroceryModal = ({
  householdId,
  shoppingListId,
  modal,
}: Props) => {
  return (
    <modal.RenderModal
      titleColor="white"
      titleLabel="Add shopping list grocery"
    >
      <>
        <ModalBodyWrapper hasFooter>
          <AddForm
            householdId={householdId}
            id={shoppingListId}
            closeModal={modal.hide}
          />
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <input type="submit" form="addShoppingListGrocery" value="Add" />
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(AddShoppingListGroceryModal)
