import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { useDeleteUserFromHouseholdMutation } from 'client/Redux/api/households'
import { Modal } from 'client/types'
import { FpUser, Household } from 'model/types'
import React, { useCallback } from 'react'

type Props = {
  household: Household
  user: Pick<FpUser, 'id' | 'username'>
  modal: Modal
}

const DeleteUserModal = ({ user, household, modal }: Props) => {
  const [removeUserFromHousehold] = useDeleteUserFromHouseholdMutation()

  const handleDeleteUser = useCallback(async () => {
    removeUserFromHousehold({ user_id: user.id, household_id: household.id })
    modal.hide()
  }, [household.id, modal, removeUserFromHousehold, user.id])

  return (
    <modal.RenderModal titleColor="white" titleLabel="Delete user">
      <>
        <ModalBodyWrapper hasFooter>
          Do you really want to delete user "{user.username}" from household "
          {household.household_name}"?
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <button onClick={handleDeleteUser}>Delete</button>
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(DeleteUserModal)
