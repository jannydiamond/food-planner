import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { Modal } from 'client/types'
import { Unit } from 'model/types'
import React from 'react'
import EditForm from './EditForm'

type Props = {
  unit: Unit
  modal: Modal
}

const EditUnitModal = ({ unit, modal }: Props) => {
  return (
    <modal.RenderModal titleColor="white" titleLabel="Edit unit">
      <>
        <ModalBodyWrapper hasFooter>
          <EditForm unit={unit} closeModal={modal.hide} />
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <input type="submit" form="editUnit" value="Save" />
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(EditUnitModal)
