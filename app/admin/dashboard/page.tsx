// "use client"
// import { LoadingDashboard } from "@/components/ui"
// import { useDashboardQuery } from "@/store"
// import { DashboardCharts } from "./_components/DashboardCharts"
// import { DashboardSummary } from "./_components/DashboardSummary"
// import { LastStatement } from "./_components/LastStatement"

const Home = () => {
  // const { data, isLoading } = useDashboardQuery({})

  // if (isLoading) return <LoadingDashboard />

  return (
    <div className="bg-white p-5 mb-5 border-0 rounded d-flex flex-row">
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Welcome to Moneybag Payment Gateway</h1>
          <p className="lead">Manage your transactions with ease and security.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
