import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "@/store/config"

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery,
  tagTypes: ["Customers"],
  endpoints: builder => ({
    customers: builder.query({
      query: params => ({
        url: `merchant/customers`,
        params,
      }),
      transformResponse: response => response.data.customers,
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
  }),
})

export const { useCustomersQuery, useCreateCustomerMutation } = customerApi
