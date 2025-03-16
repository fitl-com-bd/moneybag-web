"use client"
import { DataTablePage } from "@/components/shared"
import { Icon } from "@/components/ui"
import { usePermissionsQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { CButton, CTooltip } from "@coreui/react"
import Link from "next/link"

const columns: DataTableColumn = [
  {
    name: "Name",
    sortable: true,
    selector: row => row.first_name + " " + row.last_name,
  },
  {
    name: "User Id",
    selector: row => row.user_id,
  },
  {
    name: "Email",
    selector: row => row.email,
  },
  {
    name: "Role",
    selector: row => row?.role || "-",
  },
  {
    name: "Status",
    selector: row => row.status,
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
      href: "/dashboard/permissions/create",
      name: "Create Permission",
      // icon: "addUser",
    }}
  />
)

export default Permissions
