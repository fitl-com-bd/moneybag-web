"use client"
import { TabItem, Tabs } from "@/components/ui"
import { useState } from "react"
import { AddBranch } from "./_components/AddBranch"
import { BankInformation } from "./_components/BankInformation"

const tabItems = (tabProps: any = {}): TabItem[] => [
  {
    label: "Bank Information",
    value: "bank_information",
    component: () => <BankInformation {...tabProps} />,
  },
  {
    label: "Add Branch",
    value: "add_branch",
    component: () => <AddBranch {...tabProps} />,
  },
]

const CreateBank = () => {
  const [id, setId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("bank_information")

  const changeTab = (value: string) => setActiveTab(value)

  return (
    <Tabs
      title="Add New Bank"
      items={tabItems({ id, setId, changeTab })}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  )
}

export default CreateBank
