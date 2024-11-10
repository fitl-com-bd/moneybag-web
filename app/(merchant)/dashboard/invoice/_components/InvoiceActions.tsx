import { Icon } from "@/components/ui"
import { CButton, CTooltip } from "@coreui/react"
import Link from "next/link"

type InvoiceActionsProps = {
  filter: boolean
  setFilter: (value: boolean) => void
  invoice: any
}

export const InvoiceActions = ({ filter, setFilter, invoice }: InvoiceActionsProps) => {
  return (
    <div className="d-flex gap-2">
      <CTooltip content="Filter">
        <CButton type="button" color={filter ? "dark" : "light"} onClick={() => setFilter(!filter)}>
          <Icon name="filter" size={16} />
        </CButton>
      </CTooltip>
      <CTooltip content="Create Invoice">
        <CButton
          component={Link}
          color="light"
          href="/dashboard/invoice/create"
          // state={{
          //   terms_and_conditions: invoice?.[0]?.terms_and_conditions || "",
          // }}
          className="d-inline-flex align-items-center">
          <Icon name="createInvoice" size={16} className="me-1" />
          Create Invoice
        </CButton>
      </CTooltip>
    </div>
  )
}
