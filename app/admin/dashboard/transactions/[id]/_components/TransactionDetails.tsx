import { Button, Card, FormFooter, SectionHeader } from "@/components/ui"
import { formatPrice } from "@/utils"

export const TransactionDetails = ({ id, data }: any) => {
  console.log(`🔥 | data:`, data)

  return (
    <>
      <SectionHeader
        title="Transaction Details"
        subtitle="Comprehensive breakdown of transaction data, including fees, settlement, and status."
      />
      <Card>
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Transaction ID:</div>
          <div className="col-span-2 p-2.5">{data?.transaction_id}</div>
          <div className="fw-semibold p-2.5">Transaction Date:</div>
          <div className="col-span-2 p-2.5">{data?.transaction_date}</div>
          <div className="fw-semibold p-2.5">Order ID:</div>
          <div className="col-span-2 p-2.5">{data?.order_id}</div>
          <div className="fw-semibold p-2.5">Merchant Name & MSN:</div>
          <div className="col-span-2 p-2.5">
            {data?.merchant_name} ({data?.merchant_msn})
          </div>
          <div className="fw-semibold p-2.5">Transaction Status:</div>
          <div className="col-span-2 p-2.5">{data?.transaction_status}</div>
          <div className="fw-semibold p-2.5">Settlement Status:</div>
          <div className="col-span-2 p-2.5">{data?.settlement_status}</div>
          <div className="fw-semibold p-2.5">Settlement Date:</div>
          <div className="col-span-2 p-2.5">{data?.settlement_date}</div>
          <div className="fw-semibold p-2.5">Payment Mode:</div>
          <div className="col-span-2 p-2.5">{data?.payment_mode}</div>
          <div className="fw-semibold p-2.5">Gateway Provider:</div>
          <div className="col-span-2 p-2.5">{data?.gateway_provider}</div>
        </div>
        <hr />
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Order Amount:</div>
          <div className="col-span-2 p-2.5">{formatPrice(data?.order_amount)}</div>
          <div className="fw-semibold p-2.5">Gateway Fee:</div>
          <div className="col-span-2 p-2.5">{formatPrice(data?.gateway_fee)}</div>
          <div className="fw-semibold p-2.5">Moneybag Fee:</div>
          <div className="col-span-2 p-2.5">{formatPrice(data?.moneybag_fee)}</div>
          <div className="fw-semibold p-2.5">Refund Amount:</div>
          <div className="col-span-2 p-2.5">{formatPrice(data?.refund_amount)}</div>
          <div className="fw-semibold p-2.5">Collection Amount:</div>
          <div className="col-span-2 p-2.5">{formatPrice(data?.collection_amount)}</div>
          <div className="fw-semibold p-2.5">Bank Settlement Amount:</div>
          <div className="col-span-2 p-2.5">{formatPrice(data?.bank_settlement_amount)}</div>
        </div>
        <hr />
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Customer Name:</div>
          <div className="col-span-2 p-2.5">{data?.customer_name}</div>
          <div className="fw-semibold p-2.5">Customer Email:</div>
          <div className="col-span-2 p-2.5">{data?.customer_email}</div>
          <div className="fw-semibold p-2.5">Customer Phone:</div>
          <div className="col-span-2 p-2.5">{data?.customer_phone}</div>
          <div className="fw-semibold p-2.5">Merchant Contact:</div>
          <div className="col-span-2 p-2.5">{data?.merchant_contact}</div>
        </div>
      </Card>
      <FormFooter>
        <Button href={`store?id=${id}`}>Edit</Button>
      </FormFooter>
    </>
  )
}
