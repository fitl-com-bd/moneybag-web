"use client"
import { formatPrice, getStatusColor } from "@/utils"
import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react"
import moment from "moment"
import DataTable from "react-data-table-component"

type Props = {
  visible: any
  setVisible: (value: boolean) => void
}

const column = [
  {
    name: "Order ID",
    selector: (row: any) => row.merchant_tran_id,
    sortable: true,
    minWidth: "135px;",
  },
  {
    name: "Transaction ID",
    selector: (row: any) => row.txn_id,
    sortable: true,
    minWidth: "200px;",
  },
  {
    name: "Transaction Date",
    selector: (row: any) => moment(row.gw_txn_timestamp).format("lll"),
    sortable: true,
    width: "160px;",
  },
  {
    name: "Order Amount",
    selector: (row: any) => formatPrice(row.merchant_order_amount),
    sortable: true,
  },
  {
    name: "MSF Fee",
    selector: (row: any) => formatPrice(row.pgw_fee + row.bank_fee),
  },
  {
    name: "Refund Amount",
    selector: (row: any) => formatPrice(row.refund_amount ? row.refund_amount : 0),
    sortable: true,
  },
  {
    name: "Settlement Amount",
    selector: (row: any) => formatPrice(row.settlement_amount),
    sortable: true,
  },
]

export const SettlementReportDetails = ({ visible, setVisible }: Props) => {
  console.log(`🔥 | visible:`, visible)

  return (
    <CModal visible={visible} onClose={() => setVisible(false)} size="xl">
      <CModalHeader>
        <CModalTitle className="text-danger">Settled Transaction Details</CModalTitle>
      </CModalHeader>
      <CModalBody className="px-0">
        <DataTable title="" data={visible} columns={column} pagination={false} />
      </CModalBody>
    </CModal>
  )
}
