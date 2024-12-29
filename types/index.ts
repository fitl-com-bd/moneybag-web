import { StoreDispatchType, StoreGetStateType } from "@/store"
import { Action, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit"
import { ReactNode } from "react"
import { TableColumn } from "react-data-table-component"

// Redux
export type StoreGetState = StoreGetStateType

export type StoreState = ReturnType<StoreGetStateType>

export type StoreDispatch = StoreDispatchType

export type StoreThunk<ReturnType = void> = ThunkAction<ReturnType, StoreState, unknown, Action<string>>

export type StoreThunkDispatch = ThunkDispatch<StoreState, any, Action<string>>

// Components
// DataTable
export type DataTableColumn = TableColumn<any>[]

// Layout
export type LayoutProps = {
  children: ReactNode
}
