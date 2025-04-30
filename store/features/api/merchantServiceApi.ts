import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"
// TypeScript type support
interface MerchantPaymentServicePayload {
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

interface MerchantNid {
  date_of_birth: string
  nid_number: string
}

export const merchantServiceApi = createApi({
  reducerPath: "merchantServiceApi",
  baseQuery,
  tagTypes: ["Merchants", "PaymentService"],
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
      query: ({ id, ...data }) => ({
        url: `merchants/${id}/representatives`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Merchants"],
    }),
    // /api/v2/merchants/nid-details
    merchantNid: builder.mutation({
      query: (payload: MerchantNid) => ({
        url: "merchants/nid-details",
        method: "POST",
        body: { ...payload, english_translation: true },
      }),
      transformErrorResponse: error => error,
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
        id,
        ...payload
      }: {
        id: number
        account_name: string
        account_number: string
        branch_id: number
        notes: string
      }) => ({
        url: `banks/accounts/merchant/${id}/`,
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
      transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
    }),
    // GET: /payment-providers
    paymentProviders: builder.query({
      query: params => ({
        url: "payment-providers",
        params: formatParams(params),
      }),
      transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
      providesTags: ["PaymentService"],
    }),
  }),
})

export const {
  useMerchantsQuery,
  useCreateBusinessDetailsMutation,
  useCreateMerchantRepresentativeMutation,
  useMerchantNidMutation,
  useCreateMerchantPaymentServiceMutation,
  useCreateMerchantBankAccountMutation,
  useMerchantCategoriesQuery,
  usePaymentProvidersQuery,
} = merchantServiceApi
