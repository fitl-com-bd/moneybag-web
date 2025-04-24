"use client"
import { DataTablePage } from "@/components/shared"
import { Icon } from "@/components/ui"
import { useTransactionsQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { formatPrice } from "@/utils"
import { CButton, CTooltip } from "@coreui/react"
import moment from "moment"
import Link from "next/link"

const columns: DataTableColumn = [
  {
    name: "TRANSACTION DATE",
    selector: row => moment(row.initiated_at).format("lll"),
    sortable: true,
  },
  {
    name: "TRANSACTION ID",
    selector: row => row.transaction_id,
  },
  {
    name: "MERCHANT ID",
    selector: row => row.payment_session.merchant_id,
  },
  {
    name: "ORDER AMOUNT",
    selector: row => formatPrice(row.merchant_order_amount),
  },
  {
    name: "ORDER ID",
    selector: row => row.payment_session.order_id,
  },
  {
    name: "TRANSACTION STATUS",
    selector: row => row.status,
  },
  {
    name: "SETTLEMENT STATUS",
    selector: row => row.settlement_status,
  },
  {
    name: "PAYMENT MODE",
    selector: row => row.service_charge_details.provider_name,
  },
  {
    name: "GATEWAY",
    selector: row => row.service_charge_details.financial_organization_name,
  },
  {
    name: "Action",
    width: "94px",
    cell: row => (
      <div className="d-flex justify-content-center">
        <CTooltip content="Update">
          <Link href={`/dashboard/banks/${row.id}`}>
            <CButton color="light" size="sm" className="btn-icon">
              <Icon name="edit" size={24} />
            </CButton>
          </Link>
        </CTooltip>
      </div>
    ),
  },
]

const Bank = () => (
  <DataTablePage
    apiFunction={useTransactionsQuery}
    title="Transaction List"
    columns={columns}
    actionsProps={{
      href: "/dashboard/banks/create",
    }}
  />
)

export default Bank
