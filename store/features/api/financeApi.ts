import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const financeApi = createApi({
  reducerPath: "financeApi",
  baseQuery,
  tagTypes: ["FinancialOrganizations"],
  endpoints: builder => ({
    // /api/v2/financial-organizations
    financialOrganizations: builder.query({
      query: params => ({
        url: `financial-organizations`,
        params: formatParams(params),
      }),
      // transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
      providesTags: ["FinancialOrganizations"],
    }),
  }),
})

export const { useFinancialOrganizationsQuery } = financeApi
