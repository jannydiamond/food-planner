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

export const ingredients = {
  empty: sql('ingredients/empty.sql'),
  drop: sql('ingredients/drop.sql'),
  add: sql('ingredients/add.sql'),
  remove: sql('ingredients/remove.sql'),
  selectAll: sql('ingredients/selectAll.sql'),
  findById: sql('ingredients/findById.sql'),
}

export const units = {
  empty: sql('units/empty.sql'),
  drop: sql('units/drop.sql'),
  add: sql('units/add.sql'),
  remove: sql('units/remove.sql'),
  selectAll: sql('units/selectAll.sql'),
  findById: sql('units/findById.sql'),
}
