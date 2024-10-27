import { createSlice } from "@reduxjs/toolkit";

/**
 * Default state object with initial values.
 */
const initialState = {
  showSidebar: true,
};
/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    sidebarToggled: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    sidebarOpened: (state) => {
      state.showSidebar = true;
    },
    sidebarClosed: (state) => {
      state.showSidebar = false;
    },
  },
});

// Exports all actions
export const { sidebarOpened, sidebarClosed, sidebarToggled } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;

// Action Creators
export const sidebarToggle = () => sidebarToggled();

export const sidebarOpen = () => sidebarOpened();

export const sidebarClose = () => sidebarClosed();
