import { apiSlice } from "../../app/api/apiSlice"

interface IBlog {
  _id: string
  title: string
  description: string
  content: string
  comments: [string]
  published: boolean
  createdAt: Date
  updatedAt: Date
}

type BlogsResponse = IBlog[]

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getALLBlogs: builder.query<BlogsResponse, void>({
      query: () => ({
        url: "/blog/blogs_all",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Blog" as const, _id })),
              { type: "Blog", id: "LIST" },
            ]
          : [{ type: "Blog", id: "LIST" }],
    }),
  }),
})

export const { useGetALLBlogsQuery } = blogApiSlice
