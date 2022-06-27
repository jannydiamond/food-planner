import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { useDeleteUnitMutation } from 'client/Redux/api/units'
import { Modal } from 'client/types'
import { Unit } from 'model/types'
import React, { useCallback } from 'react'

type Props = {
  unit: Unit
  modal: Modal
}

const DeleteUnitModal = ({ unit, modal }: Props) => {
  const [deleteUnit] = useDeleteUnitMutation()

  const handleDeleteUnit = useCallback(async () => {
    deleteUnit(unit.id)
    modal.hide()
  }, [deleteUnit, unit.id, modal])

  return (
    <modal.RenderModal titleColor="white" titleLabel="Delete unit">
      <>
        <ModalBodyWrapper hasFooter>
          Do you really want to delete unit "{unit.unit_name}"?
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <button onClick={handleDeleteUnit}>Delete</button>
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(DeleteUnitModal)
