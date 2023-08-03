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
        <section className="public">
          <header>
            <h1>
              Welcome to <span className="nowrap">Dan D. Repairs!</span>
            </h1>
          </header>
          <main className="public__main">
            <p>
              Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
              trained staff ready to meet your tech repair needs.
            </p>
            <address className="public__addr">
              Dan D. Repairs
              <br />
              555 Foo Drive
              <br />
              Foo City, CA 12345
              <br />
              <a href="tel:+15555555555">(555) 555-5555</a>
            </address>
            <br />
            <p>Owner: Dan Davidson</p>
          </main>
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
