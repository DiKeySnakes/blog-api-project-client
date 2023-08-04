import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./userApiSlice"
import { useNavigate } from "react-router-dom"
import useTitle from "../../hooks/useTitle"
// import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
  useTitle("Sign Up")

  const [addNewUser, { isLoading, isSuccess, error }] = useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [validConfirmPassword, setValidConfirmPassword] = useState(false)

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    setValidConfirmPassword(PWD_REGEX.test(confirmPassword))
  }, [confirmPassword])

  useEffect(() => {
    if (isSuccess) {
      setUsername("")
      setPassword("")
      setConfirmPassword("")
      navigate("/auth/login")
    }
  }, [isSuccess, navigate])

  const onUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value)
  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const canSave =
    [validUsername, validPassword, validConfirmPassword].every(Boolean) &&
    !isLoading

  const onSaveUserClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ username, password, confirmPassword })
    }
  }

  const validUserClass = !validUsername ? "form__input--incomplete" : ""
  const validPwdClass = !validPassword ? "form__input--incomplete" : ""

  const ErrorHandler = () => {
    if (error) {
      if ("status" in error) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.data)

        return (
          <div>
            <div>An error has occurred:</div>
            <div>{errMsg}</div>
          </div>
        )
      } else {
        // you can access all properties of `SerializedError` here
        return <div>{error.message}</div>
      }
    }
  }

  const content = (
    <>
      <ErrorHandler />

      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              Save
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />
      </form>
    </>
  )

  return content
}
export default NewUserForm
