import config from "@/config"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseQuery = fetchBaseQuery({
  baseUrl: config.API_URL,
  prepareHeaders: headers => {
    const token = localStorage.getItem("token")
    headers.set("Content-Type", "application/json")
    headers.set("Accept", "application/json")
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  },
})
