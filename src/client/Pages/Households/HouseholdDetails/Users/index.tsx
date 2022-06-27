import {
  useDeleteUserFromHouseholdMutation,
  useGetAllUsersOfHouseholdQuery,
  useGetHouseholdByIdQuery,
} from 'client/Redux/api/households'
import React, { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import AddForm from './AddForm'

const Users = () => {
  const { householdId } = useParams() as { householdId: string }

  const { data: household, isLoading } = useGetHouseholdByIdQuery(householdId, {
    refetchOnMountOrArgChange: true,
  })

  const { data: users } = useGetAllUsersOfHouseholdQuery(householdId, {
    refetchOnMountOrArgChange: true,
  })

  const [removeUserFromHousehold] = useDeleteUserFromHouseholdMutation()

  const handleDeleteUser = useCallback(
    async (user_id: string) => {
      removeUserFromHousehold({ user_id, household_id: householdId })
    },
    [householdId, removeUserFromHousehold]
  )

  if (!household) return null

  const { created_by } = household

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Users</h2>
          <Link to={`/households/${householdId}`}>Zurück</Link>
          <AddForm id={householdId} />
          {users ? (
            <ul>
              {users.map((user) => {
                return (
                  <li key={user.id}>
                    {user.username}{' '}
                    {user.username !== created_by && (
                      <button onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            '-'
          )}
        </>
      )}
    </>
  )
}

export default React.memo(Users)
