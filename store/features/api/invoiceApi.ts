import { baseQuery } from "@/store/config"
import { formatParams } from "@/utils"
import { createApi } from "@reduxjs/toolkit/query/react"

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery,
  tagTypes: ["Invoices"],
  endpoints: builder => ({
    invoices: builder.query({
      query: params => ({
        url: `merchant/invoices`,
        params: formatParams(params),
      }),
      transformResponse: (response: any) => response.data.invoices,
      transformErrorResponse: error => error,
      providesTags: ["Invoices"],
    }),
    createInvoice: builder.mutation({
      query: body => ({
        url: `merchant/invoices/store`,
        method: "POST",
        body,
      }),
      transformResponse: response => response,
      invalidatesTags: ["Invoices"],
    }),
    editInvoice: builder.mutation({
      query: body => ({
        url: `/public/merchant/invoice/session-updated/${body.uuid}`,
        method: "PUT",
        body,
      }),
      transformResponse: response => response,
      invalidatesTags: ["Invoices"],
    }),
    invoice: builder.query({
      query: invoice_no => ({
        url: `merchant/invoice-by-no`,
        params: { invoice_no },
      }),
      transformResponse: (response: any) => response.data.invoice,
      transformErrorResponse: error => error,
      providesTags: (result, error, invoice_no) => [{ type: "Invoices", id: invoice_no }],
    }),
    sendEmail: builder.mutation({
      query: uuid => ({
        url: `public/merchant/invoice/sending_mail`,
        method: "POST",
        body: {
          uuid,
        },
      }),
      transformResponse: response => response,
      invalidatesTags: ["Invoices"],
    }),
  }),
})

export const {
  useInvoicesQuery,
  useCreateInvoiceMutation,
  useEditInvoiceMutation,
  useInvoiceQuery,
  useSendEmailMutation,
} = invoiceApi
