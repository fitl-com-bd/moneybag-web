"use client"
import { CreateCustomer, DataTableActions } from "@/components/shared"
import { Icon, LoadingTable } from "@/components/ui"
import { useCustomersQuery } from "@/store"
import { formatSearch } from "@/utils"
import { CButton, CTooltip } from "@coreui/react"
import Link from "next/link"
import { useState } from "react"
import DataTable from "react-data-table-component"

const columns: any = [
  {
    name: "SL",
    selector: (row: any, index: number) => index + 1,
    width: "55px",
  },
  {
    name: "Name",
    selector: (row: any) => row.name,
    minWidth: "135px;",
  },
  {
    name: "Email",
    selector: (row: any) => row.email,
    minWidth: "200px;",
  },
  {
    name: "Phone",
    selector: (row: any) => row.phone_no,
    minWidth: "70px;",
  },
  {
    name: "Address",
    selector: (row: any) => row.address,
    minWidth: "70px;",
  },
  {
    name: "Action",
    width: "94px",
    selector: (row: any) => (
      <div className="d-flex justify-content-center">
        <CTooltip content="Details">
          <Link href={`/dashboard/customer/${row.id}`}>
            <CButton color="light" size="sm" className="btn-icon">
              <Icon name="details" size={24} />
            </CButton>
          </Link>
        </CTooltip>
      </div>
    ),
  },
]

const CustomerList = () => {
  const [showCreateCustomer, setShowCreateCustomer] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const { data: customer, isLoading } = useCustomersQuery({
    search_key: formatSearch(searchKey),
  })

  return (
    <div className="data-table-wrapper">
      <CreateCustomer show={showCreateCustomer} setShow={setShowCreateCustomer} />
      <DataTable
        title="Customer List"
        columns={columns}
        data={customer}
        pagination={50 as any}
        actions={
          <DataTableActions
            name="Create Customer"
            onClick={() => setShowCreateCustomer(true)}
            icon="addUser"
            search={searchKey}
            onSearchChange={setSearchKey}
            searchPlaceholder="Search (Name, Email, Phone, Address)"
          />
        }
        progressPending={isLoading}
        progressComponent={<LoadingTable className="w-100 mx-3 mb-2" />}
      />
    </div>
  )
}

export default CustomerList
