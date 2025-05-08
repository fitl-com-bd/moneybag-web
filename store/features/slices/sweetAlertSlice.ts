import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"

/**
 * Default state object with initial values.
 */
const swalProps: any = {}
const initialState = { swalProps }

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const sweetAlertSlice = createSlice({
  name: "sweetAlert",
  initialState,
  reducers: {
    sweetAlertToggled: sweetAlert => {
      sweetAlert.swalProps.show = !sweetAlert.swalProps.show
    },
    sweetAlertShowed: (sweetAlert, action) => {
      sweetAlert.swalProps = action.payload
      sweetAlert.swalProps.show = true
    },
    sweetAlertHided: sweetAlert => {
      sweetAlert.swalProps = {}
    },
  },
})

// Exports all actions
export const { sweetAlertToggled, sweetAlertShowed, sweetAlertHided } = sweetAlertSlice.actions

export default sweetAlertSlice.reducer

// Action Creators
// type ToggleSideBarType = () => (dispatch: StoreDispatch, getState: StoreGetState) => void

export const toggleSweetAlert = () => sweetAlertToggled()

export const showSweetAlert = (props: any) => sweetAlertShowed(props)

export const hideSweetAlert = () => sweetAlertHided()
