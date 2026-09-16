import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToDoProvider } from "./components/ToDoProvider/index.jsx";
import { Aside } from "./components/Aside/index.jsx";
import { Tasks } from "./components/Tasks/index.jsx";
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
