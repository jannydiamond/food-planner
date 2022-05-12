import dotenv from 'dotenv'

dotenv.config()

// Proper way to initialize and share the Database object

// Loading and initializing the library:
const pgp = require('pg-promise')({
  // Initialization Options
})

// Preparing the connection details:
const connectionDetails = {
  host: 'localhost',
  port: 5432,
  database: `${process.env.POSTGRES_DB}`,
  user: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,

  // "types" - in case you want to set custom type parsers on the pool level
}

// Creating a new database instance from the connection details:
const db = pgp(connectionDetails)

export default db
