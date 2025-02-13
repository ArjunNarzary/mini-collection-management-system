import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import { Provider } from "react-redux"
import App from "./App.tsx"
import { store } from "./store.ts"
import "./index.css"
import { Toaster } from "./components/ui/sonner"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Toaster closeButton richColors />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
