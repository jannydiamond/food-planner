import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { useDeleteHouseholdMutation } from 'client/Redux/api/households'
import { Modal } from 'client/types'
import { Household } from 'model/types'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  household: Household
  modal: Modal
}

const DeleteHouseholdModal = ({ household, modal }: Props) => {
  const navigate = useNavigate()

  const [deleteHousehold] = useDeleteHouseholdMutation()

  const handleDeleteHousehold = useCallback(async () => {
    deleteHousehold(household.id)
    modal.hide()
    navigate('/', { replace: true })
  }, [deleteHousehold, household.id, modal, navigate])

  return (
    <modal.RenderModal titleColor="white" titleLabel="Delete household">
      <>
        <ModalBodyWrapper hasFooter>
          Do you really want to delete household "{household.household_name}"?
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <button onClick={handleDeleteHousehold}>Delete</button>
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(DeleteHouseholdModal)
