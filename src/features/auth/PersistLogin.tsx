import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useAppSelector } from "../../app/hooks"
import { selectCurrentToken } from "./authSlice"
import { Spinner, Box } from "@chakra-ui/react"
import ErrorHandler from "../../components/ErrorHandler"

const PersistLogin = () => {
  const [persist] = usePersist()
  const token = useAppSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token")
        try {
          //const response =
          await refresh({})
          //const { accessToken } = response.data
          setTrueSuccess(true)
        } catch (err) {
          console.error(err)
        }
      }

      if (!token && persist) verifyRefreshToken()
    }

    return () => {
      effectRan.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let content
  if (!persist) {
    // persist: no
    console.log("no persist")
    content = <Outlet />
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading")
    content = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )
  } else if (isError) {
    //persist: yes, token: no
    console.log("error")
    content = (
      <Box>
        <ErrorHandler error={error} />
        <Link to="/auth/login">Please login again</Link>.
      </Box>
    )
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success")
    content = <Outlet />
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit")
    console.log(isUninitialized)
    content = <Outlet />
  }

  return content
}
export default PersistLogin
