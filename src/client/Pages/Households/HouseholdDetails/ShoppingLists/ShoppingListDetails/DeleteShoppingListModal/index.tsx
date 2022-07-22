import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { useDeleteShoppingListMutation } from 'client/Redux/api/shoppingLists'
import { Modal } from 'client/types'
import { ShoppingList } from 'model/types'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  householdId: string
  shoppingList: ShoppingList
  modal: Modal
}

const DeleteShoppingListModal = ({
  householdId,
  shoppingList,
  modal,
}: Props) => {
  const navigate = useNavigate()

  const [deleteShoppingList] = useDeleteShoppingListMutation()

  const handleDeleteShoppingList = useCallback(async () => {
    deleteShoppingList({
      id: shoppingList.id,
      household_id: householdId,
    })
    modal.hide()
    navigate(`/households/${householdId}/shopping-lists`, { replace: true })
  }, [deleteShoppingList, householdId, shoppingList.id, modal, navigate])

  return (
    <modal.RenderModal titleColor="white" titleLabel="Delete shopping list">
      <>
        <ModalBodyWrapper hasFooter>
          Do you really want to delete shopping list "
          {shoppingList.shopping_list_name}"?
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <button onClick={handleDeleteShoppingList}>Delete</button>
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(DeleteShoppingListModal)
