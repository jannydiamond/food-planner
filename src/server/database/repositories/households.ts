import { ColumnSet, IDatabase, IMain } from 'pg-promise'
import { IResult } from 'pg-promise/typescript/pg-subset'
import { FpUser, Household, HouseholdHasUser } from '../../../model/types'
import { households as sql } from '../sql'

export class HouseholdsRepository {
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
    this.updateColumnSet = new pgp.helpers.ColumnSet(
      [
        '?id',
        {
          name: 'household_name',
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
        table: 'household',
      }
    )
  }

  // Adds a new household, and returns the new object
  async add(
    household: Pick<Household, 'household_name' | 'created_by'>
  ): Promise<Household> {
    return this.db.one(sql.add, household)
  }

  // Adds a user to an household,
  async addUserToHousehold(
    household_id: string,
    user_id: string
  ): Promise<HouseholdHasUser> {
    return this.db.one(sql.addUserToHousehold, { household_id, user_id })
  }

  async update(
    household: Pick<Household, 'id' | 'household_name'>
  ): Promise<null> {
    const condition = this.pgp.as.format(' WHERE id = $<id>', {
      id: household.id,
    })

    const query =
      this.pgp.helpers.update(household, this.updateColumnSet) + condition

    return this.db.none(query)
  }

  // Tries to delete an household by id, and returns the number of records deleted
  async remove(id: string): Promise<number> {
    return this.db.result(
      sql.remove,
      { id },
      (result: IResult) => result.rowCount
    )
  }

  // Tries to delete a user from household by id, and returns the number of records deleted
  async removeUserFromHousehold(
    household_id: string,
    user_id: string
  ): Promise<number> {
    return this.db.result(
      sql.removeUserFromHousehold,
      { household_id, user_id },
      (result: IResult) => result.rowCount
    )
  }

  // Returns all household records which a user created
  async selectAllCreatedByUsername(username: string): Promise<Household[]> {
    return this.db.any(sql.selectAllCreatedByUsername, { username })
  }

  // Returns all household records of a user (created and part of)
  async selectAllHouseholdsOfUser(id: string): Promise<Household[]> {
    return this.db.any(sql.selectAllHouseholdsOfUser, { user_id: id })
  }

  // Returns all users of an household
  async selectAllUsersOfHousehold(household_id: string): Promise<FpUser[]> {
    return this.db.any(sql.selectAllUsersOfHousehold, { household_id })
  }

  // Tries to find household by id
  async findById(id: string): Promise<Household | null> {
    return this.db.oneOrNone(sql.findById, { id })
  }
}
