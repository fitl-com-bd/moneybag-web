"use client"
import { TabItem, Tabs } from "@/components/ui"
import { useMerchantDetailsQuery } from "@/store"
import { FC } from "react"
import { BusinessDetails } from "./_components/BusinessDetails"
import { BusinessRepresentative } from "./_components/BusinessRepresentative"
import { BusinessStructure } from "./_components/BusinessStructure"
import { MerchantUser } from "./_components/MerchantUser"
import { PaymentService } from "./_components/PaymentService"
import { SettlementBank } from "./_components/SettlementBank"

interface MerchantDetailsProps {
  params: {
    id: string
  }
}

const tabItems = (tabProps: any = {}): TabItem[] => [
  {
    label: "Business Details",
    value: "business_details",
    component: () => <BusinessDetails {...tabProps} />,
  },
  {
    label: "Business Structure",
    value: "business_structure",
    component: () => <BusinessStructure {...tabProps} />,
  },
  {
    label: "Business Representative",
    value: "business_representative",
    component: () => <BusinessRepresentative {...tabProps} />,
    disabled: () => !tabProps.id,
  },
  {
    label: "Settlement Bank",
    value: "settlement_bank",
    component: () => <SettlementBank {...tabProps} />,
    disabled: () => !tabProps.id,
  },
  {
    label: "Payment Service",
    value: "payment_service",
    component: () => <PaymentService {...tabProps} />,
    disabled: () => !tabProps.id,
  },
  {
    label: "Merchant User",
    value: "merchant_user",
    component: () => <MerchantUser {...tabProps} />,
    disabled: () => !tabProps.id,
  },
]

const MerchantDetails: FC<MerchantDetailsProps> = ({ params }) => {
  const id = parseInt(params.id)
  const { data, isFetching, isLoading } = useMerchantDetailsQuery(id)
  const tabProps = { id, data }
  // useMerchantDetailsQuery

  return <Tabs items={tabItems(tabProps)} />
}

export default MerchantDetails
