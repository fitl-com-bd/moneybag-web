"use client"
import { LoadingDashboard } from "@/components/ui"
import { useDashboardQuery } from "@/store"
import { DashboardCharts } from "./_components/DashboardCharts"
import { DashboardSummary } from "./_components/DashboardSummary"
import { LastStatement } from "./_components/LastStatement"

const Home = () => {
  const { data, isLoading } = useDashboardQuery({})

  if (isLoading) return <LoadingDashboard />

  return (
    <div className="d-grid gap-3">
      <DashboardSummary data={data} />
      <DashboardCharts data={data} />
      <LastStatement />
    </div>
  )
}

export default Home
