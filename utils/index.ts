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
