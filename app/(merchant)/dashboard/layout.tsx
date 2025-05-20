"use client"
import { DashboardLayout } from "@/components/layouts"
import config from "@/config"
import { useAuth } from "@/hooks"
import { LayoutProps } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const DashboardMainLayout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(config.SIGN_IN_URL)
    }
  }, [isLoading, user, router])

  // If user is loading, show loading indicator
  if (isLoading) return null
  if (!isLoading && !user) return null
  // if (!hasAccess) return null

  return <DashboardLayout>{children}</DashboardLayout>
}

export default DashboardMainLayout
