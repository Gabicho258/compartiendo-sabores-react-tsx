import { configureStore } from "@reduxjs/toolkit";
import { compartiendoSaboresAPI } from "./apis/compartiendoSabores.api";

export const store = configureStore({
  reducer: {
    [compartiendoSaboresAPI.reducerPath]: compartiendoSaboresAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(compartiendoSaboresAPI.middleware),
});
