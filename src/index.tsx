import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { StyledEngineProvider } from "@mui/material";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
      {/*<Login />*/}

      {/* <Categories /> */}

      {/* <HomePage /> */}

      {/* <Register /> */}

      {/* <UserProfile /> */}
    </StyledEngineProvider>
  </React.StrictMode>
);
