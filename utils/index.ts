import { ClassValue, clsx } from "clsx"

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
