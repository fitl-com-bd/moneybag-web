// Need to use the React-specific entry point to import createApi
import { baseQuery } from "@/store/config"
import { createApi } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["CheckLogin", "CheckAdminLogin"],
  endpoints: builder => ({
    checkLogin: builder.query({
      query: () => ({ url: "auth/details" }),
      transformResponse: response => response,
      transformErrorResponse: error => {
        if (error.status === 401) {
          return error.data
        }
        return error
      },
      providesTags: ["CheckLogin"],
    }),
    loginUser: builder.mutation({
      query: ({ username, password }) => ({
        url: "mruser-auth/token",
        method: "POST",
        body: { username, password },
      }),
    }),
    checkAdminLogin: builder.query({
      query: () => ({ url: "auth/login" }),
      transformResponse: response => response,
      transformErrorResponse: error => {
        if (error.status === 401) {
          return error.data
        }
        return error
      },
      providesTags: ["CheckAdminLogin"],
    }),
    loginAdmin: builder.mutation({
      query: ({ username, password }) => ({
        url: "auth/token",
        method: "POST",
        body: { username, password },
      }),
    }),
    // /api/v2/auth/token
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "auth/token",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCheckLoginQuery,
  useLoginUserMutation,
  useCheckAdminLoginQuery,
  useLoginAdminMutation,
  useLoginMutation,
} = authApi
