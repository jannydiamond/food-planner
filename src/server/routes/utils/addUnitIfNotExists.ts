import { db } from '../../database'

const addUnitIfNotExists = async (unit_name: string, created_by: string) => {
  try {
    const unit = await db.units.findByName(unit_name)

    if (!unit)
      return await db.units.add({
        unit_name,
        created_by,
      })
  } catch (error: any) {
    console.log(error)
  }
}

export default addUnitIfNotExists
