import { StoreState } from "@/types"
import { Middleware } from "@reduxjs/toolkit"

type ToastifyMiddleware = Middleware<{}, StoreState, any>

export const toast: ToastifyMiddleware = store => next => (action: any) => {
  if (action.type === "error") console.log("Toastify", action.payload.message)
  else return next(action)
}
