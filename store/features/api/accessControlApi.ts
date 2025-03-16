import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const accessControlApi = createApi({
  reducerPath: "accessControlApi",
  baseQuery,
  tagTypes: ["Roles", "Permissions"],
  endpoints: builder => ({
    roles: builder.query({
      query: params => ({ url: "acl/roles", params: formatParams(params) }),
      providesTags: ["Roles"],
    }),
    // usePermissionsQuery
    permissions: builder.query({
      query: params => ({ url: "acl/permissions", params: formatParams(params) }),
      providesTags: ["Permissions"],
    }),
  }),
})

export const { useRolesQuery, usePermissionsQuery } = accessControlApi
