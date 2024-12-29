"use client"
import { DashboardLayout } from "@/components/layouts"
import config from "@/config"
import { useAuth } from "@/hooks"
import { LayoutProps } from "@/types"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

const routes = {
  "/403": "page-403",
  "/dashboard": "dashboard",
  "/users": "admin-user-list",
  "/merchant-users": "merchant-user-list",
  "/merchant-callbackUrl": "merchant-api-password-list",
  "/merchant-callbackurl/add-merchant-callbackUrl": "create-merchant-api-password",
  "/merchant-callbackUrl/update-merchant-callbackUrl": "update-merchant-api-password",
  "/bank": "bank-list",
  "/branch": "branch-list",
  "/fintech": "fintech-list",
  "/fintech/add-fintech": "create-fintech",
  "/fintech/update-fintech": "update-fintech",
  "/settlement": "settlement-account",
  "/default-servic/add-default-service": "default-service",
  "/merchant": "merchant-list",
  "/create-new-merchant": "create-new-merchant",
  "/merchant/update-merchant-management": "update-merchant",
  "/merchant-service": "merchant-service",
  "/add-merchant-service": "create-merchant-service",
  "/merchant-service/update-merchant-service": "update-merchant-service",
  "/merchant-transaction": "merchant-transaction-list",
  "/transaction": "transaction-list",
  "/settlement": "pending-settlements",
  "/settlement-report": "settlement-report",
  "/settlement-report/:id": "settlement-report",
  "/role": "role-list",
  "/permission": "permission-list",
  "/role/:id/permissions": "assign-permission-to-role",
  "/merchant-users/add-merchant-users": "create-merchant-user",
  "/merchant-users/update-merchant-users": "update-merchant-user",
}

const formatPathname = (pathname: string) => {
  const removePrefix = pathname.slice(16)
  return removePrefix === "" ? "/dashboard" : removePrefix
}

const DashboardMainLayout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const { user, isLoading, isSuperAdmin, isAdmin, permissions } = useAuth()
  const pathname: string = usePathname()
  const slug = isAdmin ? routes[formatPathname(pathname) as keyof typeof routes] : null
  const hasAccess = isSuperAdmin ? true : slug ? (slug === "dashboard" ? true : permissions.includes(slug)) : false
  // console.log(`🔥 | hasAccess:`, hasAccess ,slug, permissions)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(config.ADMIN_SIGN_IN_URL)
    }
    if (!isLoading && user && !hasAccess) {
      router.push(config.ADMIN_DASHBOARD_URL)
    }
  }, [isLoading, user, router, pathname])

  // If user is loading, show loading indicator
  if (isLoading) return null
  if (!isLoading && !user) return null
  if (!hasAccess) return null

  // if (!isSuperAdmin && !getAccessibleRoutes(routes, permissions).includes(pathname)) return <Navigate to="/dashboard/403" />

  return <DashboardLayout>{children}</DashboardLayout>
}

export default DashboardMainLayout
