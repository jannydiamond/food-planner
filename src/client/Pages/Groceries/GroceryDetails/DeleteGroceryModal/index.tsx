import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { useDeleteGroceryMutation } from 'client/Redux/api/groceries'
import { Modal } from 'client/types'
import { Grocery } from 'model/types'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  grocery: Grocery
  modal: Modal
}

const DeleteGroceryModal = ({ grocery, modal }: Props) => {
  const navigate = useNavigate()

  const [deleteGrocery] = useDeleteGroceryMutation()

  const handleDeleteGrocery = useCallback(async () => {
    deleteGrocery(grocery.id)
    modal.hide()
    navigate('/groceries', { replace: true })
  }, [deleteGrocery, grocery.id, modal, navigate])

  return (
    <modal.RenderModal titleColor="white" titleLabel="Delete grocery">
      <>
        <ModalBodyWrapper hasFooter>
          Do you really want to delete grocery "{grocery.grocery_name}"?
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <button onClick={handleDeleteGrocery}>Delete</button>
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(DeleteGroceryModal)
