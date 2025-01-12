import entities from "./entities"
import { authApi, customerApi, invoiceApi, marchantServiceApi, merchantSetupApi, pageApi } from "./features"

export const apiSlices = [authApi, pageApi, customerApi, invoiceApi, merchantSetupApi, marchantServiceApi]
export const middleware = apiSlices.map(api => api.middleware)

const reducer = {
  [authApi.reducerPath]: authApi.reducer,
  [pageApi.reducerPath]: pageApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
  [merchantSetupApi.reducerPath]: merchantSetupApi.reducer,
  [marchantServiceApi.reducerPath]: marchantServiceApi.reducer,
  entities,
}

export default reducer
