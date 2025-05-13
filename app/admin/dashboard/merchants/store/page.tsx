"use client"
import { TabItem, Tabs } from "@/components/ui"
import { useParams } from "@/hooks"
import { useMerchantDetailsQuery } from "@/store"
import { isBrowser, scrollToTop } from "@/utils"
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

const getDefaultValues = (data: any, activeTab: string) => {
  let defaultValues = {}
  if (activeTab === "business_details") {
    const hasBusinessDetails = !!data?.business_detail
    if (!hasBusinessDetails) return defaultValues
    defaultValues = {
      bin_no: data?.business_detail?.bin_no || "",
      bleeding: data?.business_detail?.bleeding || false,
      business_desc: data?.business_detail?.business_desc || "",
      business_email: data?.business_detail?.business_email || "",
      business_name: data?.business_detail?.business_name || "",
      business_phone: data?.business_detail?.business_phone || "",
      business_short_name: data?.business_detail?.business_short_name || "",
      business_website: data?.business_detail?.business_website || "",
      city_id: data?.business_detail?.city_id || "",
      district_id: data?.business_detail?.district_id || "",
      division_id: data?.business_detail?.division_id || "",
      legal_identity: data?.business_detail?.legal_identity || "",
      max_ticket_size: data?.business_detail?.max_ticket_size || "",
      merchant_category_id: data?.business_detail?.merchant_category_id || "",
      merchant_status: data?.business_detail?.merchant_status || "active",
      postal_code: data?.business_detail?.postal_code || "",
      street: data?.business_detail?.street || "",
      industry_type: data?.business_detail?.category?.id || "",
    }
  }
  if (activeTab === "business_representative") {
    const hasBusinessRepresentative = !!data?.business_representative
    if (!hasBusinessRepresentative) return defaultValues
    defaultValues = {
      birthdate: data?.business_representative?.birthdate || "",
      city_id: data?.business_representative?.city_id || 1,
      district_id: data?.business_representative?.district_id || 1,
      division_id: data?.business_representative?.division_id || 1,
      email: data?.business_representative?.email || "",
      first_name: data?.business_representative?.first_name || "",
      is_merchant_user: data?.business_representative?.is_merchant_user || false,
      last_name: data?.business_representative?.last_name || "",
      nid_number: data?.business_representative?.nid_number || "",
      password: data?.business_representative?.password || "",
      phone: data?.business_representative?.phone || "",
      postal_code: data?.business_representative?.postal_code || "",
      street: data?.business_representative?.street || "",
    }
  }
  if (activeTab === "payment_service") {
    defaultValues = {
      is_custom_rate: data?.payment_service?.is_custom_rate || false,
      financial_organization_id: data?.payment_service?.financial_organization_id || "",
      rate_type: data?.payment_service?.rate_type || "",
      moneybag_rate: data?.payment_service?.moneybag_rate || "",
      bank_rate: data?.payment_service?.bank_rate || "",
      total_rate: data?.payment_service?.total_rate || "",
      api_key: data?.payment_service?.api_key || "",
      note: data?.payment_service?.note || "",
      is_active: data?.payment_service?.is_active || false,
    }
  }
  if (activeTab === "settlement_bank") {
    defaultValues = {
      account_name: data.settlement_bank?.account_name || "",
      account_number: data.settlement_bank?.account_number || "",
      branch_id: data.settlement_bank?.branch_id || "",
      notes: data.settlement_bank?.notes || "",
    }
  }
  return defaultValues
}

const CreateMerchant = () => {
  const [prams, setParams] = useParams()
  const id = parseInt(prams?.id as string)
  const tab = prams?.tab || "business_details"
  const { data, isFetching, isLoading } = useMerchantDetailsQuery(id as number, {
    skip: !id,
  })

  const changeTab = (value: string) => {
    setParams({ tab: value })
    scrollToTop()
  }

  const defaultValues = getDefaultValues(data, tab)

  return (
    <Tabs
      title="Add New Merchant"
      items={tabItems({ id, changeTab, defaultValues })}
      activeTab={tab}
      onTabChange={changeTab}
    />
  )
}

export default CreateMerchant
