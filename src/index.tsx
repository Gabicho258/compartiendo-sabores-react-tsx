import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Login } from "./pages/Login/Login";
import { HomePage } from "./pages/HomePage/HomePage";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { StyledEngineProvider } from "@mui/material";
import { Categories } from "./pages/Categories/Categories";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      {/* <App /> */}
      {/* <Login /> */}

      {/* <Categories /> */}

      {/* <HomePage /> */}
      <UserProfile />
    </StyledEngineProvider>
  </React.StrictMode>
);
