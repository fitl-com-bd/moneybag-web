import { Icon } from "@/components/ui"
import { formatPrice } from "@/utils"
import { cilDescription, cilPrint } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CButton, CTooltip } from "@coreui/react"
import moment from "moment"
import { CSVLink } from "react-csv"

type TransactionActionsProps = {
  transactions: any
  filter: boolean
  setFilter: (value: boolean) => void
}

export const TransactionActions = ({ transactions, filter, setFilter }: TransactionActionsProps) => {
  const downloadReport = () => {}

  const formatExcelData = (transactions: any[]) =>
    transactions?.map(transaction => ({
      Order_ID: transaction.merchant_tran_id,
      Transaction_ID: transaction.txn_id,
      Merchant_id: transaction.merchant_id,
      Merchant_Name: transaction.merchant_name,
      Merchant_short_name: transaction.short_name,
      Transaction_date: moment(transaction.created_at).format("lll"),
      Order_Amount: formatPrice(transaction.merchant_order_amount),
      Pgw_fee: formatPrice(transaction.bank_charge + transaction.pgw_charge),
      Refund_Amount: transaction.refund_amount || 0,
      Payable_Amount: formatPrice(transaction.merchant_order_amount - transaction.refund_amount),
      Transaction_Status: transaction.gw_order_status,
    })) || []

  return (
    <div>
      <CTooltip content="Filter">
        <CButton
          color={filter ? "dark" : "light"}
          onClick={event => {
            event.preventDefault()
            setFilter(!filter)
          }}>
          <Icon name="filter" size={16} />
        </CButton>
      </CTooltip>
      <CTooltip content="Download PDF">
        <CButton color="light" className="mx-1" onClick={downloadReport}>
          <CIcon icon={cilPrint} />
        </CButton>
      </CTooltip>
      <CTooltip content="Download CSV">
        <CSVLink data={formatExcelData(transactions)} className="btn btn-light" filename={`transation-list${Date()}`}>
          <CIcon icon={cilDescription} />
        </CSVLink>
      </CTooltip>
    </div>
  )
}
