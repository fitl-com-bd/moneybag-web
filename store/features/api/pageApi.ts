// Need to use the React-specific entry point to import createApi
import { baseQuery } from "@/store/config"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints
export const pageApi = createApi({
  reducerPath: "pageApi",
  baseQuery,
  tagTypes: ["Dashboard", "Statements", "IntegrationDetails"],
  endpoints: builder => ({
    dashboard: builder.query({
      query: () => ({ url: `merchant-dashboard/dashboard-details` }),
      transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
      providesTags: ["Dashboard"],
    }),
    statements: builder.query({
      query: prams => ({
        url: `txn-statements/merchant`,
        params: { ...prams },
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: error => error,
      providesTags: ["Statements"],
    }),
    integrationDetails: builder.query({
      query: () => ({
        url: `marchants/integration-details`,
      }),
      transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
      providesTags: ["IntegrationDetails"],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useDashboardQuery, useStatementsQuery, useIntegrationDetailsQuery } = pageApi
