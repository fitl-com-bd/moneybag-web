import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const merchantSetupApi = createApi({
  reducerPath: "merchantSetupApi",
  baseQuery,
  tagTypes: ["Merchants"],
  endpoints: builder => ({
    // customers: builder.query({
    //   query: params => ({
    //     url: `merchant/customers`,
    //     params: formatParams(params),
    //   }),
    //   transformResponse: (response: any) => response.data.customers,
    //   transformErrorResponse: error => error,
    //   providesTags: ["Customers"],
    // }),
    // createCustomer: builder.mutation({
    //   query: body => ({
    //     url: `merchant/create-customer`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["Customers"],
    // }),
    // customer: builder.query({
    //   query: id => `merchant/customer/${id}`,
    //   transformResponse: (response: any) => response.customer,
    //   transformErrorResponse: error => error,
    // }),
    // https://dev-api.moneybag.com.bd/api/v1/users/list-users
    merchants: builder.query({
      query: params => ({
        url: `users/list-users`,
        params: formatParams(params),
      }),
      // transformResponse: (response: any) => response.data.users,
      transformErrorResponse: error => error,
      providesTags: ["Merchants"],
    }),
  }),
})

export const {
  useMerchantsQuery,
  // useCreateCustomerMutation,
  // useCustomerQuery,
  // useCustomersQuery,
} = merchantSetupApi
