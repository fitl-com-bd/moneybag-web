// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "@/store/config"

// Define a service using a base URL and expected endpoints
export const pageApi = createApi({
  reducerPath: "pageApi",
  baseQuery,
  tagTypes: ["Dashboard", "Statements", "IntegrationDetails"],
  endpoints: builder => ({
    dashboard: builder.query({
      query: () => ({ url: `merchant-dashboard/dashboard-details` }),
      transformResponse: response => response.data,
      transformErrorResponse: error => error,
      providesTags: ["Dashboard"],
    }),
    // statements
    statements: builder.query({
      query: prams => ({
        url: `txn-statements/merchant`,
        params: { ...prams },
      }),
      transformResponse: response => response,
      transformErrorResponse: error => error,
      providesTags: ["Statements"],
    }),
    integrationDetails: builder.query({
      query: () => ({
        url: `marchants/integration-details`,
      }),
      transformResponse: response => response.data,
      transformErrorResponse: error => error,
      providesTags: ["IntegrationDetails"],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useDashboardQuery, useStatementsQuery, useIntegrationDetailsQuery } = pageApi
