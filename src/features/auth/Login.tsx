import { Container } from "@chakra-ui/react"
import { useRef, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import useTitle from "../../hooks/useTitle"
import { Spinner } from "@chakra-ui/react"

function Login() {
  useTitle("Login")

  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLInputElement>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    if (userRef.current !== null && userRef.current !== undefined) {
      userRef.current.focus()
    }
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [username, password])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername("")
      setPassword("")
      navigate("/")
    } catch (err: any) {
      if (!err.status) {
        setErrMsg("No Server Response")
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password")
      } else if (err.status === 401) {
        setErrMsg("Unauthorized")
      } else {
        setErrMsg(err.data?.message)
      }
      if (errRef.current !== null) {
        errRef.current.focus()
      }
    }
  }

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value)
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)
  const handleToggle = () => setPersist((prev: boolean) => !prev)

  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )

  return (
    <Container maxW="9xl" bg="blue.400" color="white" centerContent>
      <section className="public">
        <header>
          <h1>Please Login</h1>
        </header>
        <main className="login">
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              className="form__input"
              type="text"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              className="form__input"
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
            />
            <button className="form__submit-button">Sign In</button>

            <label htmlFor="persist" className="form__persist">
              <input
                type="checkbox"
                className="form__checkbox"
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />
              Trust This Device
            </label>
          </form>
        </main>
        <footer>
          <Link to="/">Back to Home</Link>
        </footer>
      </section>
    </Container>
  )
}

export default Login
