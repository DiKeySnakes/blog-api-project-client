import useAuth from "../hooks/useAuth"
import { Container, Box, Heading, Spacer, Flex, Center } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"
import { Link as ChakraLink } from "@chakra-ui/react"

export default function Nav() {
  const { username } = useAuth()

  return (
    <Container maxW="9xl" bg="gray.200" color="gray.800">
      <Flex>
        <Box>
          <a href="/">
            <Heading mt={2} mb={2}>
              Blog API Project
            </Heading>
          </a>
        </Box>
        <Spacer />
        <Center>
          <ChakraLink as={ReactRouterLink} to="/" mr={15}>
            Blogs
          </ChakraLink>

          <ChakraLink
            as={ReactRouterLink}
            to={username ? "/auth/logout" : "/auth/login"}
            mr={15}
          >
            {username ? "Logout" : "Login"}
          </ChakraLink>

          <ChakraLink as={ReactRouterLink} to="/auth/sign_up">
            Sign Up
          </ChakraLink>
        </Center>
      </Flex>
    </Container>
  )
}
