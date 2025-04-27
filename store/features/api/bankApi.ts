import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

// TypeScript interface for createBank payload
interface CreateBankPayload {
  name: string
  short_name: string
  swift_code: string
  website: string
  primary_phone: string
  secondary_phone: string
  email: string
  customer_support_number: string
  notes: string
  is_active: boolean
}

export const bankApi = createApi({
  reducerPath: "bankApi",
  baseQuery,
  tagTypes: ["Banks"],
  endpoints: builder => ({
    // /api/v2/banks/
    banks: builder.query({
      query: params => ({
        url: "banks/",
        params: formatParams(params),
      }),
      transformResponse: (response: any) => ({
        data: response.data.banks,
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
    // POST: /api/v2/banks/
    createBank: builder.mutation({
      query: (body: CreateBankPayload) => ({
        url: "banks/",
        method: "POST",
        body,
      }),
      // transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
      invalidatesTags: ["Banks"],
    }),
  }),
})

export const { useBanksQuery, useAllBranchesQuery, useCreateBankMutation } = bankApi
