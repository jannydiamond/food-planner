import {
  useDeleteHouseholdMutation,
  useGetHouseholdByIdQuery,
} from 'client/Redux/api/households'
import React, { useCallback, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EditForm from './EditForm'
import HouseholdUsers from './HouseholdUsers'

const HouseholdDetails = () => {
  const { householdId } = useParams() as { householdId: string }
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { data: household, isLoading } = useGetHouseholdByIdQuery(householdId, {
    refetchOnMountOrArgChange: true,
  })

  const toggleEditHousehold = () => setIsEditing(!isEditing)

  const [
    deleteHousehold,
    { isLoading: isLoadingDeleteHousehold, error: errorDeleteHousehold },
  ] = useDeleteHouseholdMutation()

  const handleDeleteHousehold = useCallback(async () => {
    deleteHousehold(householdId)
    navigate('/', { replace: true })
  }, [deleteHousehold, householdId, navigate])

  if (!household) return null

  const { household_name, created_by } = household

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Household: {household_name}</h1>
          <Link to={'/'}>Zurück</Link>
          <p>Created by: {created_by}</p>
          <p>
            <button onClick={toggleEditHousehold}>Edit</button>
            <button onClick={handleDeleteHousehold}>Delete</button>
          </p>
          {isEditing && (
            <EditForm
              household={household}
              finished={() => setIsEditing(false)}
            />
          )}

          <p>
            {errorDeleteHousehold && <p>Something went wrong!</p>}
            {isLoadingDeleteHousehold && <p>Loading...</p>}
          </p>
          <HouseholdUsers householdId={householdId} />
        </>
      )}
    </>
  )
}

export default React.memo(HouseholdDetails)
