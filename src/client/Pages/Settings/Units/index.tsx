import {
  useDeleteUnitMutation,
  useGetAllUnitsQuery,
} from 'client/Redux/api/units'
import { RootState, selectors } from 'client/Redux/store'
import getCurrentUser from 'client/utils/getCurrentUser'
import { Unit } from 'model/types'
import React, { useCallback, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import AddForm from './AddForm'
import EditForm from './EditForm'

type OwnProps = {}

const mapStateToProps = (state: RootState) => {
  return {
    token: selectors.authentication.selectToken(state),
  }
}

const mapDispatchToProps = {}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & OwnProps

const Units = ({ token }: Props) => {
  const currentUser = getCurrentUser(token)
  const [unitToEdit, setUnitToEdit] = useState<null | Unit>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { data: units, isLoading } = useGetAllUnitsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const toggleEditUnit = (unit: Unit) => {
    setIsEditing(!isEditing)
    setUnitToEdit(unit)
  }

  const [
    deleteUnit,
    { isLoading: isLoadingDeleteUnit, error: errorDeleteUnit },
  ] = useDeleteUnitMutation()

  const handleDeleteUnit = useCallback(
    async (unitId: number) => {
      deleteUnit(unitId.toString())
    },
    [deleteUnit]
  )

  return (
    <div>
      <h1>Units</h1>
      <Link to={'/settings'}>Zurück</Link>
      <AddForm />
      <h2>Listing</h2>
      {isLoading && <p>Loading...</p>}
      {units && units.length > 0 && (
        <ul>
          {units.map((unit: Unit) => (
            <li key={unit.id}>
              <b>{unit.unit_name}</b>{' '}
              {currentUser.username === unit.created_by && (
                <>
                  <button onClick={() => toggleEditUnit(unit)}>Edit</button>
                  <button onClick={() => handleDeleteUnit(unit.id)}>
                    Delete
                  </button>
                  {isEditing && unitToEdit && unitToEdit.id === unit.id && (
                    <EditForm
                      unit={unit}
                      finished={() => setIsEditing(false)}
                    />
                  )}
                  <p>
                    {errorDeleteUnit && <p>Something went wrong!</p>}
                    {isLoadingDeleteUnit && <p>Loading...</p>}
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default connector(React.memo(Units))
