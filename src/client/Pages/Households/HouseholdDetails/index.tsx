import { useModal } from 'client/hooks/useModal'
import { useGetHouseholdByIdQuery } from 'client/Redux/api/households'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DeleteHouseholdModal from './DeleteHouseholdModal'
import EditHouseholdModal from './EditHouseholdModal'

const HouseholdDetails = () => {
  const { householdId } = useParams() as { householdId: string }

  const editHouseholdModal = useModal()
  const deleteHouseholdModal = useModal()

  const { data: household, isLoading } = useGetHouseholdByIdQuery(householdId, {
    refetchOnMountOrArgChange: true,
  })

  if (!household) return null

  const { household_name, created_by } = household

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{household_name}</h1>
          <Link to={'/'}>Zurück</Link>
          <p>Created by: {created_by}</p>
          <p>
            <button onClick={editHouseholdModal.show}>Edit</button>
            <button onClick={deleteHouseholdModal.show}>Delete</button>
          </p>
          <EditHouseholdModal
            household={household}
            modal={editHouseholdModal}
          />
          <DeleteHouseholdModal
            household={household}
            modal={deleteHouseholdModal}
          />
        </>
      )}
    </>
  )
}

export default React.memo(HouseholdDetails)
