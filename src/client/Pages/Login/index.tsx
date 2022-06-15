import { usePostLoginMutation } from 'client/Redux/api/authentication'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'

type LoginFormData = {
  username: string
  password: string
}

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  // @ts-ignore
  const from = location.state?.from?.pathname || '/'

  const [loginUser, { error, isLoading }] = usePostLoginMutation()

  const handleLogin = useCallback(
    async (data: LoginFormData) => {
      loginUser({
        username: data.username,
        password: data.password,
      }).then((data) => {
        if ('error' in data) return
        navigate(from, { replace: true })
      })
    },
    [from, loginUser, navigate]
  )

  return (
    <>
      <h1>Login</h1>
      <p>Errors:</p>
      {error && 'status' in error ? (
        <div>
          <div>An error has occurred:</div>
          <div>{'data' in error && JSON.stringify(error.data)}</div>
        </div>
      ) : (
        <div>{error?.message}</div>
      )}
      <p>isLoding: {isLoading}</p>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset>
          <label htmlFor="username">
            <p>Username</p>
            <input
              type="text"
              {...register('username', { required: 'Username is required!' })}
            />
          </label>
          {errors.username && <p>{errors.username.message}</p>}

          <label htmlFor="password">
            <p>Password</p>
            <input
              type="password"
              autoComplete="new-password"
              {...register('password', {
                required: 'Password is required!',
              })}
            />
          </label>
          {errors.password && <p>{errors.password.message}</p>}
          <input type="submit" />
        </fieldset>
      </form>

      <Link to={'/register'}>Register</Link>
    </>
  )
}

export default React.memo(Login)
