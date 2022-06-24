import { actions } from 'client/Redux/store'
import { clearAuthToken } from 'client/utils/localStorage'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ButtonWrapper from './__styled__/ButtonWrapper'

const LogoutButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = useCallback(() => {
    dispatch(actions.authentication.reset())
    clearAuthToken()
    navigate('/login')
  }, [navigate, dispatch])

  return <ButtonWrapper onClick={logout}>Logout</ButtonWrapper>
}

export default React.memo(LogoutButton)
