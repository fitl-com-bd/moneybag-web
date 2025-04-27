"use client"
import { DataTablePage } from "@/components/shared"
import { Icon } from "@/components/ui"
import { useBanksQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { CButton, CTooltip } from "@coreui/react"
import Link from "next/link"

const columns: DataTableColumn = [
  {
    name: "BANK NAME",
    selector: row => row.bank.name,
    sortable: true,
  },
  {
    name: "SWIFT CODE",
    selector: row => row.bank.swift_code,
  },
  {
    name: "CONTACT",
    selector: row => row.bank.primary_phone,
  },
  {
    name: "ADDRESS",
    selector: row => row.bank.address,
  },
  {
    name: "TOTAL BRANCHES",
    selector: row => row.total_branches,
  },
  {
    name: "STATUS",
    selector: row => (row.bank.is_active ? "Active" : "Inactive"),
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
    apiFunction={useBanksQuery}
    title="Bank List"
    columns={columns}
    actionsProps={{
      href: "banks/create",
      name: "Create Bank",
      // icon: "addUser",
    }}
  />
)

export default Bank
