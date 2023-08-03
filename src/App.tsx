import { Layout } from "./components/Layout"
import { Routes, Route } from "react-router-dom"
import Public from "./components/Public"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        {/* <Route path="login" element={<Login />} /> */}
      </Route>
    </Routes>
  )
}

export default App
