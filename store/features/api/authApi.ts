// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "@/store/config"

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["CheckLogin"],
  endpoints: builder => ({
    checkLogin: builder.query({
      query: () => ({ url: `auth/details` }),
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
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCheckLoginQuery, useLoginUserMutation } = authApi
