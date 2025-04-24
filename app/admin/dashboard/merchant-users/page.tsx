"use client"
import { DataTablePage } from "@/components/shared"
import { Icon } from "@/components/ui"
import { useFinancialOrganizationsQuery, useUsersQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { CButton, CTooltip } from "@coreui/react"
import Link from "next/link"

const columns: DataTableColumn = [
  {
    name: "FINTECH NAME",
    selector: row => row.name,
    sortable: true,
  },
  {
    name: "SHORT NAME",
    selector: row => row.short_name,
  },
  {
    name: "SERVICE TYPE",
    selector: row => row.organization_type,
  },
  {
    name: "COUNTRY",
    selector: row => row.country,
  },
  {
    name: "SERVICES",
    selector: row => row.processor_name,
  },
  {
    name: "STATUS",
    selector: row => (row.is_active ? "Active" : "Inactive"),
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
    apiFunction={useUsersQuery}
    title="Merchant User List"
    columns={columns}
    actionsProps={{
      href: "/dashboard/banks/create",
    }}
  />
)

export default Bank
