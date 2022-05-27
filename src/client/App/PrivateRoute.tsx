import { actions } from 'client/Redux/store'
import { clearAuthToken } from 'client/utils/localStorage'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

type Props = {
  children: React.ReactElement
}

const PrivateRoute = ({ children }: Props) => {
  const dispatch = useDispatch()
  const { token } = useAuth()

  const location = useLocation()

  if (!token) {
    clearAuthToken()
    dispatch(actions.authentication.reset())

    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default React.memo(PrivateRoute)
