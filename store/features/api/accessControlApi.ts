import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const accessControlApi = createApi({
  reducerPath: "accessControlApi",
  baseQuery,
  tagTypes: ["Roles", "Permissions", "Features"],
  endpoints: builder => ({
    roles: builder.query({
      query: params => ({ url: "acl/roles", params: formatParams(params) }),
      providesTags: ["Roles"],
    }),
    permissions: builder.query({
      query: params => ({ url: "acl/permissions", params: formatParams(params) }),
      providesTags: ["Permissions"],
    }),
    features: builder.query({
      query: params => ({ url: "acl/features", params: formatParams(params) }),
      providesTags: ["Features"],
    }),
    createPermission: builder.mutation({
      query: body => ({
        url: "acl/permissions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Permissions"],
    }),
    createRole: builder.mutation({
      query: body => ({
        url: "acl/roles",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Roles"],
    }),
  }),
})

export const {
  useRolesQuery,
  usePermissionsQuery,
  useFeaturesQuery,
  useCreatePermissionMutation,
  useCreateRoleMutation,
} = accessControlApi
