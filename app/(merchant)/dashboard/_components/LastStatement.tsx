"use client"
import { LoadingTable } from "@/components/ui"
import { useMerchantTransactionsQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { formatPrice } from "@/utils"
import moment from "moment"
import DataTable from "react-data-table-component"

const columns: DataTableColumn = [
  {
    name: "SL",
    selector: (row: any, index?: number) => (index !== undefined ? index + 1 : ""),
    width: "55px",
  },
  {
    name: "Order ID",
    selector: (row: any) => row.merchant_tran_id,
    minWidth: "135px;",
  },
  {
    name: "Creation date",
    selector: (row: any) => moment(row.gw_txn_timestamp).format("lll"),
    minWidth: "160px",
  },
  {
    name: "Order Amount",
    selector: (row: any) => formatPrice(row.merchant_order_amount),
  },
  {
    name: "Refund Amount",
    selector: (row: any) => formatPrice(row.refund_amount ? row.refund_amount : 0),
  },
  {
    name: "MSF Fee",
    selector: (row: any) => formatPrice(row.pgw_charge + row.bank_charge),
  },
  {
    name: "Payment Mode",
    selector: (row: any) => row.paymode || "--",
  },
  {
    name: "Settlement Amount",
    selector: (row: any) => formatPrice(row.settlement_amount),
  },

  {
    name: "Settlement Status",
    selector: (row: any) => "--",
  },

  {
    name: "Order Status",
    selector: (row: any) => row.status,
  },
]

export const LastStatement = () => {
  const { data, isLoading } = useMerchantTransactionsQuery({
    status: "SUCCESS",
  })

  return (
    <div className="shadow-sm bg-white border-0 rounded overflow-hidden d-flex flex-column">
      <DataTable
        className=""
        title="Recent Transactions"
        columns={columns}
        data={(data?.data || [])?.slice(0, 10)}
        pagination={false}
        progressPending={isLoading}
        // style={{ height: "588px" }}
        progressComponent={<LoadingTable className="w-100 mx-3 mb-2" />}
      />
    </div>
  )
}
