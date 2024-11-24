import { useCheckAdminLoginQuery, useCheckLoginQuery } from "@/store"
import { usePathname } from "next/navigation"

export const useAuth = () => {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")
  const { data, isFetching: isLoading, error } = isAdmin ? useCheckAdminLoginQuery({}) : useCheckLoginQuery({})

  const user = data as any

  return { user, isLoading, error, isAdmin }
}
