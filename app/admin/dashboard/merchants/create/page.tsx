"use client"
import { TabItem, Tabs } from "@/components/ui"
import { useState } from "react"
import { BusinessDetails } from "./_components/BusinessDetails"
import { BusinessRepresentative } from "./_components/BusinessRepresentative"
import { PaymentService } from "./_components/PaymentService"
import { SettlementBank } from "./_components/SettlementBank"

const tabItems = (tabProps: any = {}): TabItem[] => [
  {
    label: "Business Details",
    value: "business_details",
    component: () => <BusinessDetails {...tabProps} />,
  },
  {
    label: "Business Representative",
    value: "business_representative",
    component: () => <BusinessRepresentative {...tabProps} />,
  },
  {
    label: "Payment Service",
    value: "payment_service",
    component: () => <PaymentService {...tabProps} />,
  },
  {
    label: "Settlement Bank",
    value: "settlement_bank",
    component: () => <SettlementBank {...tabProps} />,
  },
]

const MerchantDetails = () => {
  const [merchantId, setMerchantId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("business_details")

  const changeTab = (value: string) => setActiveTab(value)

  return (
    <Tabs
      title="Add New Merchant"
      items={tabItems({ merchantId, setMerchantId, changeTab })}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  )
}

export default MerchantDetails
