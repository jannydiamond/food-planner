import { IDatabase, IMain } from 'pg-promise'
import { IResult } from 'pg-promise/typescript/pg-subset'
import { Grocery } from '../models'
import { groceries as sql } from '../sql'

export class GroceriesRepository {
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
  }

  // Removes all records from the table
  async empty(): Promise<null> {
    return this.db.none(sql.empty)
  }

  // Adds a new grocery, and returns the new object
  async add(grocery: Grocery): Promise<Grocery> {
    return this.db.one(sql.add, grocery)
  }

  //TODO Update

  // Tries to delete an grocery by id, and returns the number of records deleted
  async remove(id: number): Promise<number> {
    return this.db.result(sql.remove, id, (result: IResult) => result.rowCount)
  }

  // Tries to find an grocery by id
  async findById(id: number): Promise<Grocery | null> {
    return this.db.oneOrNone(sql.findById, { id })
  }

  // Returns all grocery records
  async selectAll(): Promise<Grocery[]> {
    return this.db.any(sql.selectAll)
  }
}
