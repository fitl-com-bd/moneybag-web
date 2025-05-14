"use client"
import { TabItem, Tabs } from "@/components/ui"
import { useParams } from "@/hooks"
import { scrollToTop } from "@/utils"
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
  const [prams, setParams] = useParams()
  const id = parseInt(prams?.id as string)
  const tab = prams?.tab || "basic_information"

  const changeTab = (value: string) => {
    setParams({ tab: value })
    scrollToTop()
  }

  return <Tabs title="Options" items={tabItems({ id, changeTab })} activeTab={tab} onTabChange={changeTab} />
}

export default CreateFintech
