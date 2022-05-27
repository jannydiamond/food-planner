import { actions } from 'client/Redux/store'
import { clearAuthToken } from 'client/utils/localStorage'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = useCallback(() => {
    dispatch(actions.authentication.reset())
    clearAuthToken()
    navigate('/login')
  }, [navigate, dispatch])

  return <button onClick={logout}>Logout</button>
}

export default React.memo(LogoutButton)
