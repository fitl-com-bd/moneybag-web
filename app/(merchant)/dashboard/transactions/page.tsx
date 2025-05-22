"use client"
import { DataTablePage } from "@/components/shared"
import { Icon } from "@/components/ui"
import { useMerchantTransactionsQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { formatPrice } from "@/utils"
import { CButton, CTooltip } from "@coreui/react"
import moment from "moment"
import Link from "next/link"

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
  // {
  //   name: "Description",
  //   selector: (row) => row.merchant_description,
  // },
  {
    name: "Action",
    width: "94px",
    cell: row => (
      <div className="d-flex justify-content-center">
        <CTooltip content="View">
          <Link href={`transactions/${row.transaction_id}`}>
            <CButton color="light" size="sm" className="btn-icon">
              <Icon name="view" size={24} />
            </CButton>
          </Link>
        </CTooltip>
      </div>
    ),
  },
]

const TransactionList = () => {
  return (
    <DataTablePage
      apiFunction={useMerchantTransactionsQuery}
      title="Transaction List"
      columns={columns}
      actionsProps={{}}
    />
  )
}

export default TransactionList
