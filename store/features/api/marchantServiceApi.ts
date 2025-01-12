import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const marchantServiceApi = createApi({
  reducerPath: "marchantServiceApi",
  baseQuery,
  tagTypes: ["Merchants"],
  endpoints: builder => ({
    merchants: builder.query({
      query: params => ({
        url: `marchants`,
        params: formatParams(params),
      }),
      // transformResponse: (response: any) => response.data.users,
      transformErrorResponse: error => error,
      providesTags: ["Merchants"],
    }),
  }),
})

export const { useMerchantsQuery } = marchantServiceApi
