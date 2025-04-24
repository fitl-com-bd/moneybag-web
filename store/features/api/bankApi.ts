import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const bankApi = createApi({
  reducerPath: "bankApi",
  baseQuery,
  tagTypes: ["Banks"],
  endpoints: builder => ({
    // /api/v2/banks/
    banks: builder.query({
      query: params => ({
        url: "banks",
        params: formatParams(params),
      }),
      transformErrorResponse: error => error,
      providesTags: ["Banks"],
    }),
    // /api/v2/banks/all-branches
    allBranches: builder.query({
      query: params => ({
        url: "banks/all-branches",
        params: formatParams(params),
      }),
      transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
      providesTags: ["Banks"],
    }),
  }),
})

export const { useBanksQuery, useAllBranchesQuery } = bankApi
