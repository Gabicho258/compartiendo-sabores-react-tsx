import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./apis/user.api";
import { authAPI } from "./apis/auth.api";
import { recipeAPI } from "./apis/recipe.api";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [recipeAPI.reducerPath]: recipeAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userAPI.middleware, authAPI.middleware]),
});
