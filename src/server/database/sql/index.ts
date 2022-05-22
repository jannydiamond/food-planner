import { QueryFile, IQueryFileOptions } from 'pg-promise'
import { join } from 'path'

// Helper for linking to external query files:
const sql = (file: string): QueryFile => {
  const fullPath: string = join(__dirname, file) // generating full path

  const options: IQueryFileOptions = {
    minify: true,
  }

  const queryFile: QueryFile = new QueryFile(fullPath, options)

  if (queryFile.error) {
    console.error(queryFile.error)
  }

  return queryFile
}

export const groceries = {
  empty: sql('groceries/empty.sql'),
  add: sql('groceries/add.sql'),
  remove: sql('groceries/remove.sql'),
  selectAll: sql('groceries/selectAll.sql'),
  findById: sql('groceries/findById.sql'),
}

export const units = {
  empty: sql('units/empty.sql'),
  add: sql('units/add.sql'),
  remove: sql('units/remove.sql'),
  selectAll: sql('units/selectAll.sql'),
  findById: sql('units/findById.sql'),
}
