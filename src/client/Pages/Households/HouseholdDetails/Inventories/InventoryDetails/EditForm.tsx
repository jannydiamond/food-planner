import { usePutInventoryMutation } from 'client/Redux/api/inventories'
import { Inventory } from 'model/types'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  householdId: string
  inventory: Inventory
  finished: () => void
}

type EditInventoryFormData = {
  inventory_name: string
}

const EditForm = ({ householdId, inventory, finished }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditInventoryFormData>()

  const [editInventory, { isLoading, error }] = usePutInventoryMutation()

  const handleEditInventory = useCallback(
    async (data: EditInventoryFormData) => {
      editInventory({
        id: inventory.id,
        inventory_name: data.inventory_name,
        household_id: householdId,
      })

      finished()
    },

    [editInventory, inventory.id, householdId, finished]
  )

  return (
    <form onSubmit={handleSubmit(handleEditInventory)}>
      <fieldset>
        <legend>Edit inventory</legend>
        {error && <p>Something went wrong!</p>}
        <label htmlFor="inventory_name">
          <p>Inventory name</p>
          <input
            type="text"
            {...register('inventory_name', {
              required: 'Inventory name is required!',
            })}
          />
        </label>
        {errors.inventory_name && <p>{errors.inventory_name.message}</p>}
        <input type="submit" />
        {isLoading && <p>Loading...</p>}
      </fieldset>
    </form>
  )
}

export default React.memo(EditForm)
