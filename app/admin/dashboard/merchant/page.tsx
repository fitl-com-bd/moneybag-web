"use client"
import { DataTablePage } from "@/components/shared"
import { Icon } from "@/components/ui"
import { useMerchantsQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { CButton, CTooltip } from "@coreui/react"
import Link from "next/link"

const columns: DataTableColumn = [
  {
    name: "Merchant Id",
    sortable: true,
    selector: row => row.merchant_id,
  },
  {
    name: "Merchant Name",
    selector: row => row.business_name,
  },
  {
    name: "Person Name",
    sortable: true,
    selector: row => row.first_name + " " + row.last_name,
  },
  {
    name: "Email",
    selector: row => row.email,
  },
  {
    name: "Website",
    selector: row => row.website,
  },
  {
    name: "Status",
    selector: row => (row.is_active === 1 ? "Active" : "Inactive"),
  },
  {
    name: "Action",
    width: "106px",
    cell: row => (
      <div className="d-flex justify-content-center gap-2">
        <CTooltip content="View">
          <Link href={`merchant/${row.id}`}>
            <CButton color="light" size="sm" className="btn-icon">
              <Icon name="view" size={24} />
            </CButton>
          </Link>
        </CTooltip>
        <CTooltip content="Update">
          <Link href={`merchant/${row.id}/edit`}>
            <CButton color="light" size="sm" className="btn-icon">
              <Icon name="edit" size={24} />
            </CButton>
          </Link>
        </CTooltip>
      </div>
    ),
  },
]

const Merchants = () => (
  <DataTablePage
    apiFunction={useMerchantsQuery}
    title="Merchant List"
    columns={columns}
    search
    statusOptions={[
      { label: "Active", value: "1" },
      { label: "Inactive", value: "0" },
    ]}
    actionsProps={{
      href: "merchant/create",
    }}
  />
)

export default Merchants
