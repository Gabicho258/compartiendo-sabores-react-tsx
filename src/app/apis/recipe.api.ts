import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Recipe } from "../../interfaces/index";
// interface Recipe {
//   _id: string;
//   user_id: string;
//   title: string;
//   ingredients: string[];
//   procedure: string[];
//   images: string[];
//   category: string;
//   average_rating: number;
//   views: number;
//   __v: number;
// }

export const recipeAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:5000/api/recipe",
  }),
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => "/",
    }),
    getRecipeById: builder.query<Recipe, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
    createRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: (body) => ({
        url: "create",
        method: "POST",
        body,
      }),
    }),
    deleteRecipe: builder.mutation<Recipe, string>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
    }),
    updateRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: (recipe) => ({
        url: `update/${recipe._id}`,
        method: "PUT",
        body: recipe,
      }),
    }),
  }),
});

export const {
  useCreateRecipeMutation,
  useDeleteRecipeMutation,
  useGetRecipeByIdQuery,
  useGetRecipesQuery,
  useUpdateRecipeMutation,
} = recipeAPI;
