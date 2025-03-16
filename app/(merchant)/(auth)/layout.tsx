"use client"
import config from "@/config"
import { useAuth } from "@/hooks"
import { LayoutProps } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const AuthLayout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  console.log(`🔥 | user:`, user)

  useEffect(() => {
    if (!isLoading && user) {
      router.push(config.ADMIN_DASHBOARD_URL)
    }
  }, [isLoading, user, router])

  // If user is loading, show loading indicator
  if (isLoading) return null

  return children
}

export default AuthLayout
