"use client"
import { Card, FormLabel, TabItem, Tabs } from "@/components/ui"
import { CCol, CFormControlWrapper, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from "@coreui/react"
import BusinessStructure from "./_components/BusinessStructure"

const tabItems: TabItem[] = [
  {
    label: "Business Structure",
    value: "business_structure",
    component: BusinessStructure,
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
