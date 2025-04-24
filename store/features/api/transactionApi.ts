import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery,
  tagTypes: ["Transactions"],
  endpoints: builder => ({
    ///api/v2/transactions/
    transactions: builder.query({
      query: params => ({
        url: `transactions/`,
        params: formatParams(params),
      }),
      transformErrorResponse: error => error,
      providesTags: ["Transactions"],
    }),
  }),
})

export const { useTransactionsQuery } = transactionApi
