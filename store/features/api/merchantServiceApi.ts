import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"
// TypeScript type support
export interface MerchantPaymentServicePayload {
  api_key: any
  bank_rate: string
  financial_organization_id?: number
  is_active: boolean
  is_custom_rate: boolean
  merchant_id: number
  moneybag_rate: string
  note?: string
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
  tagTypes: ["Merchants", "PaymentService", "MerchantDetails", "MerchantPaymentService"],
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
        url: "payment-configs/payment-providers",
        params: formatParams(params),
      }),
      transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
      providesTags: ["PaymentService"],
    }),
    // GET: /api/v2/merchants/{merchant_id}/
    merchantDetails: builder.query({
      query: (id: number) => ({
        url: `merchants/${id}/`,
        // params: formatParams({}),
      }),
      transformResponse: (response: any) => response.data,
      transformErrorResponse: error => error,
      providesTags: (result, error, id) => [{ type: "MerchantDetails", id }],
    }),
    // GET: /api/v2/payment-configs/merchant-payment-services?merchant_id=1
    merchantPaymentService: builder.query({
      query: params => ({
        url: "payment-configs/merchant-payment-services",
        params: formatParams({ merchant_id: params.id }),
      }),
      transformErrorResponse: error => error,
      providesTags: (result, error, id) => [{ type: "MerchantPaymentService", id }],
    }),
    // PUT: /api/v2/merchants/{merchant_id}/business-details
    updateBusinessDetails: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `merchants/${id}/business-details`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Merchants"],
    }),
    // PUT: /api/v2/merchants/{merchant_id}/representatives
    updateMerchantRepresentative: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `merchants/${id}/representatives`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Merchants"],
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
  useMerchantDetailsQuery,
  useMerchantPaymentServiceQuery,
  useUpdateBusinessDetailsMutation,
  useUpdateMerchantRepresentativeMutation,
} = merchantServiceApi
