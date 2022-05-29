import { IDatabase, IMain } from 'pg-promise'
import { IResult } from 'pg-promise/typescript/pg-subset'
import { FpUser } from '../../../model/types'
import { fpUsers as sql } from '../sql'

export class FpUsersRepository {
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

  // Adds a new fpUser, and returns the new object
  async add(fpUser: Pick<FpUser, 'username' | 'password'>): Promise<FpUser> {
    return this.db.one(sql.add, fpUser)
  }

  //TODO Update

  // Tries to delete a fpUser by id, and returns the number of records deleted
  async remove(id: number): Promise<number> {
    return this.db.result(sql.remove, id, (result: IResult) => result.rowCount)
  }

  // Tries to find a fpUser by id
  async findById(id: number): Promise<FpUser | null> {
    return this.db.oneOrNone(sql.findById, { id })
  }

  // Tries to find a fpUser by name
  async findByName(username: string): Promise<FpUser | null> {
    return this.db.oneOrNone(sql.findByName, { username })
  }

  // Returns all fpUser records
  async selectAll(): Promise<FpUser[]> {
    return this.db.any(sql.selectAll)
  }
}
