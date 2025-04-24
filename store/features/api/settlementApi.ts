import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const settlementApi = createApi({
  reducerPath: "settlementApi",
  baseQuery,
  tagTypes: ["Settlements"],
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
  }),
})

export const { useSettlementsQuery } = settlementApi
