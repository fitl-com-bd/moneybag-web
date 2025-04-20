import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery,
  tagTypes: ["Address"],
  endpoints: builder => ({
    // /api/v2/address
    address: builder.query({
      query: params => ({
        url: "address",
        params: formatParams(params),
      }),
      transformErrorResponse: error => error,
      providesTags: ["Address"],
    }),
  }),
})

export const { useAddressQuery } = commonApi
