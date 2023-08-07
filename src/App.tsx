import { Layout } from "./components/Layout"
import { Routes, Route } from "react-router-dom"
import BlogsList from "./features/blog/BlogsList"
import Blog from "./features/blog/Blog"
import Login from "./features/auth/Login"
import NewUserForm from "./features/user/NewUserForm"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<BlogsList />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/sign_up" element={<NewUserForm />} />
      </Route>
    </Routes>
  )
}

export default App
