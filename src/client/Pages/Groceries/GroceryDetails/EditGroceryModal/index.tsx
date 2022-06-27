import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { Modal } from 'client/types'
import { Grocery } from 'model/types'
import React from 'react'
import EditForm from './EditForm'

type Props = {
  grocery: Grocery
  modal: Modal
}

const EditGroceryModal = ({ grocery, modal }: Props) => {
  return (
    <modal.RenderModal titleColor="white" titleLabel="Edit grocery">
      <>
        <ModalBodyWrapper hasFooter>
          <EditForm grocery={grocery} closeModal={modal.hide} />
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <input type="submit" form="editGrocery" value="Save" />
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(EditGroceryModal)
