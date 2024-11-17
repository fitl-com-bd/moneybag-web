"use client"
import { StoreInvoice } from "@/components/shared"
import { useInvoiceQuery } from "@/store"

type Props = {
  params: {
    invoiceNo: string
  }
}

const InvoiceEdit = ({ params }: Props) => {
  const invoiceNo = params.invoiceNo
  const {
    data: invoiceData,
    isLoading: isInvoiceLoading,
    isFetching: isInvoiceFetching,
    isError: isInvoiceError,
  } = useInvoiceQuery(invoiceNo)

  if (isInvoiceLoading || isInvoiceFetching) return null

  if (!invoiceData) return null

  return <StoreInvoice edit invoice={invoiceData} />
}

export default InvoiceEdit
