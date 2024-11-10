import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery,
  tagTypes: ["Customers"],
  endpoints: builder => ({
    customers: builder.query({
      query: params => ({
        url: `merchant/customers`,
        params: formatParams(params),
      }),
      transformResponse: (response: any) => response.data.customers,
      transformErrorResponse: error => error,
      providesTags: ["Customers"],
    }),
    createCustomer: builder.mutation({
      query: body => ({
        url: `merchant/create-customer`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Customers"],
    }),
    customer: builder.query({
      query: id => `merchant/customer/${id}`,
      transformResponse: (response: any) => response.customer,
      transformErrorResponse: error => error,
    }),
  }),
})

export const { useCustomersQuery, useCreateCustomerMutation, useCustomerQuery } = customerApi
