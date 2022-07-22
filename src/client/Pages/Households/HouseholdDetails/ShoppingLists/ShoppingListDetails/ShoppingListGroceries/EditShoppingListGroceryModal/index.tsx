import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { Modal } from 'client/types'
import { ShoppingListHasGrocery } from 'model/types'
import React from 'react'
import EditForm from './EditForm'

type Props = {
  householdId: string
  shoppingListGrocery: ShoppingListHasGrocery
  modal: Modal
}

const EditShoppingListGroceryModal = ({
  householdId,
  shoppingListGrocery,
  modal,
}: Props) => {
  return (
    <modal.RenderModal
      titleColor="white"
      titleLabel="Edit shopping list grocery"
    >
      <>
        <ModalBodyWrapper hasFooter>
          <EditForm
            householdId={householdId}
            shoppingListGrocery={shoppingListGrocery}
            closeModal={modal.hide}
          />
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <input type="submit" form="editShoppingListGrocery" value="Save" />
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(EditShoppingListGroceryModal)
