"use client"
import { Nav, NavItem } from "@/components/ui"
import { FC, Fragment, useState } from "react"

export type TabItem = Omit<NavItem, "disabled"> & {
  component?: FC
  disabled?: boolean | (() => boolean)
}

type TabsProps = {
  title?: string
  items: TabItem[]
  activeTab?: string
  onTabChange?: (value: string) => void
}

export const Tabs: FC<TabsProps> = ({ title = "Add New", items = [], activeTab, onTabChange }) => {
  const [internalTab, setInternalTab] = useState(items.length > 0 ? items[0].value : "")

  const currentTab = activeTab ?? internalTab

  const handleTabChange = (value: string) => {
    const selectedItem = items.find(item => item.value === value)
    const isDisabled = typeof selectedItem?.disabled === "function" ? selectedItem.disabled() : selectedItem?.disabled

    if (!isDisabled) {
      setInternalTab(value)
      onTabChange?.(value)
    }
  }

  const selectedTab = items.find(item => item.value === currentTab)
  const TabComponent = selectedTab?.component || Fragment

  return (
    <div className="d-flex">
      <div className="">
        <h5 className="text-lg mb-6">{title}</h5>
        <Nav
          items={items.map(item => ({
            ...item,
            disabled: typeof item.disabled === "function" ? item.disabled() : item.disabled,
          }))}
          value={currentTab}
          setValue={handleTabChange}
        />
      </div>
      <div className="flex-1">
        <div className="tab-container">
          <TabComponent />
        </div>
      </div>
    </div>
  )
}
