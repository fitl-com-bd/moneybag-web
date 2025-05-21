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
      Settlement_From: moment(transaction.settlement_from).format("lll"),
      Settlement_to: moment(transaction.settlement_to).format("lll"),
      Collection_Amount: formatPrice(transaction.gttl_order_amount),
      PGW_Fee: formatPrice(transaction.gttl_bank_fee + transaction.gttl_pgw_fee),
      Settlement_Amount: formatPrice(transaction.gttl_total_settlement_amount),
      Settlement_Date: moment(transaction.settlement_date).format("lll"),
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
