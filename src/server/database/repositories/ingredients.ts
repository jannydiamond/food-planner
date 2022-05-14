import { IDatabase, IMain } from 'pg-promise'
import { IResult } from 'pg-promise/typescript/pg-subset'
import { Ingredient } from '../models'
import { ingredients as sql } from '../sql'

export class IngredientsRepository {
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

  // Creates the table
  async create(): Promise<null> {
    return this.db.none(sql.create)
  }

  // Drops the table
  async drop(): Promise<null> {
    return this.db.none(sql.drop)
  }

  // Removes all records from the table
  async empty(): Promise<null> {
    return this.db.none(sql.empty)
  }

  // Adds a new ingredient, and returns the new object
  async add(ingredient: Ingredient): Promise<Ingredient> {
    return this.db.one(sql.add, ingredient)
  }

  //TODO Update

  // Tries to delete an ingredient by id, and returns the number of records deleted
  async remove(id: number): Promise<number> {
    return this.db.result(sql.remove, id, (result: IResult) => result.rowCount)
  }

  // Tries to find an ingredient by id
  async findById(id: number): Promise<Ingredient | null> {
    return this.db.oneOrNone(sql.findById, { id })
  }

  // Returns all ingredient records
  async selectAll(): Promise<Ingredient[]> {
    return this.db.any(sql.selectAll)
  }
}
