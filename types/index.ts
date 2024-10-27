import { StoreDispatchType, StoreGetStateType } from "@/store"
import { Action, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit"
import { ReactNode } from "react"

// Redux
export type StoreGetState = StoreGetStateType

export type StoreState = ReturnType<StoreGetStateType>

export type StoreDispatch = StoreDispatchType

export type StoreThunk<ReturnType = void> = ThunkAction<ReturnType, StoreState, unknown, Action<string>>

export type StoreThunkDispatch = ThunkDispatch<StoreState, any, Action<string>>

// Layout
export type LayoutProps = {
  children: ReactNode
}
