// import { LOCAL_STORAGE_IS_LOGIN_KEY, LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_USER_KEY } from "@/constants"
// import { isBrowser } from "@/utils"
// import { createSlice } from "@reduxjs/toolkit"

// /**
//  * Default state object with initial values.
//  */
// const userStr = isBrowser() ? localStorage.getItem(LOCAL_STORAGE_USER_KEY) : ""
// const user = isBrowser() ? (userStr && userStr !== "undefined" ? JSON.parse(userStr) : null) : null
// const token = isBrowser() ? localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || "" : ""
// const isLoginLocal = isBrowser() ? localStorage.getItem(LOCAL_STORAGE_IS_LOGIN_KEY) === "true" : false
// const isLogin = user && token && isLoginLocal ? true : false
// const initialState = { isLogin, user, token }

// /**
//  * Create a slice as a reducer containing actions.
//  *
//  * In this example actions are included in the slice. It is fine and can be
//  * changed based on your needs.
//  */
// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     authenticated: (auth, action) => {
//       const { user, token } = action.payload
//       if (user && token) {
//         auth.isLogin = true
//         auth.user = user
//         auth.token = token

//         isBrowser() && localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(action.payload.user))
//         isBrowser() && localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, action.payload.token)
//         isBrowser() && localStorage.setItem(LOCAL_STORAGE_IS_LOGIN_KEY, "true")
//       }
//     },
//     signedOut: auth => {
//       auth.isLogin = false
//       auth.user = null
//       auth.token = ""

//       isBrowser() && localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
//       isBrowser() && localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
//       isBrowser() && localStorage.removeItem(LOCAL_STORAGE_IS_LOGIN_KEY)
//     },
//   },
// })

// // A small helper of user state for `useSelector` function.
// export const getUserState = state => state.user

// // Exports all actions
// export const { authenticated, signedOut } = authSlice.actions

// export default authSlice.reducer

// // Action Creators
// export const authenticate = payload => authenticated(payload)

// export const signOut = () => signedOut()
