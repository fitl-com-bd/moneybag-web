import config from "@/config"
import { LS_TOKEN } from "@/constants"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseQuery = fetchBaseQuery({
  baseUrl: config.API_URL,
  prepareHeaders: headers => {
    const token = localStorage.getItem(LS_TOKEN)
    headers.set("Content-Type", "application/json")
    headers.set("Accept", "application/json")
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  },
})
