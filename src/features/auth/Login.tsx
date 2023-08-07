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
  Button,
  Checkbox,
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

  const isUsernameError = username === ""
  const isEmailError = email === ""
  const isPasswordError = password === ""
  const isConfirmPasswordError = confirmPassword === ""

  return (
    <Container maxW="9xl" color="black" centerContent>
      <Heading color="gray.800" mt={5}>
        Please Login
      </Heading>

      <Text ref={errRef} aria-live="assertive">
        {errMsg}
      </Text>

      <form onSubmit={handleSubmit}>
        <FormControl mt={5} mb={5} isRequired isInvalid={isUsernameError}>
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
          {!isUsernameError ? (
            <FormHelperText>Enter your username.</FormHelperText>
          ) : (
            <FormErrorMessage>Username is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={5} mb={5} isRequired isInvalid={isEmailError}>
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
          {!isEmailError ? (
            <FormHelperText>Enter your email.</FormHelperText>
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={5} mb={5} isRequired isInvalid={isPasswordError}>
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
          {!isPasswordError ? (
            <FormHelperText>Enter your password.</FormHelperText>
          ) : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl
          mt={5}
          mb={5}
          isRequired
          isInvalid={isConfirmPasswordError}
        >
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
          {!isConfirmPasswordError ? (
            <FormHelperText>Enter your password.</FormHelperText>
          ) : (
            <FormErrorMessage>
              Password confirmation is required.
            </FormErrorMessage>
          )}
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          size="md"
          mr={10}
          mt={5}
          mb={5}
        >
          Sign In
        </Button>

        <Checkbox
          colorScheme="teal"
          id="persist"
          onChange={handleToggle}
          checked={persist}
          ml={10}
          mt={5}
          mb={5}
        >
          Trust This Device
        </Checkbox>
      </form>
      <Link to="/">
        <Box>
          <Text>Back to Home</Text>
        </Box>
      </Link>
    </Container>
  )
}

export default Login
