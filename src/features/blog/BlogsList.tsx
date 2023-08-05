import { useGetALLBlogsQuery } from "./blogApiSlice"
import useTitle from "../../hooks/useTitle"
import { Spinner } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"

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

  const ErrorHandler = () => {
    if (error) {
      if ("status" in error) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.data)

        return (
          <div>
            <div>An error has occurred:</div>
            <div>{errMsg}</div>
          </div>
        )
      } else {
        // you can access all properties of `SerializedError` here
        return <div>{error.message}</div>
      }
    }
  }

  if (isError) {
    content = <ErrorHandler />
  }

  if (isSuccess) {
    const blogsContent =
      blogs?.length &&
      blogs.map((blog) => (
        <div key={blog._id} id={blog._id}>
          <a href={`/blog/${blog._id}`}>
            <h1>{blog.title}</h1>
            <h2>{blog.description}</h2>
          </a>
        </div>
      ))

    content = (
      <Container maxW="9xl" bg="blue.400" color="white" centerContent>
        {blogsContent}
      </Container>
    )
  }

  return content
}
export default NotesList
