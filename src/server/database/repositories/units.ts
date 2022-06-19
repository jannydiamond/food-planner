import { ColumnSet, IDatabase, IMain } from 'pg-promise'
import { IResult } from 'pg-promise/typescript/pg-subset'
import { Unit } from '../../../model/types'
import { units as sql } from '../sql'

export class UnitsRepository {
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

    this.updateColumnSet = new pgp.helpers.ColumnSet([
      '?id',
      {
        name: 'unit_name',
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
    ])
  }

  // Removes all records from the table
  async empty(): Promise<null> {
    return this.db.none(sql.empty)
  }

  // Adds a new unit, and returns the new object
  async add(unit: Pick<Unit, 'unit_name' | 'created_by'>): Promise<Unit> {
    return this.db.one(sql.add, unit)
  }

  async update(unit: Unit): Promise<null> {
    const condition = this.pgp.as.format(' WHERE id = $<id>', {
      id: unit.id,
    })

    const query =
      this.pgp.helpers.update(unit, this.updateColumnSet) + condition

    return this.db.none(query)
  }

  // Tries to delete a unit by id, and returns the number of records deleted
  async remove(id: number): Promise<number> {
    return this.db.result(
      sql.remove,
      { id },
      (result: IResult) => result.rowCount
    )
  }

  // Tries to find a unit by id
  async findById(id: number): Promise<Unit | null> {
    return this.db.oneOrNone(sql.findById, { id })
  }

  // Tries to find a unit by name
  async findByName(unit_name: string): Promise<Unit | null> {
    return this.db.oneOrNone(sql.findByName, { unit_name })
  }

  // Returns all unit records
  async selectAll(): Promise<Unit[]> {
    return this.db.any(sql.selectAll)
  }
}
