import { Icon } from "@/components/ui"
import { getStatusColor } from "@/utils"
import { CBadge, CButton, CTooltip } from "@coreui/react"
import moment from "moment"

export const column: any = ({ openDetails }: any) => [
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
              openDetails(row)
            }}>
            <Icon name="details" size={24} />
          </CButton>
        </CTooltip>
      </div>
    ),
  },
]
