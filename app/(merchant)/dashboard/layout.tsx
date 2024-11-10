"use client"
import { DashboardLayout } from "@/components/layouts"
import config from "@/config"
import { useAuth } from "@/hooks"
import { LayoutProps } from "@/types"
import { useRouter } from "next/navigation"

const DashboardMainLayout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  // If user is loading, show loading indicator
  if (isLoading) return null
  // Redirect to login if user is not logged in
  if (!user) return router.push(config.SIGN_IN_URL)

  return <DashboardLayout>{children}</DashboardLayout>
}

export default DashboardMainLayout
