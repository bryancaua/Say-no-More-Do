import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToDoProvider } from "./context/ToDoProvider/index.jsx";
import { Aside } from "./components/layout/Aside/index.jsx";
import { Tasks } from "./pages/Tasks/index.jsx";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToDoProvider>
      <BrowserRouter>
        <Aside />
        <Routes>
          <Route path="/tarefas" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </ToDoProvider>
  </StrictMode>
);
