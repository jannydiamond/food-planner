export interface Ingredient {
  id: number
  name: string
  inventory_amount?: number
  inventory_unit_id?: number
}

export interface Unit {
  id: number
  name: string
}
