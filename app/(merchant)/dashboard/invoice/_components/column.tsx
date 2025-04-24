import { Icon } from "@/components/ui"
import { formatCurrency } from "@/utils"
import { CBadge, CButton, CTooltip } from "@coreui/react"
import moment from "moment"
import Link from "next/link"

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
