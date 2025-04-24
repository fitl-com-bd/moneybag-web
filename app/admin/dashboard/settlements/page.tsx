"use client"
import { DataTablePage } from "@/components/shared"
import { Icon } from "@/components/ui"
import { useSettlementsQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { CButton, CTooltip } from "@coreui/react"
import Link from "next/link"

const columns: DataTableColumn = [
  {
    name: "ORDER ID",
    selector: row => row.order_id,
    sortable: true,
  },
  {
    name: "TRANSACTION",
    selector: row => row.transaction_name,
  },
  {
    name: "MERCHANT ID",
    selector: row => row.merchant_id,
  },
  {
    name: "DATE",
    selector: row => row.date,
  },
  {
    name: "ORDER AMOUNT",
    selector: row => row.order_amount,
  },
  {
    name: "BANK SETTLEMENT AMOUNT",
    selector: row => row.bank_settlement_amount,
  },
  {
    name: "TRANSACTION STATUS",
    selector: row => row.transaction_status,
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
    apiFunction={useSettlementsQuery}
    title="Settlement List"
    columns={columns}
    actionsProps={{
      href: "/dashboard/banks/create",
    }}
  />
)

export default Bank
