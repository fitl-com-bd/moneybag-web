import entities from "./entities";
import { authApi, customerApi, invoiceApi, pageApi } from "./features";

const reducer = {
  [authApi.reducerPath]: authApi.reducer,
  [pageApi.reducerPath]: pageApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
  entities,
};

export default reducer;
