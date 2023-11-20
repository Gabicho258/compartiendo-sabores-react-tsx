import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { StyledEngineProvider } from "@mui/material";
import { store } from "./app/store";
import { Provider } from "react-redux";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);
