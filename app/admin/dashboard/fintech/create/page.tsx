"use client"
import { TabItem, Tabs } from "@/components/ui"
import { isBrowser } from "@/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { BasicInformation } from "./_components/BasicInformation"
import { Services } from "./_components/Services"
import { SettlementAccount } from "./_components/SettlementAccount"

const tabItems = (tabProps: any = {}): TabItem[] => [
  {
    label: "Basic Information",
    value: "basic_information",
    component: () => <BasicInformation {...tabProps} />,
  },
  {
    label: "Services",
    value: "services",
    component: () => <Services {...tabProps} />,
  },
  {
    label: "Settlement Account",
    value: "settlement_account",
    component: () => <SettlementAccount {...tabProps} />,
  },
]

const CreateFintech = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get("id")
  const [activeTab, setActiveTab] = useState<string>("basic_information")

  const changeTab = (value: string) => {
    setActiveTab(value)
    if (!isBrowser()) return
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const setId = (id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("id", id)
    router.push(`?${params.toString()}`)
  }

  return (
    <Tabs title="Options" items={tabItems({ id, setId, changeTab })} activeTab={activeTab} onTabChange={setActiveTab} />
  )
}

export default CreateFintech
