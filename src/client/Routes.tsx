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
              <Outlet />
            </>
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Navigate to="/households" replace />} />
        <Route path="/households" element={<Households />} />
        <Route path="/households/:householdId" element={<HouseholdDetails />} />
      </Route>
    </ReactRouterRoutes>
  )
}

export default React.memo(Routes)
