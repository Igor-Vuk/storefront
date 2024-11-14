import ReactDOM from "react-dom/client"
import { StrictMode } from "react"
import "./index.css"

import App from "./App"

const rootElement = document.querySelector("#root")
if (!rootElement) {
  throw new Error("Root element not found")
}

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
