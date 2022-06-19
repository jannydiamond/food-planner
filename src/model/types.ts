
/**
 * AUTO-GENERATED FILE @ Sun, 19 Jun 2022 13:35:48 GMT - DO NOT EDIT!
 *
 * This file was automatically generated by schemats v.1.0.4
 * $ schemats generate postgres://username:password@localhost:5432/foodplanner -s public
 *
 */



export interface InventoryTag { 
  inventory_id: string
  tag_id: number
  added_by?: string | null
  added_at?: Date | null
  updated_by?: string | null
  updated_at: Date 
}

export interface ShoppingListHasGrocery { 
  shopping_list_id: string
  grocery_id: string
  amount?: number | null
  unit?: string | null
  added_by?: string | null
  added_at?: Date | null
  updated_by?: string | null
  updated_at: Date 
}

export interface FpUser { 
  id: string
  username: string
  password: string
  created_at?: Date | null
  updated_at: Date 
}

export interface Recipe { 
  id: string
  recipe_name: string
  steps?: unknown | null
  created_by?: string | null
  created_at?: Date | null
  updated_by?: string | null
  updated_at: Date 
}

export interface RecipeHasGrocery { 
  grocery_id: string
  recipe_id: string
  amount?: number | null
  unit?: string | null
  added_by?: string | null
  added_at?: Date | null
  updated_by?: string | null
  updated_at: Date 
}

export interface HouseholdHasUser { 
  user_id: string
  household_id: string
  added_by?: string | null
  added_at?: Date | null
  updated_by?: string | null
  updated_at: Date 
}

export interface Inventory { 
  id: string
  inventory_name: string
  created_by?: string | null
  created_at?: Date | null
  updated_by?: string | null
  updated_at: Date
  household_id: string 
}

export interface RecipeTag { 
  recipe_id: string
  tag_id: number
  added_by?: string | null
  added_at?: Date | null
  updated_by?: string | null
  updated_at: Date 
}

export interface Grocery { 
  id: string
  grocery_name: string
  base_amount?: number | null
  base_unit?: string | null
  alt_amount?: number | null
  alt_unit?: string | null
  created_by?: string | null
  created_at?: Date | null
  updated_by?: string | null
  updated_at: Date 
}

export interface ShoppingList { 
  id: string
  shopping_list_name: string
  created_by?: string | null
  created_at?: Date | null
  updated_by?: string | null
  updated_at: Date
  household_id: string 
}

export interface GroceryTag { 
  grocery_id: string
  tag_id: number
  added_by?: string | null
  added_at?: Date | null
  updated_by?: string | null
  updated_at: Date 
}

export interface Household { 
  id: string
  household_name: string
  created_by?: string | null
  created_at?: Date | null
  updated_by?: string | null
  updated_at: Date 
}

export interface InventoryHasGrocery { 
  inventory_id: string
  grocery_id: string
  amount?: number | null
  unit?: string | null
  bestbefore?: Date | null
  added_by?: string | null
  added_at?: Date | null
  updated_by?: string | null
  updated_at: Date 
}

export interface ShoppingListTag { 
  shopping_list_id: string
  tag_id: number
  added_by?: string | null
  added_at?: Date | null
  updated_by?: string | null
  updated_at: Date 
}

export interface Unit { 
  id: number
  unit_name: string
  created_by?: string | null
  created_at?: Date | null
  updated_by?: string | null
  updated_at: Date 
}

export interface Tag { 
  id: number
  tag_name: string
  created_by?: string | null
  created_at?: Date | null
  updated_by?: string | null
  updated_at: Date 
}

export interface Tables {
  inventory_tag: InventoryTag,
  shopping_list_has_grocery: ShoppingListHasGrocery,
  fp_user: FpUser,
  recipe: Recipe,
  recipe_has_grocery: RecipeHasGrocery,
  household_has_user: HouseholdHasUser,
  inventory: Inventory,
  recipe_tag: RecipeTag,
  grocery: Grocery,
  shopping_list: ShoppingList,
  grocery_tag: GroceryTag,
  household: Household,
  inventory_has_grocery: InventoryHasGrocery,
  shopping_list_tag: ShoppingListTag,
  unit: Unit,
  tag: Tag
}