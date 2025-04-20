// TypeScript type support
export interface MerchantPaymentServicePayload {
  api_key: { api_key: string; secret: string }
  bank_rate: string
  financial_organization_id: number
  is_active: boolean
  is_custom_rate: boolean
  merchant_id: number
  moneybag_rate: string
  note: string
  payment_provider_id: number
  rate_type: string
  total_rate: string
}

import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

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
    merchantNid: builder.query({
      query: params => ({
        url: "merchants/nid-details",
        params: formatParams(params),
      }),
      transformErrorResponse: error => error,
      providesTags: ["Merchants"],
    }),
    createMerchantPaymentService: builder.mutation({
      query: (payload: MerchantPaymentServicePayload) => ({
        url: "payment-configs/merchant-payment-services",
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: error => error,
    }),
    createMerchantBankAccount: builder.mutation({
      query: ({
        merchantId,
        ...payload
      }: {
        merchantId: number
        account_name: string
        account_number: string
        branch_id: number
        notes: string
      }) => ({
        url: `banks/accounts/merchant/${merchantId}/`,
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: error => error,
    }),
    // /api/v2/merchants/categories
    merchantCategories: builder.query({
      query: params => ({
        url: "merchants/categories",
        params: formatParams(params),
      }),
      transformErrorResponse: error => error,
    }),
  }),
})

export const {
  useMerchantsQuery,
  useCreateBusinessDetailsMutation,
  useCreateMerchantRepresentativeMutation,
  useMerchantNidQuery,
  useCreateMerchantPaymentServiceMutation,
  useCreateMerchantBankAccountMutation,
} = merchantServiceApi
