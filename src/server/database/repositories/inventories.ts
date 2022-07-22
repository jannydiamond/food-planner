import { ColumnSet, IDatabase, IMain } from 'pg-promise'
import { IResult } from 'pg-promise/typescript/pg-subset'
import { Inventory, InventoryHasGrocery } from '../../../model/types'
import { inventories as sql } from '../sql'

export class InventoriesRepository {
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
          name: 'inventory_name',
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
        table: 'inventory',
      }
    )

    this.updateColumnSet = new pgp.helpers.ColumnSet(
      [
        '?id',
        {
          name: 'inventory_name',
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
        table: 'inventory',
      }
    )

    this.insertGroceryColumnSet = new pgp.helpers.ColumnSet(
      [
        {
          name: 'inventory_id',
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
          name: 'best_before',
          def: null,
        },
        {
          name: 'added_by',
        },
        {
          name: 'updated_by',
        },
      ],
      {
        table: 'inventory_has_grocery',
      }
    )

    this.updateGroceryColumnSet = new pgp.helpers.ColumnSet(
      [
        '?inventory_id',
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
          name: 'best_before',
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
        table: 'inventory_has_grocery',
      }
    )
  }

  // Removes all records from the table
  async empty(): Promise<null> {
    return this.db.none(sql.empty)
  }

  // Adds a new inventory, and returns the new object
  async add(
    inventory: Omit<Inventory, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Inventory> {
    const returnValue = this.pgp.as.format(' RETURNING *')

    const query =
      this.pgp.helpers.insert(inventory, this.insertColumnSet) + returnValue
    return this.db.one(query, inventory)
  }

  async addGroceryToInventory(
    item: Omit<InventoryHasGrocery, 'updated_at'>
  ): Promise<InventoryHasGrocery> {
    const returnValue = this.pgp.as.format(' RETURNING *')

    const query =
      this.pgp.helpers.insert(item, this.insertGroceryColumnSet) + returnValue
    return this.db.one(query, item)
  }

  async update(inventory: Inventory): Promise<null> {
    const condition = this.pgp.as.format(' WHERE id = $<id>', {
      id: inventory.id,
    })

    const query =
      this.pgp.helpers.update(inventory, this.updateColumnSet) + condition

    return this.db.none(query)
  }

  async updateGroceryInInventory(item: InventoryHasGrocery): Promise<null> {
    const condition = this.pgp.as.format(
      ' WHERE inventory_id = $<inventory_id> AND grocery_id = $<grocery_id>',
      {
        inventory_id: item.inventory_id,
        grocery_id: item.grocery_id,
      }
    )

    const query =
      this.pgp.helpers.update(item, this.updateGroceryColumnSet) + condition

    return this.db.none(query)
  }

  // Tries to delete an inventory by id, and returns the number of records deleted
  async remove(id: string): Promise<number> {
    return this.db.result(
      sql.remove,
      { id },
      (result: IResult) => result.rowCount
    )
  }

  // Tries to delete a grocery from inventory by id, and returns the number of records deleted
  async removeGroceryFromInventory(
    inventory_id: string,
    grocery_id: string
  ): Promise<number> {
    return this.db.result(
      sql.removeGroceryFromInventory,
      { inventory_id, grocery_id },
      (result: IResult) => result.rowCount
    )
  }

  // Tries to find an inventory by id
  async findById(id: string): Promise<Inventory | null> {
    return this.db.oneOrNone(sql.findById, { id })
  }

  async findInventoryHasGroceryItemById(
    inventory_id: string,
    grocery_id: string
  ): Promise<InventoryHasGrocery | null> {
    return this.db.oneOrNone(sql.findInventoryHasGroceryItemById, {
      inventory_id,
      grocery_id,
    })
  }

  // Returns all inventory records of an household
  async selectAll(household_id: string): Promise<Inventory[]> {
    return this.db.any(sql.selectAll, { household_id })
  }

  async selectAllGroceries(
    inventory_id: string
  ): Promise<InventoryHasGrocery[]> {
    return this.db.any(sql.selectAllGroceries, { inventory_id })
  }
}
