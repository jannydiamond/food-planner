import {
  useDeleteGroceryMutation,
  useGetGroceryByIdQuery,
} from 'client/Redux/api/groceries'
import React, { useCallback, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EditForm from './EditForm'

const GroceryDetails = () => {
  const { groceryId } = useParams() as { groceryId: string }
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { data: grocery, isLoading } = useGetGroceryByIdQuery(groceryId, {
    refetchOnMountOrArgChange: true,
  })

  const toggleEditGrocery = () => setIsEditing(!isEditing)

  const [
    deleteGrocery,
    { isLoading: isLoadingDeleteGrocery, error: errorDeleteGrocery },
  ] = useDeleteGroceryMutation()

  const handleDeleteGrocery = useCallback(async () => {
    deleteGrocery(groceryId)
    navigate('/groceries', { replace: true })
  }, [deleteGrocery, groceryId, navigate])

  if (!grocery) return null

  const { grocery_name, created_by } = grocery

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Grocery: {grocery_name}</h1>
          <Link to={'/groceries'}>Zurück</Link>
          <p>Created by: {created_by}</p>
          <p>
            <button onClick={toggleEditGrocery}>Edit</button>
            <button onClick={handleDeleteGrocery}>Delete</button>
          </p>
          {isEditing && (
            <EditForm grocery={grocery} finished={() => setIsEditing(false)} />
          )}

          <p>
            {errorDeleteGrocery && <p>Something went wrong!</p>}
            {isLoadingDeleteGrocery && <p>Loading...</p>}
          </p>
        </>
      )}
    </>
  )
}

export default React.memo(GroceryDetails)
