import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const merchantSetupApi = createApi({
  reducerPath: "merchantSetupApi",
  baseQuery,
  tagTypes: ["Users"],
  endpoints: builder => ({
    users: builder.query({
      query: params => ({
        url: "users",
        params: formatParams(params),
      }),
      // transformResponse: (response: any) => response.data.users,
      transformErrorResponse: error => error,
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: body => ({
        url: "users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
})

export const { useUsersQuery, useCreateUserMutation } = merchantSetupApi
