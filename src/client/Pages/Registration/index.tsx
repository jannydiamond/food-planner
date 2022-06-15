import { usePostRegistrationMutation } from 'client/Redux/api/authentication'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

type RegistrationFormData = {
  username: string
  password: string
  repeatPassword: string
}

const Registration = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    getFieldState,
    trigger,
  } = useForm<RegistrationFormData>()

  const [registerUser, { error, isLoading }] = usePostRegistrationMutation()

  const handleRegistration = useCallback(
    async (data: RegistrationFormData) => {
      registerUser({
        username: data.username,
        password: data.password,
      }).then((data) => {
        if ('error' in data) return
        navigate('/login', { replace: true })
      })
    },
    [navigate, registerUser]
  )

  return (
    <>
      <h1>Registration</h1>
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
      <form onSubmit={handleSubmit(handleRegistration)}>
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
                onChange: () => {
                  const formValues = getValues()
                  getFieldState('password').isTouched && trigger(['password'])
                  formValues.repeatPassword && trigger(['repeatPassword'])
                },
                onBlur: () => {
                  const formValues = getValues()
                  trigger(['password'])
                  formValues.repeatPassword && trigger(['repeatPassword'])
                },
              })}
            />
          </label>
          {errors.password && <p>{errors.password.message}</p>}

          <label htmlFor="repeatPassword">
            <p>Repeat password</p>

            <input
              type="password"
              autoComplete="new-password"
              {...register('repeatPassword', {
                required: 'Repeat password is required!',
                validate: (value: string) => {
                  const formValues = getValues()
                  return (
                    value === formValues.password || "Passwords don't match"
                  )
                },
                onChange: () => {
                  const formValues = getValues()
                  getFieldState('repeatPassword') && trigger(['repeatPassword'])
                  formValues.password && trigger(['password'])
                },
                onBlur: () => {
                  const formValues = getValues()
                  trigger(['repeatPassword'])
                  formValues.password && trigger(['password'])
                },
              })}
            />
          </label>
          {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
          <input type="submit" />
        </fieldset>
      </form>

      <Link to={'/login'}>Login</Link>
    </>
  )
}

export default React.memo(Registration)
