import { ReactElement } from "react"

function Blog(id: string, title: string, description: string): ReactElement {
  return (
    <div>
      <a href={`/blog/${id}`}>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </a>
    </div>
  )
}

export default Blog
