import { ClassValue, clsx } from "clsx"
import omitBy from "lodash/omitBy"

export const cn = (...classes: ClassValue[]) => clsx(classes)

export const userSingout = () => {
  localStorage.removeItem("token")
  window.location.href = "/"
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

export const formatSearch = (searchKey: string) => {
  return searchKey.trim().replace(/\s+/g, "%")
}

export const formatParams = (params: any) => omitBy(params, value => value == null || value === "")

export const getRandomNumber = () => Math.floor(Math.random() * 100000)
