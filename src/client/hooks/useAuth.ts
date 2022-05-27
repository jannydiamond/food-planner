import { selectors } from 'client/Redux/store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useAuth = () => {
  const token = useSelector(selectors.authentication.selectToken)

  return useMemo(() => ({ token }), [token])
}
