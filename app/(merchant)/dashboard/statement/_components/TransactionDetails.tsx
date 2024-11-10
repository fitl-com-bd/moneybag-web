import { getStatusColor } from "@/utils"
import { CBadge, CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react"
import moment from "moment"

type TransactionDetailsProps = {
  visible: any
  setVisible: (value: boolean) => void
}

export const TransactionDetails = ({ visible, setVisible }: TransactionDetailsProps) => {
  const badgeColor = visible?.dispute_status == "P" ? "warning" : getStatusColor(visible?.gw_order_status)
  return (
    <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
      <CModalHeader>
        <CModalTitle className="text-danger">Transection Details</CModalTitle>
      </CModalHeader>
      <CModalBody className="px-0">
        <div className="d-grid grid-cols-3 px-3 pb-3">
          <div className="fw-bold p-2.5 border-bottom">Order number</div>
          <div className="col-span-2 p-2.5 border-bottom">{visible?.gw_order_id}</div>
          <div className="fw-bold p-2.5 border-bottom">Merchant Name</div>
          <div className="col-span-2 p-2.5 border-bottom">{visible?.merchant_name}</div>
          <div className="fw-bold p-2.5 border-bottom">TXN No</div>
          <div className="col-span-2 p-2.5 border-bottom">{visible?.txn_id}</div>
          <div className="fw-bold p-2.5 border-bottom">Session ID</div>
          <div className="col-span-2 p-2.5 border-bottom">{visible?.gw_session_id}</div>
          <div className="fw-bold p-2.5 border-bottom">Status</div>
          <div className="col-span-2 p-2.5 border-bottom">
            <CBadge color={badgeColor} className={`bg-opacity-16 text-${badgeColor}`}>
              {visible?.dispute_status == "P" ? "DISPUTED" : visible?.gw_order_status}
            </CBadge>
          </div>
          <div className="fw-bold p-2.5 border-bottom">Creation date</div>
          <div className="col-span-2 p-2.5 border-bottom">{moment(visible?.created_at).format("lll")}</div>
          <div className="fw-bold p-2.5 border-bottom">Amount</div>
          <div className="col-span-2 p-2.5 border-bottom">{visible?.merchant_order_amount}</div>
          <div className="fw-bold p-2.5 border-bottom">Refund Amount</div>
          <div className="col-span-2 p-2.5 border-bottom">
            {visible?.refund_amount ? visible?.refund_amount - visible?.pgw_charge : 0}
          </div>
          <div className="fw-bold p-2.5 border-bottom">Payable Amount</div>
          <div className="col-span-2 p-2.5 border-bottom">
            {visible?.refund_amount
              ? visible?.merchant_order_amount - visible?.refund_amount
              : visible?.merchant_order_amount}
          </div>
          <div className="fw-bold p-2.5 border-bottom">Settelement Status</div>
          <div className="col-span-2 p-2.5 border-bottom">
            {visible?.settlement_flag == 1 ? "Settled" : "Unsettled"}
          </div>
          {visible?.settlement_flag == 1 && (
            <>
              <div>Pay Date</div>
              <div className="col-span-2 p-2.5 border-bottom">{moment(visible?.settlement_date).format("lll")}</div>
            </>
          )}
          <div className="fw-bold p-2.5 border-bottom">Description</div>
          <div className="col-span-2 p-2.5 border-bottom">{visible?.merchant_description}</div>
        </div>
      </CModalBody>
    </CModal>
  )
}
