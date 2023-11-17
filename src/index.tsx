import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { StyledEngineProvider } from "@mui/material";
<<<<<<< HEAD

import App from "./App";
=======
import { Categories } from "./pages/Categories/Categories";
import { Register } from "./pages/Register/Register";
import { CreateRecipe } from "./pages/CreateRecipe/CreateRecipe";
>>>>>>> 9d39982667ef893364e7ac0bc492c4d51f0b7af1

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
      {/*<Login />*/}

<<<<<<< HEAD
      {/* <Categories /> */}
=======
      <CreateRecipe />
>>>>>>> 9d39982667ef893364e7ac0bc492c4d51f0b7af1

      {/* <HomePage /> */}

      {/* <Register /> */}

      {/* <UserProfile /> */}
    </StyledEngineProvider>
  </React.StrictMode>
);
