import entities from "./entities"
import { authApi, customerApi, invoiceApi, merchantSetupApi, pageApi } from "./features"

export const apiSlices = [authApi, pageApi, customerApi, invoiceApi, merchantSetupApi]
export const middleware = apiSlices.map(api => api.middleware)

const reducer = {
  [authApi.reducerPath]: authApi.reducer,
  [pageApi.reducerPath]: pageApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
  [merchantSetupApi.reducerPath]: merchantSetupApi.reducer,
  entities,
}

export default reducer
