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

export const column: any = ({ showCopyPaymentLinkModal, showEmailToCustomerModal }: any) => [
  {
    name: "SL",
    selector: (row: any, index: number) => index + 1,
    width: "55px",
  },
  {
    name: "Invoice No",
    selector: (row: any) => row.invoice_no,
    minWidth: "135px;",
  },
  {
    name: "Invoice Date",
    selector: (row: any) => moment(row.invoice_date).format("lll"),
    minWidth: "150px;",
  },
  {
    name: "Customer",
    selector: (row: any) => row?.customer?.name,
    minWidth: "15px;",
  },
  {
    name: "Amount",
    selector: (row: any) => formatCurrency(row.invoice_amount - (row.gross_discount || 0)),
    minWidth: "40px;",
  },
  {
    name: "Payment Status",
    selector: (row: any) => (
      <CBadge color="primary" className="badge-status">
        {row.invoice_status.toUpperCase()}
      </CBadge>
    ),
    minWidth: "70px;",
  },
  {
    name: "Link Status",
    selector: (row: any) => (
      <CBadge color="primary" className="badge-status">
        {row?.payment_link_status?.toUpperCase()}
      </CBadge>
    ),
    minWidth: "70px;",
  },
  {
    name: "Action",
    width: "200px;",
    selector: (row: any) => (
      <div className="d-flex justify-content-center gap-3">
        <CTooltip content="View">
          <CButton
            component={Link}
            href={`/dashboard/invoice/${row.invoice_no}`}
            color="light"
            size="sm"
            className="btn-icon text-dark-blue">
            <Icon name="view" size={24} />
          </CButton>
        </CTooltip>{" "}
        {row.invoice_status === "due" && (
          <CTooltip content="Edit">
            <CButton
              component={Link}
              href={`/dashboard/invoice/${row.invoice_no}/edit`}
              color="light"
              size="sm"
              className="btn-icon text-complate">
              <Icon name="edit" size={24} />
            </CButton>
          </CTooltip>
        )}
        {/*<CTooltip content="Payment Link">*/}
        {/*  <CButton*/}
        {/*    color="light"*/}
        {/*    size="sm"*/}
        {/*    className="btn-icon text-success"*/}
        {/*    onClick={showCopyPaymentLinkModal}*/}
        {/*  >*/}
        {/*    <Icon name="link" size={24} />*/}
        {/*  </CButton>*/}
        {/*</CTooltip>*/}
        {row?.customer?.email && row.invoice_status === "due" && (
          <CTooltip content="Email To Customer">
            <CButton color="light" size="sm" className="btn-icon text-primary" onClick={showEmailToCustomerModal(row)}>
              <Icon name="email" size={24} />
            </CButton>
          </CTooltip>
        )}
      </div>
    ),
  },
]

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
            filter={filter}
            setFilter={setFilter}
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
