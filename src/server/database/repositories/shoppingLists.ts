import { ColumnSet, IDatabase, IMain } from 'pg-promise'
import { IResult } from 'pg-promise/typescript/pg-subset'
import { ShoppingList, ShoppingListHasGrocery } from '../../../model/types'
import { shoppingLists as sql } from '../sql'

export class ShoppingListsRepository {
  /**
   * Column set used for inserts
   */
  private insertColumnSet: ColumnSet

  /**
   * Column set used for updates
   */
  private updateColumnSet: ColumnSet

  /**
   * Column set used for inserts
   */
  private insertGroceryColumnSet: ColumnSet

  /**
   * Column set used for updates
   */
  private updateGroceryColumnSet: ColumnSet

  /**
   * @param db
   * Automated database connection context/interface.
   *
   * @param pgp
   * Library's root, if ever needed, like to access 'helpers'
   * or other namespaces available from the root.
   */
  constructor(private db: IDatabase<any>, private pgp: IMain) {
    /*
        If your repository needs to use helpers like ColumnSet,
        you should create it conditionally, inside the constructor,
        i.e. only once, as a singleton.
      */
    this.insertColumnSet = new pgp.helpers.ColumnSet(
      [
        {
          name: 'shopping_list_name',
        },
        {
          name: 'created_by',
        },
        {
          name: 'updated_by',
        },
        {
          name: 'household_id',
        },
      ],
      {
        table: 'shopping_list',
      }
    )

    this.updateColumnSet = new pgp.helpers.ColumnSet(
      [
        '?id',
        {
          name: 'shopping_list_name',
          skip: (col) => !col.exists,
        },
        {
          name: 'created_by',
          skip: true,
        },
        {
          name: 'created_at',
          skip: true,
        },
        {
          name: 'updated_by',
          skip: (col) => !col.exists,
        },
        {
          name: 'updated_at',
          init: () => new Date(),
        },
        {
          name: 'household_id',
          skip: true,
        },
      ],
      {
        table: 'shopping_list',
      }
    )

    this.insertGroceryColumnSet = new pgp.helpers.ColumnSet(
      [
        {
          name: 'shopping_list_id',
        },
        {
          name: 'grocery_id',
        },
        {
          name: 'amount',
          def: null,
        },
        {
          name: 'unit',
          def: null,
        },
        {
          name: 'in_basket',
          def: false,
        },
        {
          name: 'added_by',
        },
        {
          name: 'updated_by',
        },
      ],
      {
        table: 'shopping_list_has_grocery',
      }
    )

    this.updateGroceryColumnSet = new pgp.helpers.ColumnSet(
      [
        '?shopping_list_id',
        '?grocery_id',
        {
          name: 'amount',
          skip: (col) => !col.exists,
        },
        {
          name: 'unit',
          skip: (col) => !col.exists,
        },
        {
          name: 'in_basket',
          skip: (col) => !col.exists,
        },
        {
          name: 'added_by',
          skip: true,
        },
        {
          name: 'added_at',
          skip: true,
        },
        {
          name: 'updated_by',
          skip: (col) => !col.exists,
        },
        {
          name: 'updated_at',
          init: () => new Date(),
        },
      ],
      {
        table: 'shopping_list_has_grocery',
      }
    )
  }

  // Removes all records from the table
  async empty(): Promise<null> {
    return this.db.none(sql.empty)
  }

  // Adds a new shopping list, and returns the new object
  async add(
    shoppingList: Omit<ShoppingList, 'id' | 'created_at' | 'updated_at'>
  ): Promise<ShoppingList> {
    const returnValue = this.pgp.as.format(' RETURNING *')

    const query =
      this.pgp.helpers.insert(shoppingList, this.insertColumnSet) + returnValue
    return this.db.one(query, shoppingList)
  }

  async addGroceryToShoppingList(
    item: Omit<ShoppingListHasGrocery, 'updated_at'>
  ): Promise<ShoppingListHasGrocery> {
    const returnValue = this.pgp.as.format(' RETURNING *')

    const query =
      this.pgp.helpers.insert(item, this.insertGroceryColumnSet) + returnValue
    return this.db.one(query, item)
  }

  async update(shoppingList: ShoppingList): Promise<null> {
    const condition = this.pgp.as.format(' WHERE id = $<id>', {
      id: shoppingList.id,
    })

    const query =
      this.pgp.helpers.update(shoppingList, this.updateColumnSet) + condition

    return this.db.none(query)
  }

  async updateGroceryInShoppingList(
    item: ShoppingListHasGrocery
  ): Promise<null> {
    const condition = this.pgp.as.format(
      ' WHERE shopping_list_id = $<shopping_list_id> AND grocery_id = $<grocery_id>',
      {
        shopping_list_id: item.shopping_list_id,
        grocery_id: item.grocery_id,
      }
    )

    const query =
      this.pgp.helpers.update(item, this.updateGroceryColumnSet) + condition

    return this.db.none(query)
  }

  // Tries to delete an shopping list by id, and returns the number of records deleted
  async remove(id: string): Promise<number> {
    return this.db.result(
      sql.remove,
      { id },
      (result: IResult) => result.rowCount
    )
  }

  // Tries to delete a grocery from shopping list by id, and returns the number of records deleted
  async removeGroceryFromShoppingList(
    shopping_list_id: string,
    grocery_id: string
  ): Promise<number> {
    return this.db.result(
      sql.removeGroceryFromShoppingList,
      { shopping_list_id, grocery_id },
      (result: IResult) => result.rowCount
    )
  }

  // Tries to find an shopping list by id
  async findById(id: string): Promise<ShoppingList | null> {
    return this.db.oneOrNone(sql.findById, { id })
  }

  async findShoppingListHasGroceryItemById(
    shopping_list_id: string,
    grocery_id: string
  ): Promise<ShoppingListHasGrocery | null> {
    return this.db.oneOrNone(sql.findShoppingListHasGroceryItemById, {
      shopping_list_id,
      grocery_id,
    })
  }

  // Returns all shopping list records of an household
  async selectAll(household_id: string): Promise<ShoppingList[]> {
    return this.db.any(sql.selectAll, { household_id })
  }

  async selectAllGroceries(
    shopping_list_id: string
  ): Promise<ShoppingListHasGrocery[]> {
    return this.db.any(sql.selectAllGroceries, { shopping_list_id })
  }
}
