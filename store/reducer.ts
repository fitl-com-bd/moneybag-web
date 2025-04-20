import entities from "./entities"
import {
  accessControlApi,
  authApi,
  commonApi,
  customerApi,
  financeApi,
  invoiceApi,
  merchantServiceApi,
  merchantSetupApi,
  pageApi,
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
]
export const middleware = apiSlices.map(api => api.middleware)

const reducer = {
  [authApi.reducerPath]: authApi.reducer,
  [pageApi.reducerPath]: pageApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
  [merchantSetupApi.reducerPath]: merchantSetupApi.reducer,
  [merchantServiceApi.reducerPath]: merchantServiceApi.reducer,
  [financeApi.reducerPath]: financeApi.reducer,
  [accessControlApi.reducerPath]: accessControlApi.reducer,
  entities,
}

export default reducer
