import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../interfaces/index";
// interface User {
//   _id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
//   phone_number: string;
//   description: string;
//   photo_url: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

export const userAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/user",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/",
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "create",
        method: "POST",
        body,
      }),
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/${id}`,
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `update/${body._id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});
export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = userAPI;
