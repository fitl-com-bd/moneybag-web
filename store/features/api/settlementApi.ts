import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const settlementApi = createApi({
  reducerPath: "settlementApi",
  baseQuery,
  tagTypes: ["Settlement", "EligibleSettlement", "SettlementMerchants"],
  endpoints: builder => ({
    // /api/v2/settlements
    settlements: builder.query({
      query: params => ({
        url: `settlements`,
        params: formatParams(params),
      }),
      // transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
      providesTags: ["Settlements"],
    }),
    // /api/v2/settlements/eligible-items/{merchant_id}
    eligibleItems: builder.query({
      query: ({ merchant_id, ...params }) => ({
        url: `settlements/eligible-items/${merchant_id}`,
        params: formatParams(params),
      }),
      transformResponse: (response: any) => ({ data: response.data.transactions }),
      transformErrorResponse: error => error,
      providesTags: ["EligibleSettlement"],
    }),
    // /api/v2/settlements/merchants
    settlementMerchants: builder.query({
      query: params => ({
        url: `settlements/merchants`,
        params: formatParams(params),
      }),
      // transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
      providesTags: ["SettlementMerchants"],
    }),
  }),
})

export const { useSettlementsQuery, useEligibleItemsQuery, useSettlementMerchantsQuery } = settlementApi
