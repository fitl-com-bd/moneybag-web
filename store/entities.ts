import { combineReducers } from "@reduxjs/toolkit";
import { sidebarSlice } from "./features";

export default combineReducers({
  // [authSlice.name]: authSlice.reducer,
  [sidebarSlice.name]: sidebarSlice.reducer,
});
