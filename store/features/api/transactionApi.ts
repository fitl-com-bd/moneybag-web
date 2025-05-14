import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery,
  tagTypes: ["Transactions", "TransactionDetails"],
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
    // GET: .bd/api/v2/transactions/TXN-dfcfb0ec40614bacb4053db1356253b9 \
    transactionDetails: builder.query({
      query: id => ({
        url: `transactions/${id}`,
        // params: formatParams({}),
      }),
      transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
      providesTags: (result, error, id) => [{ type: "TransactionDetails", id }],
    }),
  }),
})

export const { useTransactionsQuery, useTransactionDetailsQuery } = transactionApi
