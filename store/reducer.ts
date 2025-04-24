import entities from "./entities"
import {
  accessControlApi,
  authApi,
  bankApi,
  commonApi,
  customerApi,
  financeApi,
  invoiceApi,
  merchantServiceApi,
  merchantSetupApi,
  pageApi,
  paymentApi,
  settlementApi,
  transactionApi,
} from "./features"

export const apiSlices = [
  authApi,
  pageApi,
  commonApi,
  customerApi,
  invoiceApi,
  merchantSetupApi,
  merchantServiceApi,
  financeApi,
  accessControlApi,
  bankApi,
  paymentApi,
  transactionApi,
  settlementApi,
]
export const middleware = apiSlices.map(api => api.middleware)

const reducer = {
  [authApi.reducerPath]: authApi.reducer,
  [pageApi.reducerPath]: pageApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [bankApi.reducerPath]: bankApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
  [settlementApi.reducerPath]: settlementApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
  [merchantSetupApi.reducerPath]: merchantSetupApi.reducer,
  [merchantServiceApi.reducerPath]: merchantServiceApi.reducer,
  [financeApi.reducerPath]: financeApi.reducer,
  [accessControlApi.reducerPath]: accessControlApi.reducer,
  entities,
}

export default reducer
