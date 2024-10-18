import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/getToken";

interface NewBlogRequest {
  description: string;
  title: string;
  content: string;
  published: boolean;
}

interface NewBlogResponse {
  success: boolean;
  message: string;
  blogPost: {
    id: string; 
    description: string;
    title: string;
    content: string;
  };
}

interface GetBlogsResponse {
  success: boolean;
  response: {
    author: {
      firstName: string;
      lastName: string;
    };
    id: string;
    title: string;
    description: string;
    content: string;
    createdAt: string;
  }[];
}

interface GetBlogByIdResponse {
  success: boolean;
  blogPost: {
    id: string;
    title: string;
    description: string;
    content: string;
    createdAt: string;
  };
}

const { VITE_BLOGS_BASE_URL, VITE_ADD_BLOG, VITE_ALL_BLOGS } = import.meta
  .env as unknown as Record<string, string>;

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_BLOGS_BASE_URL,
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
    createNewBlog: builder.mutation<NewBlogResponse, NewBlogRequest>({
      query: (userInfo) => ({
        url: `${VITE_ADD_BLOG}`,
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllBlogs: builder.query<GetBlogsResponse, void>({
      query: () => ({
        url: `${VITE_ALL_BLOGS}`,
        method: "GET",
      }),
    }),
    getBlogById: builder.query<GetBlogByIdResponse, string>({
      query: (id: string) => ({
        url: `${id}`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useCreateNewBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
} = blogApi;
