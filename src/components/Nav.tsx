import { Container, Box, Heading, Spacer, Flex, Center } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"
import { Link as ChakraLink } from "@chakra-ui/react"

export default function Nav() {
  return (
    <Container maxW="9xl" bg="blue.600" color="white">
      <Flex>
        <Box>
          <a href="/">
            <Heading>Blog Ninja</Heading>
          </a>
          <Heading as="h5" size="sm" ml={5}>
            A Net Ninja Site
          </Heading>
        </Box>
        <Spacer />
        <Center>
          <ChakraLink as={ReactRouterLink} to="/" mr={15}>
            Blogs
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/about" mr={15}>
            About
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/blogs/create">
            New Blog
          </ChakraLink>
        </Center>
      </Flex>
    </Container>
  )
}
