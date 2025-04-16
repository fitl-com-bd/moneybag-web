"use client"
import { Card, FormLabel, TabItem, Tabs } from "@/components/ui"
import { CCol, CFormControlWrapper, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from "@coreui/react"
import { BusinessDetails } from "./_components/BusinessDetails"
import { BusinessRepresentative } from "./_components/BusinessRepresentative"
import { PaymentService } from "./_components/PaymentService"
import { SettlementBank } from "./_components/SettlementBank"

const tabItems: TabItem[] = [
  {
    label: "Business Details",
    value: "business_details",
    component: BusinessDetails,
  },
  {
    label: "Business Representative",
    value: "business_representative",
    component: BusinessRepresentative,
  },
  {
    label: "Payment Service",
    value: "payment_service",
    component: PaymentService,
  },
  {
    label: "Settlement Bank",
    value: "settlement_bank",
    component: SettlementBank,
  },
]

const MerchantDetails = () => {
  return <Tabs items={tabItems} />
}

export default MerchantDetails
