import { useModal } from 'client/hooks/useModal'
import { useGetGroceryByIdQuery } from 'client/Redux/api/groceries'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DeleteGroceryModal from './DeleteGroceryModal'
import EditGroceryModal from './EditGroceryModal'

const GroceryDetails = () => {
  const { groceryId } = useParams() as { groceryId: string }

  const editGroceryModal = useModal()
  const deleteGroceryModal = useModal()

  const { data: grocery, isLoading } = useGetGroceryByIdQuery(groceryId)

  if (!grocery) return null

  const { grocery_name, created_by } = grocery

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{grocery_name}</h1>
          <Link to={'/groceries'}>Zurück</Link>
          <p>Created by: {created_by}</p>
          <p>
            <button onClick={editGroceryModal.show}>Edit</button>
            <button onClick={deleteGroceryModal.show}>Delete</button>
          </p>
          <EditGroceryModal grocery={grocery} modal={editGroceryModal} />
          <DeleteGroceryModal grocery={grocery} modal={deleteGroceryModal} />
        </>
      )}
    </>
  )
}

export default React.memo(GroceryDetails)
