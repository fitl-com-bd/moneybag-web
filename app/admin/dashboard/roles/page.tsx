"use client"
import { DataTablePage } from "@/components/shared"
import { Icon } from "@/components/ui"
import { useRolesQuery } from "@/store"
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
    selector: row => (row.is_active ? "Active" : "Inactive"),
  },
  {
    name: "Action",
    width: "94px",
    cell: row => (
      <div className="d-flex justify-content-center">
        <CTooltip content="Update">
          <Link href={`/admin/dashboard/roles/${row.id}`}>
            <CButton color="light" size="sm" className="btn-icon">
              <Icon name="edit" size={24} />
            </CButton>
          </Link>
        </CTooltip>
      </div>
    ),
  },
]

const Roles = () => (
  <DataTablePage
    apiFunction={useRolesQuery}
    title="Role List"
    columns={columns}
    actionsProps={{
      href: "/admin/dashboard/roles/create",
      name: "Create Role",
      // icon: "addUser",
    }}
  />
)

export default Roles
