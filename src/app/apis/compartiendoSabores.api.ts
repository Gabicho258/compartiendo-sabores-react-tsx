import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Recipe, User, UserCredentials, Comment } from "../../interfaces/index";

export const compartiendoSaboresAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),

  endpoints: (builder) => ({
    //User endpoint
    getUsers: builder.query<User[], void>({
      query: () => "user",
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "user/create",
        method: "POST",
        body,
      }),
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `user/${id}`,
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `user/update/${body._id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          compartiendoSaboresAPI.util.updateQueryData(
            "getUserById",
            _id || "",
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    // Auth endpoint
    login: builder.mutation<User, UserCredentials>({
      query: (user) => ({
        url: "auth/login",
        method: "POST",
        body: user,
      }),
    }),
    // Recipe endpoint
    getRecipes: builder.query<Recipe[], void>({
      query: () => "recipe/",
    }),
    getRecipeById: builder.query<Recipe, string>({
      query: (id) => ({
        url: `recipe/${id}`,
      }),
    }),
    createRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: (body) => ({
        url: "recipe/create",
        method: "POST",
        body,
      }),
    }),
    deleteRecipe: builder.mutation<Recipe, string>({
      query: (id) => ({
        url: `recipe/delete/${id}`,
        method: "DELETE",
      }),
    }),
    updateRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: (recipe) => ({
        url: `recipe/update/${recipe._id}`,
        method: "PUT",
        body: recipe,
      }),
      async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          compartiendoSaboresAPI.util.updateQueryData(
            "getRecipeById",
            _id || "",
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    // Comment endpoint
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: (comment) => ({
        url: `comment/create`,
        method: "POST",
        body: comment,
      }),
    }),
    getCommentsByRecipeId: builder.query<Comment[], string>({
      query: (id) => `comment/${id}`,
    }),
  }),
});
export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useLoginMutation,
  useCreateRecipeMutation,
  useDeleteRecipeMutation,
  useGetRecipeByIdQuery,
  useGetRecipesQuery,
  useUpdateRecipeMutation,
  useCreateCommentMutation,
  useGetCommentsByRecipeIdQuery,
} = compartiendoSaboresAPI;
