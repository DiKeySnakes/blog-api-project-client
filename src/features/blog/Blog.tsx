import { useGetDetailedBlogQuery } from "./blogApiSlice"
import { useParams } from "react-router-dom"
import useTitle from "../../hooks/useTitle"
import format from "date-fns/format"
import ErrorHandler from "../../components/ErrorHandler"
import { skipToken } from "@reduxjs/toolkit/dist/query"
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
  Center,
} from "@chakra-ui/react"

function Blog({ id }: { id?: string }) {
  useTitle("Detailed Blog")

  const params = useParams()
  id = params.id

  const { data, isLoading, isSuccess, isError, error } =
    useGetDetailedBlogQuery(id ?? skipToken)

  let content

  if (isLoading) {
    content = (
      <Container maxW="9xl" centerContent>
        <Box mt={5}>
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
  }

  if (isError) {
    content = (
      <Container maxW="9xl" centerContent>
        <Box>
          <Center>
            <ErrorHandler error={error} />
          </Center>
        </Box>
      </Container>
    )
  }

  if (isSuccess) {
    const blogContent = (
      <Box
        key={data.blog._id}
        id={data.blog._id}
        as="article"
        maxW="6xl"
        // p="5"
        borderWidth="1px"
        borderColor="gray.400"
        rounded="md"
        mt={10}
        mb={10}
      >
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Stack>
            <Image
              p={5}
              objectFit="cover"
              // maxW={{ base: "100%", sm: "200px" }}
              src={data.blog.image}
              alt="Latte"
            />

            <CardBody>
              <Text py="2">{data.blog.content}</Text>
            </CardBody>

            <CardFooter>
              <Box mr={2}>
                <Text as="b">by MariiaN </Text>
              </Box>
              <Box ml={2}>
                <Text>
                  {format(new Date(data.blog.createdAt), "dd MMM yyyy")}
                </Text>
              </Box>
            </CardFooter>
          </Stack>
        </Card>
      </Box>
    )

    const commentsContent =
      data.comments?.length &&
      data.comments.map((comment) => (
        <Box
          key={comment._id}
          id={comment._id}
          as="article"
          maxW="6xl"
          // p="5"
          borderWidth="1px"
          borderColor="gray.400"
          rounded="md"
          mt={10}
          mb={10}
        >
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Stack>
              <CardBody>
                <Text py="2">{comment.content}</Text>
              </CardBody>

              <CardFooter>
                <Box mr={2}>
                  <Text as="b">by {comment.user.username} </Text>
                </Box>
                <Box ml={2}>
                  <Text>
                    {format(new Date(comment.createdAt), "dd MMM yyyy")}
                  </Text>
                </Box>
              </CardFooter>
            </Stack>
          </Card>
        </Box>
      ))

    content = (
      <Container maxW="9xl" color="white" centerContent>
        <Box padding="4" color="white" maxW="4xl">
          <Heading color="gray.800" mt={5}>
            {data.blog.title}
          </Heading>
          {blogContent}
          {commentsContent}
        </Box>
      </Container>
    )
  }

  return content
}

export default Blog
