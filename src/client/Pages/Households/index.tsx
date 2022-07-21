import { useGetAllHouseholdsOfUserQuery } from 'client/Redux/api/households'
import React from 'react'
import { Household } from 'model/types'
import { useNavigate } from 'react-router-dom'
import { useModal } from 'client/hooks/useModal'
import AddHouseholdModal from './AddHouseholdModal'

const Households = () => {
  const navigate = useNavigate()
  const addHouseholdModal = useModal()

  const { data: households, isLoading } =
    useGetAllHouseholdsOfUserQuery(undefined)

  return (
    <div>
      <h1>Households</h1>
      <button onClick={addHouseholdModal.show}>Add</button>
      <AddHouseholdModal modal={addHouseholdModal} />
      {isLoading && <p>Loading...</p>}
      {households && households.length > 0 && (
        <ul>
          {households.map((household: Household) => (
            <li key={household.id}>
              <b>{household.household_name}</b>{' '}
              <button
                onClick={() =>
                  navigate(`/households/${household.id}/inventories`, {
                    replace: true,
                  })
                }
              >
                Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default React.memo(Households)
