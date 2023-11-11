import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Login } from "./pages/Login/Login";
import { HomePage } from "./pages/HomePage/HomePage";
import { StyledEngineProvider } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      {/* <App /> */}
      {/* <Login /> */}
      <HomePage />
    </StyledEngineProvider>
  </React.StrictMode>
);
