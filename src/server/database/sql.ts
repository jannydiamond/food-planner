import { QueryFile } from 'pg-promise'
import { join } from 'path'

// Helper for linking to external query files:
const sql = (file: any) => {
  const fullPath = join(__dirname, file) // generating full path
  return new QueryFile(fullPath, { minify: true })
}

export default {
  ingredients: {
    listAll: sql('ingredients/listAll.sql'),
    byId: sql('ingredients/byId.sql'),
  },
}
