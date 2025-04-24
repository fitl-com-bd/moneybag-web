import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery,
  tagTypes: ["DefaultPaymentServices"],
  endpoints: builder => ({
    // /api/v2/payment-configs/default-payment-services/
    defaultPaymentServices: builder.query({
      query: params => ({
        url: `payment-configs/default-payment-services/`,
        params: formatParams(params),
      }),
      transformResponse: (response: any) => ({ data: response.data.default_services || [] }),
      transformErrorResponse: error => error,
      providesTags: ["DefaultPaymentServices"],
    }),
  }),
})

export const { useDefaultPaymentServicesQuery } = paymentApi
