import { AUTH_TOKEN } from 'client/config'

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN)

export const setAuthToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN, token)
}

export const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN)
}
