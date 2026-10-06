import React from "react";
import ReactDOM from "react-dom/client";
import Aplicativo from "./Aplicativo";
import "./estilosGlobais.css";

// Inicialização do React e montagem no elemento raiz HTML
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Aplicativo />
  </React.StrictMode>
);
