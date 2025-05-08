"use client"
import { CopyPaymentLink, DataTableActions, EmailToCustomer } from "@/components/shared"
import { Icon, LoadingTable } from "@/components/ui"
import { LS_TERMS_AND_CONDITIONS } from "@/constants"
import { useInvoicesQuery } from "@/store"
import { formatCurrency } from "@/utils"
import { CBadge, CButton, CTooltip } from "@coreui/react"
import moment from "moment"
import Link from "next/link"
import { useState } from "react"
import DataTable from "react-data-table-component"
import { InvoiceFilter } from "./_components/InvoiceFilter"
import { column } from "./_components/column"

const Invoice = () => {
  const [params, setParams] = useState({})
  const { data: invoice, isLoading } = useInvoicesQuery(params)
  const [showCopyPaymentLink, setShowCopyPaymentLink] = useState(false)
  const [showEmailToCustomer, setShowEmailToCustomer] = useState(false)
  const [filter, setFilter] = useState(false)

  const showCopyPaymentLinkModal = () => setShowCopyPaymentLink(true)
  const showEmailToCustomerModal = (data: any) => () => setShowEmailToCustomer(data)

  if (invoice?.length > 0) localStorage.setItem(LS_TERMS_AND_CONDITIONS, invoice[0].terms_and_conditions || "")

  return (
    <div className="data-table-wrapper bg-white border-0 rounded overflow-hidden flex-1 p-3">
      <CopyPaymentLink show={showCopyPaymentLink} setShow={setShowCopyPaymentLink} />
      <EmailToCustomer show={showEmailToCustomer} setShow={setShowEmailToCustomer} />
      <DataTable
        title="Invoice List"
        columns={column({
          showCopyPaymentLinkModal,
          showEmailToCustomerModal,
        })}
        data={invoice}
        pagination={50 as any}
        progressPending={isLoading}
        progressComponent={<LoadingTable className="w-100 mx-3 mb-2" />}
        actions={
          <DataTableActions
            name="Create Invoice"
            href="/dashboard/invoice/create"
            icon="addInvoice"
            // filter={filter}
            // setFilter={setFilter}
          />
        }
        subHeader
        subHeaderWrap={false}
        subHeaderComponent={<InvoiceFilter filter={filter} setParams={setParams} />}
      />
    </div>
  )
}

export default Invoice
