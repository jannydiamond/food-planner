import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { Modal } from 'client/types'
import { ShoppingList } from 'model/types'
import React from 'react'
import EditForm from './EditForm'

type Props = {
  householdId: string
  shoppingList: ShoppingList
  modal: Modal
}

const EditShoppingListModal = ({ householdId, shoppingList, modal }: Props) => {
  return (
    <modal.RenderModal titleColor="white" titleLabel="Edit shopping list">
      <>
        <ModalBodyWrapper hasFooter>
          <EditForm
            householdId={householdId}
            shoppingList={shoppingList}
            closeModal={modal.hide}
          />
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <input type="submit" form="editShoppingList" value="Save" />
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(EditShoppingListModal)
