"use client"
import { DataTablePage } from "@/components/shared"
import { Icon } from "@/components/ui"
import { usePermissionsQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { CButton, CTooltip } from "@coreui/react"
import Link from "next/link"

const columns: DataTableColumn = [
  {
    name: "Title",
    sortable: true,
    selector: row => row.title,
  },
  {
    name: "Slug",
    selector: row => row.slug,
  },
  {
    name: "Description",
    selector: row => row.description,
  },
  {
    name: "Status",
    selector: row => (row?.is_enabled ? "Active" : "Inactive"),
  },
  {
    name: "Action",
    width: "94px",
    cell: row => (
      <div className="d-flex justify-content-center">
        <CTooltip content="Update">
          <Link href={`/dashboard/users/${row.id}`}>
            <CButton color="light" size="sm" className="btn-icon">
              <Icon name="edit" size={24} />
            </CButton>
          </Link>
        </CTooltip>
      </div>
    ),
  },
]

const Permissions = () => (
  <DataTablePage
    apiFunction={usePermissionsQuery}
    title="Permission List"
    columns={columns}
    actionsProps={{
      href: "/admin/dashboard/permissions/create",
      name: "Create Permission",
      // icon: "addUser",
    }}
  />
)

export default Permissions
