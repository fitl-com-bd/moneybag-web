"use client"
import { DataTablePage } from "@/components/shared"
import { Icon } from "@/components/ui"
import { useFinancialOrganizationsQuery, useUsersQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { CButton, CTooltip } from "@coreui/react"
import moment from "moment"
import Link from "next/link"

const columns: DataTableColumn = [
  {
    name: "Name",
    sortable: true,
    selector: row => row.first_name + " " + row.last_name,
  },
  {
    name: "USER ID",
    selector: row => row.user_id,
  },
  {
    name: "EMAIL",
    selector: row => row.email,
    width: "190px",
  },
  {
    name: "PHONE",
    selector: row => row.phone,
    width: "150px",
  },
  {
    name: "STATUS",
    selector: row => row.status,
  },
  {
    name: "DATE CREATED",
    selector: row => moment(row.account_created_at).format("lll"),
    width: "170px",
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

const MerchantUserList = () => (
  <DataTablePage
    apiFunction={useUsersQuery}
    defaultParams={{ merchant_user: true }}
    title="Merchant User List"
    columns={columns}
    actionsProps={{
      href: "/dashboard/banks/create",
    }}
  />
)

export default MerchantUserList
