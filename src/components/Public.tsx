import { Link } from "react-router-dom"
import { Container, Box, Heading, Center } from "@chakra-ui/react"

const Public = () => {
  const content = (
    <Container maxW="9xl" bg="blue.400" color="white" centerContent>
      <Box padding="4" bg="blue.400" color="white" maxW="md">
        <Center>
          <Heading as="h1" size="2xl">
            All Blogs
          </Heading>
        </Center>
        <section>
          <header>
            <h1>
              Welcome to <span>Blog Api Project!</span>
            </h1>
          </header>
          <footer>
            <Link to="/login">Employee Login</Link>
          </footer>
        </section>
      </Box>
    </Container>
  )
  return content
}
export default Public
