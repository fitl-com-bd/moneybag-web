"use client"
import { Card, FormFooter, SectionHeader } from "@/components/ui"
import { useParams } from "@/hooks"
import { useMerchantTransactionDetailsQuery, useTransactionDetailsQuery } from "@/store"
import { formatPrice, scrollToTop } from "@/utils"
import { FC } from "react"

interface TransactionDetailsProps {
  params: {
    id: string
  }
}

const TransactionDetailsPage: FC<TransactionDetailsProps> = ({ params }) => {
  const id = params.id
  const [prams, setParams] = useParams()
  const tab = prams?.tab || "transaction_details"
  const { data, isFetching, isLoading } = useMerchantTransactionDetailsQuery(id)
  console.log(`🔥 | data:`, data)

  const tabProps = { id, data }

  const setActiveTab = (value: string) => {
    setParams({ tab: value })
    scrollToTop()
  }

  // return <Tabs title="Option" items={tabItems(tabProps)} activeTab={tab} onTabChange={setActiveTab} />
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
          <div className="col-span-2 p-2.5">{data?.initiated_at}</div>
          <div className="fw-semibold p-2.5">Order ID:</div>
          <div className="col-span-2 p-2.5">{data?.payment_session?.order_id}</div>
          <div className="fw-semibold p-2.5">Merchant Name & MSN:</div>
          <div className="col-span-2 p-2.5">Merchant #{data?.payment_session?.merchant_id}</div>
          <div className="fw-semibold p-2.5">Transaction Status:</div>
          <div className="col-span-2 p-2.5">{data?.status}</div>
          <div className="fw-semibold p-2.5">Settlement Status:</div>
          <div className="col-span-2 p-2.5">{data?.is_settled ? "Settled" : "Not Settled"}</div>
          <div className="fw-semibold p-2.5">Settlement Date:</div>
          <div className="col-span-2 p-2.5">{data?.settlement_date || "-"}</div>
          <div className="fw-semibold p-2.5">Payment Mode:</div>
          <div className="col-span-2 p-2.5">{data?.service_charge_details?.provider_name}</div>
          <div className="fw-semibold p-2.5">Gateway Provider:</div>
          <div className="col-span-2 p-2.5">{data?.service_charge_details?.provider_name}</div>
        </div>
        <hr />
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Order Amount:</div>
          <div className="col-span-2 p-2.5">{formatPrice(data?.merchant_order_amount)}</div>
          <div className="fw-semibold p-2.5">Gateway Fee:</div>
          <div className="col-span-2 p-2.5">{formatPrice(data?.service_charge_details?.total_charge)}</div>
          <div className="fw-semibold p-2.5">Moneybag Fee:</div>
          <div className="col-span-2 p-2.5">{formatPrice(data?.service_charge_details?.moneybag_charge)}</div>
          <div className="fw-semibold p-2.5">Refund Amount:</div>
          <div className="col-span-2 p-2.5">0</div>
          <div className="fw-semibold p-2.5">Collection Amount:</div>
          <div className="col-span-2 p-2.5">0</div>
          <div className="fw-semibold p-2.5">Bank Settlement Amount:</div>
          <div className="col-span-2 p-2.5">0</div>
        </div>
        <hr />
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Customer Name:</div>
          <div className="col-span-2 p-2.5">{data?.payment_session?.meta_data?.customer?.name}</div>
          <div className="fw-semibold p-2.5">Customer Email:</div>
          <div className="col-span-2 p-2.5">{data?.payment_session?.meta_data?.customer?.email}</div>
          <div className="fw-semibold p-2.5">Customer Phone:</div>
          <div className="col-span-2 p-2.5">{data?.payment_session?.meta_data?.customer?.phone}</div>
          <div className="fw-semibold p-2.5">Merchant Contact:</div>
          <div className="col-span-2 p-2.5">-</div>
        </div>
      </Card>
    </>
  )
}
export default TransactionDetailsPage
