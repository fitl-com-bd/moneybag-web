import config from "@/config"
import { LS_TOKEN } from "@/constants"
import { ClassValue, clsx } from "clsx"
import { jwtDecode } from "jwt-decode"
import omitBy from "lodash/omitBy"

export const cn = (...classes: ClassValue[]) => clsx(classes)

export const isBrowser = () => typeof window !== "undefined"

export const handleSingout = () => {
  localStorage.removeItem(LS_TOKEN)
  const isAdmin = window.location.pathname.startsWith("/admin")
  window.location.href = isAdmin ? config.ADMIN_SIGN_IN_URL : config.SIGN_IN_URL
}

export const isUrl = (string: string) => {
  try {
    new URL(string)
  } catch (_) {
    return false
  }

  return true
}

export const getRandomFromArray = (numbers = []) => numbers[Math.floor(Math.random() * numbers.length)]

export const formatPrice = (price = 0) => price.toFixed(2)

export const formatCurrency = (price = 0, currency = "BDT") => `${currency} ${formatPrice(price)}`

export const formatNumberWithPadding = (number: number, minimumDigits = 2) =>
  number.toString().padStart(minimumDigits, "0")

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "INCOMPLETE":
      return "dark"
    case "DECLINED":
      return "danger"
    case "APPROVED":
      return "primary"
    case "REVERSED":
      return "light"
    case "REFUNDED":
      return "info"
    case "CANCELLED":
      return "danger"
    default:
      return "warning"
  }
}

export const formatSearch = (searchKey: string) => searchKey.trim().replace(/\s+/g, "%")

export const formatParams = (params: any) => omitBy(params, value => value == null || value === "")

export const getRandomNumber = () => Math.floor(Math.random() * 100000)

// getNavItems
export const getNavItems = (navItems: any, permissions: any) => {
  const filteredNavItems = navItems.filter((item: any) => {
    if (item.permissions) {
      return item.permissions.some((permission: any) => permissions.includes(permission))
    }

    return true
  })

  return filteredNavItems
}

export const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode(token)
    return decoded
  } catch (error) {
    return null
  }
}
