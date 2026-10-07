import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToDoProvider } from "./context/ToDoProvider/index.jsx";
import { Aside } from "./components/layout/Aside/index.jsx";
import { Tasks } from "./pages/Tasks/index.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Goals } from "./pages/Goals/index.jsx";
import { GoalsProvider } from "./context/GoalsProvider/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToDoProvider>
      <GoalsProvider>
        <BrowserRouter>
          <Aside />
          <Routes>
            <Route path="/tarefas" element={<Tasks />} />
            <Route path="/metas" element={<Goals />} />
          </Routes>
        </BrowserRouter>
      </GoalsProvider>
    </ToDoProvider>
  </StrictMode>
);
