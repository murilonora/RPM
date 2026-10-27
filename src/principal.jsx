import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Aplicativo from "./Aplicativo";
import "./estilosGlobais.css";

// Inicialização do React e montagem no elemento raiz HTML
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Aplicativo />
  </StrictMode>
);
