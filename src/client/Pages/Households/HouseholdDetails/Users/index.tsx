import { useModal } from 'client/hooks/useModal'
import {
  useGetAllUsersOfHouseholdQuery,
  useGetHouseholdByIdQuery,
} from 'client/Redux/api/households'
import { FpUser } from 'model/types'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AddUserModal from './AddUserModal'
import DeleteUserModal from './DeleteUserModal'

const Users = () => {
  const { householdId } = useParams() as { householdId: string }

  const addUserModal = useModal()
  const deleteUserModal = useModal()

  const [currentUser, setCurrentUser] = useState<Pick<
    FpUser,
    'id' | 'username'
  > | null>(null)

  const { data: household, isLoading } = useGetHouseholdByIdQuery(householdId, {
    refetchOnMountOrArgChange: true,
  })

  const { data: users } = useGetAllUsersOfHouseholdQuery(householdId, {
    refetchOnMountOrArgChange: true,
  })

  const handleDeleteUser = (user_id: string) => {
    const user = users?.find((user) => user.id === user_id) ?? null

    if (user) {
      setCurrentUser(user)
      deleteUserModal.show()
    }
  }

  if (!household) return null

  const { created_by } = household

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={addUserModal.show}>Add</button>
          <AddUserModal householdId={householdId} modal={addUserModal} />
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
      {currentUser && (
        <>
          <DeleteUserModal
            household={household}
            user={currentUser}
            modal={deleteUserModal}
          />
        </>
      )}
    </>
  )
}

export default React.memo(Users)
