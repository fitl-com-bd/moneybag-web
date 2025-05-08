"use client"
import { TabItem, Tabs } from "@/components/ui"
import { useParams } from "@/hooks"
import { useMerchantDetailsQuery } from "@/store"
import { isBrowser } from "@/utils"
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
  const { data, isFetching, isLoading } = useMerchantDetailsQuery(id as number, {
    skip: !id,
  })
  const defaultValues = {
    bin_no: data?.business_detail?.bin_no || "",
    bleeding: data?.business_detail?.bleeding || false,
    business_desc: data?.business_detail?.business_desc || "",
    business_email: data?.business_detail?.business_email || "",
    business_name: data?.business_detail?.business_name || "",
    business_phone: data?.business_detail?.business_phone || "",
    business_short_name: data?.business_detail?.business_short_name || "",
    business_website: data?.business_detail?.business_website || "",
    city_id: data?.business_detail?.city_id || 1,
    district_id: data?.business_detail?.district_id || 1,
    division_id: data?.business_detail?.division_id || 1,
    legal_identity: data?.business_detail?.legal_identity || "",
    max_ticket_size: data?.business_detail?.max_ticket_size || 0,
    merchant_category_id: data?.business_detail?.merchant_category_id || 1,
    merchant_status: data?.business_detail?.merchant_status || "active",
    postal_code: data?.business_detail?.postal_code || "",
    street: data?.business_detail?.street || "",
  }

  const changeTab = (value: string) => {
    setActiveTab(value)
    if (!isBrowser()) return
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <Tabs
      title="Add New Merchant"
      items={tabItems({ id, setId, changeTab, defaultValues })}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  )
}

export default CreateMerchant
