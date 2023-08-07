import { useRef, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import useTitle from "../../hooks/useTitle"
import {
  Box,
  Container,
  Center,
  Spinner,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react"

function Login() {
  useTitle("Login")

  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLInputElement>(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
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
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)
  const handleConfirmPwdInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value)
  const handleToggle = () => setPersist((prev: boolean) => !prev)

  // const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading)
    return (
      <Container maxW="9xl" centerContent>
        <Box>
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        </Box>
      </Container>
    )

  const isError = username === ""

  return (
    <Container maxW="9xl" color="black" centerContent>
      <Heading color="gray.800" mt={5}>
        Please Login
      </Heading>
      <main className="login">
        <Text ref={errRef} aria-live="assertive">
          {errMsg}
        </Text>

        <form className="form" onSubmit={handleSubmit}>
          <FormControl isRequired isInvalid={isError}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              // placeholder="Username"
              autoComplete="off"
              required
            />
            {!isError ? (
              <FormHelperText>Enter your username.</FormHelperText>
            ) : (
              <FormErrorMessage>Username is required.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={isError}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              id="email"
              ref={userRef}
              value={email}
              onChange={handleEmailInput}
              // placeholder="Email"
              required
            />
            {!isError ? (
              <FormHelperText>Enter your email.</FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={isError}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              id="password"
              ref={userRef}
              value={password}
              onChange={handlePwdInput}
              // placeholder="Password"
              required
            />
            {!isError ? (
              <FormHelperText>Enter your password.</FormHelperText>
            ) : (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={isError}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              id="confirmPassword"
              ref={userRef}
              value={confirmPassword}
              onChange={handleConfirmPwdInput}
              // placeholder="Confirm Password"
              required
            />
            {!isError ? (
              <FormHelperText>Enter your password.</FormHelperText>
            ) : (
              <FormErrorMessage>
                Password confirmation is required.
              </FormErrorMessage>
            )}
          </FormControl>

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
    </Container>
  )
}

export default Login
