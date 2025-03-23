"use client"
import { DataTablePage } from "@/components/shared"
import { Icon } from "@/components/ui"
import { useUsersQuery } from "@/store"
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
    selector: row => (!row?.role ? "-" : row.role.title),
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

const Users = () => (
  <DataTablePage
    apiFunction={useUsersQuery}
    title="User List"
    columns={columns}
    actionsProps={{
      href: "/admin/dashboard/users/create",
      name: "Create User",
      icon: "addUser",
    }}
  />
)

export default Users
