import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

// TypeScript type support
export interface MerchantNidDetailsPayload {
  date_of_birth: string
  nid_number: string
}

export const merchantServiceApi = createApi({
  reducerPath: "merchantServiceApi",
  baseQuery,
  tagTypes: ["Merchants"],
  endpoints: builder => ({
    merchants: builder.query({
      query: params => ({
        url: "merchants",
        params: formatParams(params),
      }),
      // transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
      providesTags: ["Merchants"],
    }),
    createBusinessDetails: builder.mutation({
      query: businessDetails => ({
        url: "merchants/business-details",
        method: "POST",
        body: businessDetails,
      }),
      invalidatesTags: ["Merchants"],
    }),
    // /api/v2/merchants/{merchant_id}/representatives
    createMerchantRepresentative: builder.mutation({
      query: ({ merchantId, ...data }) => ({
        url: `merchants/${merchantId}/representatives`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Merchants"],
    }),
    // /api/v2/merchants/nid-details
    merchantNid: builder.mutation({
      query: (payload: MerchantNidDetailsPayload) => ({
        url: "merchants/nid-details",
        method: "POST",
        body: { ...payload, english_translation: true },
      }),
      transformErrorResponse: error => error,
      invalidatesTags: ["Merchants"],
    }),
  }),
})

export const {
  useMerchantsQuery,
  useCreateBusinessDetailsMutation,
  useCreateMerchantRepresentativeMutation,
  useMerchantNidMutation,
} = merchantServiceApi
