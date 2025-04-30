"use client"
import { TabItem, Tabs } from "@/components/ui"
import { useRouter, useSearchParams } from "next/navigation"
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
    disabled: () => !tabProps.id, // Disable if id is missing
  },
  {
    label: "Payment Service",
    value: "payment_service",
    component: () => <PaymentService {...tabProps} />,
    disabled: () => !tabProps.id, // Disable if id is missing
  },
  {
    label: "Settlement Bank",
    value: "settlement_bank",
    component: () => <SettlementBank {...tabProps} />,
    disabled: () => !tabProps.id, // Disable if id is missing
  },
]

const MerchantDetails = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get("id")
  const [activeTab, setActiveTab] = useState<string>("business_details")

  const changeTab = (value: string) => {
    setActiveTab(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const setId = (id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("id", id)
    router.push(`?${params.toString()}`)
  }

  return (
    <Tabs
      title="Add New Merchant"
      items={tabItems({ id, setId, changeTab })}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  )
}

export default MerchantDetails
