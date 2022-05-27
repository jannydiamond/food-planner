import React from 'react'
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom'
import Households from './Pages/Households'
import Login from './Pages/Login'
import Registration from './Pages/Registration'
import PrivateRoute from './App/PrivateRoute'

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Households />
          </PrivateRoute>
        }
      />
    </ReactRouterRoutes>
  )
}

export default React.memo(Routes)
