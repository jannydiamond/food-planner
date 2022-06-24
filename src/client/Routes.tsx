import React from 'react'
import {
  Navigate,
  Outlet,
  Route,
  Routes as ReactRouterRoutes,
} from 'react-router-dom'
import Households from './Pages/Households'
import Login from './Pages/Login'
import Registration from './Pages/Registration'
import PrivateRoute from './App/PrivateRoute'
import HouseholdDetails from './Pages/HouseholdDetails'
import Header from './components/Header'
import Groceries from './Pages/Groceries'
import GroceryDetails from './Pages/GroceryDetails'
import Settings from './Pages/Settings'
import Units from './Pages/Settings/Units'
import Inventories from './Pages/Inventories'
import InventoryDetails from './Pages/InventoryDetails'
import ShoppingLists from './Pages/ShoppingLists'
import ShoppingListDetails from './Pages/ShoppingListDetails'
import HeaderHouseholds from './components/HeaderHouseholds'
import Main from './components/__styled__/Main'

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      <Route
        element={
          <PrivateRoute>
            <>
              <Header />
              <Main>
                <Outlet />
              </Main>
            </>
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Navigate to="/households" replace />} />
        <Route path="/households" element={<Households />} />

        <Route
          path="/households/:householdId"
          element={
            <>
              <HeaderHouseholds />
              <Outlet />
            </>
          }
        >
          <Route path="details" element={<HouseholdDetails />} />
          <Route path="inventories" element={<Inventories />} />
          <Route
            path="inventories/:inventoryId"
            element={<InventoryDetails />}
          />
          <Route path="shopping-lists" element={<ShoppingLists />} />
          <Route
            path="shopping-lists/:shoppingListId"
            element={<ShoppingListDetails />}
          />
        </Route>

        <Route path="/groceries" element={<Groceries />} />
        <Route path="/groceries/:groceryId" element={<GroceryDetails />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/units" element={<Units />} />
      </Route>
    </ReactRouterRoutes>
  )
}

export default React.memo(Routes)
