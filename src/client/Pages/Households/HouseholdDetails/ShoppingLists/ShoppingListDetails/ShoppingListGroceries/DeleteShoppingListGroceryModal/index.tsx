import ModalBodyWrapper from 'client/hooks/useModal/ModalBodyWrapper'
import ModalFooterWrapper from 'client/hooks/useModal/ModalFooterWrapper'
import { useGetGroceriesQuery } from 'client/Redux/api/groceries'
import {
  useDeleteGroceryFromShoppingListMutation,
  useGetShoppingListsQuery,
} from 'client/Redux/api/shoppingLists'
import { Modal } from 'client/types'
import { Grocery, ShoppingList, ShoppingListHasGrocery } from 'model/types'
import React, { useCallback } from 'react'

type Props = {
  householdId: string
  shoppingListGrocery: ShoppingListHasGrocery
  modal: Modal
}

const DeleteShoppingListGroceryModal = ({
  householdId,
  shoppingListGrocery,
  modal,
}: Props) => {
  const { data: groceries } = useGetGroceriesQuery(undefined)

  const { data: shoppingLists } = useGetShoppingListsQuery(householdId)

  const [removeGroceryFromShoppingList] =
    useDeleteGroceryFromShoppingListMutation()

  const handleDeleteShoppingListGrocery = useCallback(async () => {
    removeGroceryFromShoppingList({
      grocery_id: shoppingListGrocery.grocery_id,
      shopping_list_id: shoppingListGrocery.shopping_list_id,
      household_id: householdId,
    })

    modal.hide()
  }, [
    removeGroceryFromShoppingList,
    shoppingListGrocery.grocery_id,
    shoppingListGrocery.shopping_list_id,
    householdId,
    modal,
  ])
  return (
    <modal.RenderModal
      titleColor="white"
      titleLabel="Delete shopping list grocery"
    >
      <>
        <ModalBodyWrapper hasFooter>
          Do you really want to delete grocery "
          {
            groceries?.find(
              (g: Grocery) => g.id === shoppingListGrocery.grocery_id
            )?.grocery_name
          }
          " from shopping list "
          {
            shoppingLists?.find(
              (i: ShoppingList) => i.id === shoppingListGrocery.shopping_list_id
            )?.shopping_list_name
          }
          "?
        </ModalBodyWrapper>
        <ModalFooterWrapper>
          <button onClick={modal.hide}>Cancel</button>
          <button onClick={handleDeleteShoppingListGrocery}>Delete</button>
        </ModalFooterWrapper>
      </>
    </modal.RenderModal>
  )
}

export default React.memo(DeleteShoppingListGroceryModal)
