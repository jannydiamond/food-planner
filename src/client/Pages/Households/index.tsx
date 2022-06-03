import { useGetAllHouseholdsOfUserQuery } from 'client/Redux/api/households'
import React from 'react'
import { Household } from 'model/types'
import AddForm from './AddForm'
import { useNavigate } from 'react-router-dom'

const Households = () => {
  const navigate = useNavigate()

  const { data: households, isLoading: isLoadingHouseholds } =
    useGetAllHouseholdsOfUserQuery(undefined, {
      refetchOnMountOrArgChange: true,
    })

  return (
    <div>
      <h1>Households</h1>
      <AddForm />
      <h2>Listing</h2>
      {isLoadingHouseholds && <p>Loading...</p>}
      {households && households.data.length > 0 && (
        <ul>
          {households.data.map((household: Household) => (
            <li key={household.id}>
              <b>{household.household_name}</b>{' '}
              <button
                onClick={() =>
                  navigate(`/households/${household.id}`, {
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
