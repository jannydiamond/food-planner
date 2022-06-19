import jwt_decode from 'jwt-decode'

const getCurrentUser = (
  token: any
): {
  id: string
  username: string
} => {
  const decodedToken: any = jwt_decode(token)

  return decodedToken?.user
}

export default getCurrentUser
