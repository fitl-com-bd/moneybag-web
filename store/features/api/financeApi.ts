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
        url: "financial-organizations",
        params: formatParams(params),
      }),
      // transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
      providesTags: ["FinancialOrganizations"],
    }),
    // POST /api/v2/financial-organizations
    createFinancialOrganization: builder.mutation({
      query: body => ({
        url: "financial-organizations",
        method: "POST",
        body,
      }),
      transformErrorResponse: error => error,
      invalidatesTags: ["FinancialOrganizations"],
    }),
    // POST /api/v2/payment-configs/financial-payment-services/fin-org/{fin_org_id}
    createFinancialService: builder.mutation({
      query: ({ id, body }) => ({
        url: `payment-configs/financial-payment-services/fin-org/${id}`,
        method: "POST",
        body,
      }),
      transformErrorResponse: error => error,
      invalidatesTags: ["FinancialOrganizations"],
    }),
  }),
})

export const {
  useFinancialOrganizationsQuery,
  useCreateFinancialOrganizationMutation,
  useCreateFinancialServiceMutation,
} = financeApi
