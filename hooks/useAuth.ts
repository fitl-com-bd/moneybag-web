import { LS_TOKEN } from "@/constants"
import { decodeToken, isBrowser } from "@/utils"
import { usePathname } from "next/navigation"

export const useAuth = () => {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")
  // const { data, isFetching: isLoading, error } = isAdmin ? useCheckAdminLoginQuery({}) : useCheckLoginQuery({})
  const token = isBrowser() ? localStorage.getItem(LS_TOKEN) : null
  const data = token ? decodeToken(token) : null
  const isLoading = false

  const user = data as any

  let { permissions = [] } = (user || {}) as { permissions: any[] }

  permissions = permissions.map(permission => permission.slug)

  const isSuperAdmin = user?.scp === "superuser"

  return {
    user,
    isLoading,
    // error,
    isAdmin,
    permissions,
    isSuperAdmin,
    hasPermission: (permission: string) => isSuperAdmin || permissions.includes(permission),
  }
}
