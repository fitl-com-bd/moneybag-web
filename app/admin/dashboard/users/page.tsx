"use client"
import { DataTablePage, FilterField } from "@/components/shared"
import { Icon } from "@/components/ui"
import { PAYMENT_STATUS_OPTIONS } from "@/constants"
import { useMerchantsQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { CButton, CTooltip } from "@coreui/react"
import Link from "next/link"

const columns: DataTableColumn = [
  {
    name: "Name",
    sortable: true,
    selector: row => row.user_name,
  },
  {
    name: "User Id",
    selector: row => row.user_id,
  },
  {
    name: "Role",
    selector: row => row?.user_role?.role?.title,
  },
  {
    name: "Status",
    selector: row => (row.is_active == 1 ? "Active" : "Inactive"),
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
    apiFunction={useMerchantsQuery}
    title="User List"
    columns={columns}
    actionsProps={{
      href: "/dashboard/users/create",
      name: "Create User",
      icon: "addUser",
    }}
  />
)

export default Users
