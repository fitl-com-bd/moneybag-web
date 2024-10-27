import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import { authApi, customerApi, invoiceApi, pageApi } from "./features"
import reducer from "./reducer"

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(pageApi.middleware)
      .concat(customerApi.middleware)
      .concat(invoiceApi.middleware),
})

setupListeners(store.dispatch)

export type StoreGetStateType = typeof store.getState

export type StoreDispatchType = typeof store.dispatch

export default store

export * from "./features"
