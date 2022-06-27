import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { Modal } from 'client/types'
import React from 'react'
import AddForm from './AddForm'

type Props = {
  modal: Modal
}

const AddGroceryModal = ({ modal }: Props) => {
  return (
    <modal.RenderModal titleColor="white" titleLabel="Add grocery">
      <>
        <ModalBodyWrapper hasFooter>
          <AddForm closeModal={modal.hide} />
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <input type="submit" form="addGrocery" value="Add" />
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(AddGroceryModal)
