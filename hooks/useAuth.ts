import { LS_TOKEN } from "@/constants"
import { useCheckLoginQuery } from "@/store"
import { decodeToken, isBrowser } from "@/utils"
import { usePathname } from "next/navigation"

export const useAuth = () => {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")
  const { data: user, isLoading, error } = useCheckLoginQuery({})

  let { permissions = [] } = (user || {}) as { permissions: any[] }

  permissions = permissions.map(permission => permission.slug)

  const isSuperAdmin = user?.is_super

  return {
    user,
    isLoading,
    error,
    isAdmin,
    permissions,
    isSuperAdmin,
    hasPermission: (permission: string) => isSuperAdmin || permissions.includes(permission),
  }
}
