import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { disableReactDevTools } from "@fvilers/disable-react-devtools"
import App from "./App"
import "./index.css"

if (process.env.NODE_ENV === "production") disableReactDevTools()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
