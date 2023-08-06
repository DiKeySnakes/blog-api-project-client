import { useGetALLBlogsQuery } from "./blogApiSlice"
import useTitle from "../../hooks/useTitle"
import format from "date-fns/format"
import ErrorHandler from "../../components/ErrorHandler"
import {
  Spinner,
  Container,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Image,
  Box,
} from "@chakra-ui/react"

const NotesList = () => {
  useTitle("Blogs List")

  const {
    data: blogs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetALLBlogsQuery()

  let content

  if (isLoading)
    content = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )

  if (isError) {
    content = <ErrorHandler error={error} />
  }

  if (isSuccess) {
    const blogsContent =
      blogs?.length &&
      blogs.map((blog) => (
        <Card
          key={blog._id}
          id={blog._id}
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          mt={10}
          mb={10}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Latte"
          />

          <Stack>
            <CardBody>
              <Heading size="md">{blog.title}</Heading>

              <Text py="2">{blog.description}</Text>
            </CardBody>

            <CardFooter>
              <Box mr={2}>
                <Text as="b">by MariiaN </Text>
              </Box>
              <Box ml={2}>
                <Text>{format(new Date(blog.createdAt), "dd MMM yyyy")}</Text>
              </Box>
            </CardFooter>
          </Stack>
        </Card>
      ))

    content = (
      <Container maxW="9xl" color="white" centerContent>
        <Box padding="4" color="white" maxW="4xl">
          <Heading color="gray.800" mt={5}>
            All Blogs
          </Heading>
          {blogsContent}
        </Box>
      </Container>
    )
  }

  return content
}
export default NotesList
