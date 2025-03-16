"use client"
import { Card, TabItem, Tabs } from "@/components/ui"

const tabItems: TabItem[] = [
  {
    label: "Business Structure",
    value: "business_structure",
    component: () => (
      <Card>
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Business Name:</div>
          <div className="col-span-2 p-2.5">Full business Name Here</div>
          <div className="fw-semibold p-2.5">Business Short Name:</div>
          <div className="col-span-2 p-2.5">Sort Name (Business)</div>
          <div className="fw-semibold p-2.5">BIN No:</div>
          <div className="col-span-2 p-2.5">1234</div>
        </div>
        <hr />
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Business Name:</div>
          <div className="col-span-2 p-2.5">Full business Name Here</div>
          <div className="fw-semibold p-2.5">Business Short Name:</div>
          <div className="col-span-2 p-2.5">Sort Name (Business)</div>
          <div className="fw-semibold p-2.5">BIN No:</div>
          <div className="col-span-2 p-2.5">1234</div>
        </div>
      </Card>
    ),
  },
  {
    label: "Business Details",
    value: "business_details",
  },
  {
    label: "Business Representative",
    value: "business_representative",
  },
  {
    label: "Settlement Bank",
    value: "settlement_bank",
  },
  {
    label: "Merchant Service",
    value: "merchant_service",
  },
]

const MerchantDetails = () => {
  return <Tabs items={tabItems} />
}

export default MerchantDetails
