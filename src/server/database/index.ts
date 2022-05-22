import dotenv from 'dotenv'
import promise from 'bluebird'
import pgPromise, { IInitOptions, IDatabase, IMain } from 'pg-promise'
import {
  IExtensions,
  FpUsersRepository,
  GroceriesRepository,
  UnitsRepository,
} from './repositories'
import { Diagnostics } from './diagnostics'

dotenv.config()

// Proper way to initialize and share the Database object
type ExtendedProtocol = IDatabase<IExtensions> & IExtensions

// pg-promise initialization options:
const initOptions: IInitOptions<IExtensions> = {
  // Using a custom promise library, instead of the default ES6 Promise:
  promiseLib: promise,

  // Extending the database protocol with our custom repositories;
  // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
  extend(obj: ExtendedProtocol, dc: any) {
    // Database Context (dc) is mainly needed for extending multiple databases with different access API.

    // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
    // which should be as fast as possible.
    obj.fpUsers = new FpUsersRepository(obj, pgp)
    obj.groceries = new GroceriesRepository(obj, pgp)
    obj.units = new UnitsRepository(obj, pgp)
  },
}

// Loading and initializing the library:
const pgp: IMain = pgPromise(initOptions)

// Preparing the connection details:
const connectionDetails = {
  host: 'db',
  port: 5432,
  database: `${process.env.POSTGRES_DB}`,
  user: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
}

// Creating a new database instance from the connection details:
const db: ExtendedProtocol = pgp(connectionDetails)

// Initializing optional diagnostics:
Diagnostics.init(initOptions)

export { db, pgp }
