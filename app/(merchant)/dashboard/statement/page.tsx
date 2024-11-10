"use client"
import { Icon, LoadingTable } from "@/components/ui"
import { useStatementsQuery } from "@/store"
import { getStatusColor } from "@/utils"
import { CBadge, CButton, CTooltip } from "@coreui/react"
import moment from "moment"
import { useState } from "react"
import DataTable from "react-data-table-component"
import { TransactionActions } from "./_components/TransactionActions"
import { TransactionDetails } from "./_components/TransactionDetails"
import { TransactionFilterForm } from "./_components/TransactionFilterForm"

const column: any = ({ openTransactionDetails }: any) => [
  {
    name: "SL",
    selector: (row: any, index: number) => index + 1,
    width: "55px",
  },
  {
    name: "Order ID",
    selector: (row: any) => row.merchant_tran_id,
    minWidth: "135px;",
  },
  // {
  //   name: "Transection ID",
  //   selector: (row) => row.txn_id,
  //   minWidth: "200px;",
  // },
  // {
  //   name: "Merchant Short Name",
  //   sortable: true,
  //   selector: (row) => row.short_name,
  //   minWidth: "70px;",
  // },

  {
    name: "Creation date",
    selector: (row: any) => moment(row.gw_txn_timestamp).format("lll"),
    minWidth: "160px",
  },
  {
    name: "Order Amount",
    selector: (row: any) => row.merchant_order_amount.toFixed(2),
  },
  {
    name: "Refund Amount",
    selector: (row: any) => (row.refund_amount ? row.refund_amount : 0).toFixed(2),
  },
  {
    name: "MSF Fee",
    selector: (row: any) => (row.pgw_charge + row.bank_charge).toFixed(2),
  },
  {
    name: "Payment Mode",
    selector: (row: any) => row.paymode || "--",
  },
  {
    name: "Settlement Amount",
    selector: (row: any) => row.settlement_amount.toFixed(2),
  },

  {
    name: "Settlement Status",
    selector: (row: any) => "--",
  },

  {
    name: "Order Status",
    selector: (row: any) => {
      const badgeColor = row.dispute_status === "P" ? "warning" : getStatusColor(row.gw_order_status)
      const badgeText = row.dispute_status === "P" ? "DISPUTED" : row.gw_order_status

      return (
        <h6>
          <CBadge color={badgeColor} className={`bg-opacity-16 text-${badgeColor}`}>
            {badgeText}
          </CBadge>
        </h6>
      )
    },
  },
  // {
  //   name: "Description",
  //   selector: (row) => row.merchant_description,
  // },
  {
    name: "Action",
    width: "94px",
    selector: (row: any) => (
      <div className="d-flex justify-content-center">
        <CTooltip content="Details">
          <CButton
            color="light"
            size="sm"
            className="btn-icon"
            onClick={() => {
              openTransactionDetails(row)
            }}>
            <Icon name="details" size={24} />
          </CButton>
        </CTooltip>
      </div>
    ),
  },
]

const TransactionList = () => {
  const [showFilter, setShowFilter] = useState(false)
  const [filter, setFilter] = useState<any>({})
  const [transactionDetails, setTransactionDetails] = useState<any>(false)
  const { data: statement, isLoading } = useStatementsQuery(filter)

  const openTransactionDetails = (data: any) => setTransactionDetails(data)

  return (
    <div className="data-table-wrapper shadow-sm bg-white border-0 rounded overflow-hidden p-3">
      <DataTable
        title="Transaction List"
        columns={column({ openTransactionDetails })}
        data={statement}
        pagination={50 as any}
        progressPending={isLoading}
        progressComponent={<LoadingTable className="w-100" />}
        actions={<TransactionActions transactions={statement} filter={showFilter} setFilter={setShowFilter} />}
        subHeader
        subHeaderWrap={false}
        subHeaderComponent={<TransactionFilterForm show={showFilter} filter={filter} setFilter={setFilter} />}
      />
      <TransactionDetails visible={transactionDetails} setVisible={setTransactionDetails} />
    </div>
  )
}

export default TransactionList
