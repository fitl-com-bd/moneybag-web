import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const financeApi = createApi({
  reducerPath: "financeApi",
  baseQuery,
  tagTypes: ["Banks"],
  endpoints: builder => ({
    banks: builder.query({
      query: params => ({
        url: `banks`,
        params: formatParams(params),
      }),
      // transformResponse: (response: any) => response.data.users,
      transformErrorResponse: error => error,
      providesTags: ["Banks"],
    }),
  }),
})

export const { useBanksQuery } = financeApi
