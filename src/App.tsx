import { Layout } from "./components/Layout"
import { Routes, Route } from "react-router-dom"
import Public from "./components/Public"
import Login from "./features/auth/Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="/auth/login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
