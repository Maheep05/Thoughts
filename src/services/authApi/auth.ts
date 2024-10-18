import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/getToken";

const { VITE_AUTH_BASE_URL, VITE_AUTH_USER_LOG, VITE_AUTH_USER_NEWS } =
  import.meta.env as unknown as Record<string, string>;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_AUTH_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: `${VITE_AUTH_USER_LOG}`,
        method: "POST",
        body: userInfo,
      }),
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: `${VITE_AUTH_USER_NEWS}`,
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
