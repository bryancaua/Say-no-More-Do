import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToDoProvider } from "./components/ToDoProvider/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToDoProvider>
      <App />
    </ToDoProvider>
  </StrictMode>
);
