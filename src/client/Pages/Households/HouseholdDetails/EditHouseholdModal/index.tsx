import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { Modal } from 'client/types'
import { Household } from 'model/types'
import React from 'react'
import EditForm from './EditForm'

type Props = {
  household: Household
  modal: Modal
}

const EditHouseholdModal = ({ household, modal }: Props) => {
  return (
    <modal.RenderModal titleColor="white" titleLabel="Edit household">
      <>
        <ModalBodyWrapper hasFooter>
          <EditForm household={household} closeModal={modal.hide} />
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <input type="submit" form="editHousehold" value="Save" />
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(EditHouseholdModal)
