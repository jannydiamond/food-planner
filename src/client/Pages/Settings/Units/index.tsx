import { useModal } from 'client/hooks/useModal'
import { useGetAllUnitsQuery } from 'client/Redux/api/units'
import { RootState, selectors } from 'client/Redux/store'
import getCurrentUser from 'client/utils/getCurrentUser'
import { Unit } from 'model/types'
import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import AddUnitModal from './AddUnitModal'
import EditUnitModal from './EditUnitModal'
import DeleteUnitModal from './DeleteUnitModal'

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

  const addUnitModal = useModal()
  const editUnitModal = useModal()
  const deleteUnitModal = useModal()

  const [currentUnit, setCurrentUnit] = useState<Unit | null>(null)

  const { data: units, isLoading } = useGetAllUnitsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const handleEditUnit = (id: number) => {
    const unit = units?.find((unit) => unit.id === id) ?? null

    if (unit) {
      setCurrentUnit(unit)
      editUnitModal.show()
    }
  }

  const handleDeleteUnit = (id: number) => {
    const unit = units?.find((unit) => unit.id === id) ?? null

    if (unit) {
      setCurrentUnit(unit)
      deleteUnitModal.show()
    }
  }

  return (
    <div>
      <h1>Units</h1>
      <Link to={'/settings'}>Zurück</Link>
      <button onClick={addUnitModal.show}>Add</button>
      <AddUnitModal modal={addUnitModal} />
      {isLoading && <p>Loading...</p>}
      {units && units.length > 0 ? (
        <ul>
          {units.map((unit: Unit) => (
            <li key={unit.id}>
              <b>{unit.unit_name}</b>{' '}
              {currentUser.username === unit.created_by && (
                <>
                  <button onClick={() => handleEditUnit(unit.id)}>Edit</button>
                  <button onClick={() => handleDeleteUnit(unit.id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No units found.</p>
      )}
      {currentUnit && (
        <>
          <EditUnitModal unit={currentUnit} modal={editUnitModal} />
          <DeleteUnitModal unit={currentUnit} modal={deleteUnitModal} />
        </>
      )}
    </div>
  )
}

export default connector(React.memo(Units))
