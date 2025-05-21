"use client"
import { useParams } from "@/hooks"
import { useMerchantTransactionDetailsQuery, useTransactionDetailsQuery } from "@/store"
import { scrollToTop } from "@/utils"
import { FC } from "react"

interface TransactionDetailsProps {
  params: {
    id: string
  }
}

const TransactionDetailsPage: FC<TransactionDetailsProps> = ({ params }) => {
  const id = params.id
  const [prams, setParams] = useParams()
  const tab = prams?.tab || "transaction_details"
  const { data, isFetching, isLoading } = useMerchantTransactionDetailsQuery(id)
  console.log(`🔥 | data:`, data)

  const tabProps = { id, data }

  const setActiveTab = (value: string) => {
    setParams({ tab: value })
    scrollToTop()
  }

  // return <Tabs title="Option" items={tabItems(tabProps)} activeTab={tab} onTabChange={setActiveTab} />
  return null
}

export default TransactionDetailsPage
