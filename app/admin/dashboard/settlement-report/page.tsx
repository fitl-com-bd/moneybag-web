"use client"
import { DataTablePage } from "@/components/shared"
import { Icon } from "@/components/ui"
import { useSettlementsQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { CButton, CTooltip } from "@coreui/react"
import Link from "next/link"

const columns: DataTableColumn = [
  {
    name: "SETTLEMENT",
    selector: row => row.settlement_name,
    sortable: true,
  },
  {
    name: "SETTLEMENT ID",
    selector: row => row.settlement_id,
  },
  {
    name: "FROM",
    selector: row => row.settlement_from,
  },
  {
    name: "SETTLEMENT TO",
    selector: row => row.settlement_to,
  },
  {
    name: "COLLECTION AMOUNT",
    selector: row => row.collection_amount,
  },
  {
    name: "BANK FEE",
    selector: row => row.bank_fee,
  },
  {
    name: "PGW FEE",
    selector: row => row.pgw_fee,
  },
  {
    name: "SETTLEMENT AMOUNT",
    selector: row => row.settlement_amount,
  },
  {
    name: "SETTLEMENT DATE",
    selector: row => row.settlement_date,
  },
  {
    name: "EMPLOYEE ID",
    selector: row => row.employee_id,
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
    title="Settlement Report"
    columns={columns}
    actionsProps={{
      href: "/dashboard/banks/create",
    }}
  />
)

export default Bank
