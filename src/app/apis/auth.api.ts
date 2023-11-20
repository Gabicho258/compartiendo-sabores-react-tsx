import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { User } from "../../interfaces/index";

interface UserCredentials {
  email: string;
  password: string;
}

export const authAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:5000/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<User, UserCredentials>({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginMutation } = authAPI;
