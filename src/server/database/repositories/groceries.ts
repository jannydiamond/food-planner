import { ColumnSet, IDatabase, IMain } from 'pg-promise'
import { IResult } from 'pg-promise/typescript/pg-subset'
import { Grocery } from '../../../model/types'
import { groceries as sql } from '../sql'

export class GroceriesRepository {
  /**
   * Column set used for inserts
   */
  private insertColumnSet: ColumnSet

  /**
   * Column set used for updates
   */
  private updateColumnSet: ColumnSet

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
          name: 'grocery_name',
        },
        {
          name: 'base_amount',
          def: null,
        },
        {
          name: 'base_unit',
          def: null,
        },
        {
          name: 'alt_amount',
          def: null,
        },
        {
          name: 'alt_unit',
          def: null,
        },
        {
          name: 'created_by',
        },
      ],
      {
        table: 'grocery',
      }
    )

    this.updateColumnSet = new pgp.helpers.ColumnSet(
      [
        '?id',
        {
          name: 'grocery_name',
          skip: (col) => !col.exists,
        },
        {
          name: 'base_amount',
          skip: (col) => !col.exists,
        },
        {
          name: 'base_unit',
          skip: (col) => !col.exists,
        },
        {
          name: 'alt_amount',
          skip: (col) => !col.exists,
        },
        {
          name: 'alt_unit',
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
          name: 'updated_at',
          init: () => new Date(),
        },
      ],
      {
        table: 'grocery',
      }
    )
  }

  // Removes all records from the table
  async empty(): Promise<null> {
    return this.db.none(sql.empty)
  }

  // Adds a new grocery, and returns the new object
  async add(grocery: Omit<Grocery, 'id' | 'updated_at'>): Promise<Grocery> {
    const returnValue = this.pgp.as.format(' RETURNING *')

    const query =
      this.pgp.helpers.insert(grocery, this.insertColumnSet) + returnValue
    return this.db.one(query, grocery)
  }

  async update(grocery: Grocery): Promise<null> {
    const condition = this.pgp.as.format(' WHERE id = $<id>', {
      id: grocery.id,
    })

    const query =
      this.pgp.helpers.update(grocery, this.updateColumnSet) + condition

    return this.db.none(query)
  }

  // Tries to delete an grocery by id, and returns the number of records deleted
  async remove(id: string): Promise<number> {
    return this.db.result(
      sql.remove,
      { id },
      (result: IResult) => result.rowCount
    )
  }

  // Tries to find an grocery by id
  async findById(id: string): Promise<Grocery | null> {
    return this.db.oneOrNone(sql.findById, { id })
  }

  // Tries to find an grocery by name
  async findByName(grocery_name: string): Promise<Grocery | null> {
    return this.db.oneOrNone(sql.findByName, { grocery_name })
  }

  // Returns all grocery records
  async selectAll(): Promise<Grocery[]> {
    return this.db.any(sql.selectAll)
  }
}
