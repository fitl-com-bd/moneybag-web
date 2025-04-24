"use client"
import { CopyPaymentLink, EmailToCustomer } from "@/components/shared"
import { LoadingTable } from "@/components/ui"
import { useCustomerQuery } from "@/store"
import { useState } from "react"
import DataTable from "react-data-table-component"
import { column } from "../../invoice/_components/column"

type Props = {
  params: {
    id: string
  }
}

const CustomerDetails = ({ params }: Props) => {
  const customerId = params.id
  const { data: customer, isFetching, isLoading } = useCustomerQuery(customerId)

  const [showCopyPaymentLink, setShowCopyPaymentLink] = useState(false)
  const [showEmailToCustomer, setShowEmailToCustomer] = useState(false)

  const showCopyPaymentLinkModal = () => setShowCopyPaymentLink(true)
  const showEmailToCustomerModal = (data: any) => () => setShowEmailToCustomer(data)

  const { invoice, ...rest } = customer || {
    invoice: [],
  }

  const invoiceList = invoice.map((item: any) => ({
    ...item,
    customer: rest,
  }))

  return (
    <>
      <div className="shadow-sm bg-white border-0 rounded overflow-hidden p-3 mb-4">
        <table className="table ">
          {customer?.name && (
            <tr>
              <th>Customer Name</th>
              <td>:</td>
              <td>{customer?.name}</td>
            </tr>
          )}
          <tr>
            <th>Email</th>
            <td>:</td>
            <td>{customer?.email}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>:</td>
            <td>{customer?.phone_no}</td>
          </tr>
          {customer?.address && (
            <tr>
              <th>Address</th>
              <td>:</td>
              <td>{customer?.address}</td>
            </tr>
          )}
        </table>
      </div>
      <div className="data-table-wrapper  bg-white border-0 rounded overflow-hidden p-3">
        <CopyPaymentLink show={showCopyPaymentLink} setShow={setShowCopyPaymentLink} />
        <EmailToCustomer show={showEmailToCustomer} setShow={setShowEmailToCustomer} />
        <DataTable
          title="Invoice List"
          columns={column({
            showCopyPaymentLinkModal,
            showEmailToCustomerModal,
          })}
          data={invoiceList}
          pagination={50 as any}
          progressPending={isLoading}
          progressComponent={<LoadingTable className="w-100 mx-3 mb-2" />}
        />
      </div>
    </>
  )
}

export default CustomerDetails
