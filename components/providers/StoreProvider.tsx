"use client"
import store from "@/store"
import { LayoutProps } from "@/types"
import { Provider } from "react-redux"

export const StoreProvider = ({ children }: LayoutProps) => {
  return <Provider store={store}>{children}</Provider>
}
