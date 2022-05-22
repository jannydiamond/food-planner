
/**
 * AUTO-GENERATED FILE @ Sun, 22 May 2022 08:34:24 GMT - DO NOT EDIT!
 *
 * This file was automatically generated by schemats v.1.0.4
 * $ schemats generate postgres://username:password@localhost:5432/foodplanner -C -s public
 *
 */



export interface InventoryTag { 
  inventoryId: string
  tagId: number
  addedBy: string
  addedAt?: Date | null
  updatedAt: Date 
}

export interface ShoppingListHasGrocery { 
  shoppingListId: string
  groceryId: string
  amount?: number | null
  unitId?: number | null
  addedBy: string
  addedAt?: Date | null
  updatedAt: Date 
}

export interface FpUser { 
  id: string
  userName: string
  userPassword: string
  createdAt?: Date | null
  updatedAt: Date 
}

export interface Recipe { 
  id: string
  recipeName: string
  steps?: unknown | null
  createdBy: string
  createdAt?: Date | null
  updatedAt: Date
  householdId: string 
}

export interface RecipeHasGrocery { 
  groceryId: string
  recipeId: string
  amount?: number | null
  unitId?: number | null
  createdAt?: Date | null
  updatedAt: Date 
}

export interface HouseholdHasUser { 
  userId: string
  householdId: string
  addedAt?: Date | null
  updatedAt: Date 
}

export interface Inventory { 
  id: string
  inventoryName: string
  createdBy: string
  createdAt?: Date | null
  updatedAt: Date
  householdId: string 
}

export interface RecipeTag { 
  recipeId: string
  tagId: number
  addedBy: string
  addedAt?: Date | null
  updatedAt: Date 
}

export interface Grocery { 
  id: string
  groceryName: string
  baseAmount?: number | null
  baseUnitId?: number | null
  altAmount?: number | null
  altUnitId?: number | null
  createdBy: string
  createdAt?: Date | null
  updatedAt: Date 
}

export interface ShoppingList { 
  id: string
  shoppingListName: string
  createdBy: string
  createdAt?: Date | null
  updatedAt: Date
  householdId: string 
}

export interface GroceryTag { 
  groceryId: string
  tagId: number
  addedBy: string
  addedAt?: Date | null
  updatedAt: Date 
}

export interface Household { 
  id: string
  householdName: string
  createdBy: string
  createdAt?: Date | null
  updatedAt: Date 
}

export interface InventoryHasGrocery { 
  inventoryId: string
  groceryId: string
  amount?: number | null
  unitId?: number | null
  bestbefore?: Date | null
  addedBy: string
  addedAt?: Date | null
  updatedAt: Date 
}

export interface ShoppingListTag { 
  shoppingListId: string
  tagId: number
  addedBy: string
  addedAt?: Date | null
  updatedAt: Date 
}

export interface Unit { 
  id: number
  unitName: string
  createdBy?: string | null
  createdAt?: Date | null
  updatedAt: Date 
}

export interface Tag { 
  id: number
  tagName: string
  createdBy: string
  createdAt?: Date | null
  updatedAt: Date
  householdId: string 
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