"use client"
import { Card, TabItem, Tabs } from "@/components/ui"
import { CFormLabel, CFormSelect } from "@coreui/react"

const businessOption = [
  "Educational Institute",
  "Public Limited",
  "Partnership",
  "Proprietorship",
  "Non Profit",
  "Private Limited",
]

const tabItems: TabItem[] = [
  {
    label: "Business Structure",
    value: "business_structure",
    component: () => (
      <Card>
        <CFormLabel className="col-form-label">Legal Identity of Company</CFormLabel>
        <CFormSelect aria-label="Default select example" type="number">
          <option value="">Select One</option>
          {businessOption.map((country, index) => (
            <option value={country} key={index}>
              {country}
            </option>
          ))}
        </CFormSelect>
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
