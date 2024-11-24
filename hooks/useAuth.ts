import { useCheckAdminLoginQuery, useCheckLoginQuery } from "@/store"
import { usePathname } from "next/navigation"

export const useAuth = () => {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")
  const { data, isFetching: isLoading, error } = isAdmin ? useCheckAdminLoginQuery({}) : useCheckLoginQuery({})

  const user = data as any

  let { permissions = [] } = (user || {}) as { permissions: any[] }

  permissions = permissions.map(permission => permission.slug)

  return {
    user,
    isLoading,
    error,
    isAdmin,
    permissions,
    isSuperAdmin: user?.id === 45,
    hasPermission: (permission: string) => user?.id === 45 || permissions.includes(permission),
  }
}
