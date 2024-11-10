"use client"
import config from "@/config"
import { useAuth } from "@/hooks"
import { LayoutProps } from "@/types"
import { useRouter } from "next/navigation"

const AuthLayout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  // If user is loading, show loading indicator
  if (isLoading) return null
  // Redirect to dashboard if user is already logged in
  if (user) return router.push(config.DASHBOARD_URL)

  return children
}

export default AuthLayout
