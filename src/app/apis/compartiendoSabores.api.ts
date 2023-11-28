import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Recipe,
  User,
  UserCredentials,
  Comment,
  Chat,
  Message,
} from "../../interfaces/index";

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
    // Chat endpoint
    createChat: builder.mutation<Chat, { owner_id: string; friend_id: string }>(
      {
        query: (chat) => ({
          url: "chat/create",
          method: "POST",
          body: chat,
        }),
      }
    ),
    getChatsByUserId: builder.query<Chat[], string>({
      query: (user_id) => `chat/${user_id}`,
    }),
    getOneChat: builder.query<Chat[], { owner_id: string; friend_id: string }>({
      query: (ids) => `chat/${ids.owner_id}/${ids.friend_id}`,
    }),
    // Message endpoint
    createMessage: builder.mutation<Message, Partial<Message>>({
      query: (message) => ({
        url: "message/create",
        method: "POST",
        body: message,
      }),
    }),
    getMessagesByChatId: builder.query<Chat[], string>({
      query: (chat_id) => `message/${chat_id}`,
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
  useCreateChatMutation,
  useCreateMessageMutation,
  useGetChatsByUserIdQuery,
  useGetMessagesByChatIdQuery,
  useGetOneChatQuery,
} = compartiendoSaboresAPI;
