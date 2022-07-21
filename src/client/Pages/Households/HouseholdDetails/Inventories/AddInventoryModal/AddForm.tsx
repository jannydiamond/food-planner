import { usePostInventoryMutation } from 'client/Redux/api/inventories'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type AddInventoryFormData = {
  inventory_name: string
}

type Props = {
  householdId: string
  closeModal: () => void
}

const AddForm = ({ householdId, closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddInventoryFormData>()

  const [addInventory, { isLoading, error }] = usePostInventoryMutation()

  const handleAddInventory = useCallback(
    async (data: AddInventoryFormData) => {
      addInventory({
        household_id: householdId,
        inventory_name: data.inventory_name,
      })
      closeModal()
    },
    [addInventory, householdId, closeModal]
  )

  return (
    <form id="addInventory" onSubmit={handleSubmit(handleAddInventory)}>
      <fieldset>
        <legend>Add inventory</legend>
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
        {isLoading && <p>Loading...</p>}
      </fieldset>
    </form>
  )
}

export default React.memo(AddForm)
