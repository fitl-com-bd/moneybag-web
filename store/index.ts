import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import reducer, { middleware } from "./reducer"

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
})

setupListeners(store.dispatch)

export type StoreGetStateType = typeof store.getState

export type StoreDispatchType = typeof store.dispatch

export default store

export * from "./features"
