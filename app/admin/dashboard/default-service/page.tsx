"use client"
import { DataTablePage } from "@/components/shared"
import { Icon } from "@/components/ui"
import { useDefaultPaymentServicesQuery, useFinancialOrganizationsQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { CButton, CTooltip } from "@coreui/react"
import Link from "next/link"

const columns: DataTableColumn = [
  {
    name: "SL",
    selector: (row: any, index?: number) => (index !== undefined ? index + 1 : 0),
    width: "55px",
  },
  {
    name: "SERVICE",
    selector: row => row.payment_provider.name,
    sortable: true,
  },
  {
    name: "FINTECH",
    selector: row => row.financial_organizations?.map((f: any) => f.name)?.join(", "),
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
    apiFunction={useDefaultPaymentServicesQuery}
    title="Default Service List"
    columns={columns}
    actionsProps={{
      href: "default-service/assign",
      name: "Assign New",
    }}
  />
)

export default Bank
