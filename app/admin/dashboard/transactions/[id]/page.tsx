"use client"
import { TabItem, Tabs } from "@/components/ui"
import { useParams } from "@/hooks"
import { useMerchantDetailsQuery, useTransactionDetailsQuery } from "@/store"
import { scrollToTop } from "@/utils"
import { FC } from "react"
import { BankResponse } from "./_components/BankResponse"
import { TransactionDetails } from "./_components/TransactionDetails"

interface MerchantDetailsProps {
  params: {
    id: string
  }
}

const tabItems = (tabProps: any = {}): TabItem[] => [
  {
    label: "Transaction Details",
    value: "transaction_details",
    component: () => <TransactionDetails {...tabProps} />,
  },
  {
    label: "Bank Response",
    value: "bank_response",
    component: () => <BankResponse {...tabProps} />,
  },
]

const TransactionDetailsPage: FC<MerchantDetailsProps> = ({ params }) => {
  const id = parseInt(params.id)
  const [prams, setParams] = useParams()
  const tab = prams?.tab || "transaction_details"
  const { data, isFetching, isLoading } = useTransactionDetailsQuery(id)
  console.log(`🔥 | data:`, data)

  const tabProps = { id, data }

  const setActiveTab = (value: string) => {
    setParams({ tab: value })
    scrollToTop()
  }

  return <Tabs title="Option" items={tabItems(tabProps)} activeTab={tab} onTabChange={setActiveTab} />
}

export default TransactionDetailsPage
