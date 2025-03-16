import { Nav, NavItem, SectionHeader } from "@/components/ui"
import React, { FC, Fragment, ReactNode, useState } from "react"

export type TabItem = NavItem & {
  component?: FC
}

type TabsProps = {
  items: TabItem[]
}

export const Tabs: FC<TabsProps> = ({ items = [] }) => {
  const [tab, setTab] = useState(items.length > 0 ? items[0].value : "")
  const selectedTab = items.find(item => item.value === tab)
  const TabComponent = selectedTab?.component || Fragment

  return (
    <div className="d-flex">
      <div className="">
        <h5 className="text-lg mb-6">Add New Merchant</h5>
        <Nav items={items} value={tab} setValue={setTab} />
      </div>
      <div className="flex-1">
        <SectionHeader
          title="Define Your Business Structure"
          subtitle="Provide details about the type and category of your business to help us understand your operations better."
        />
        <div className="tab-container">
          <TabComponent />
        </div>
      </div>
    </div>
  )
}
