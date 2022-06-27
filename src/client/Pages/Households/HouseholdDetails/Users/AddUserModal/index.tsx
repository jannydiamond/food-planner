import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { Modal } from 'client/types'
import React from 'react'
import AddForm from './AddForm'

type Props = {
  householdId: string
  modal: Modal
}

const AddUserModal = ({ householdId, modal }: Props) => {
  return (
    <modal.RenderModal titleColor="white" titleLabel="Add user">
      <>
        <ModalBodyWrapper hasFooter>
          <AddForm householdId={householdId} closeModal={modal.hide} />
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <input type="submit" form="addUser" value="Add" />
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(AddUserModal)
