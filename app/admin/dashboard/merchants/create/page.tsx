"use client"
import { TabItem, Tabs } from "@/components/ui"
import { useParams } from "@/hooks"
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

const CreateMerchant = () => {
  const [id, setId] = useParams<number | null>("id", null)
  const [activeTab, setActiveTab] = useParams<string>("tab", "business_details")

  const changeTab = (value: string) => {
    setActiveTab(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
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

export default CreateMerchant
