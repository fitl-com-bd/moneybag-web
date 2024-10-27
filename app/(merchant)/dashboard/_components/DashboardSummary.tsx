export const DashboardSummary = ({ data }: { data: any }) => {
  return (
    <div className="shadow-sm bg-white border-0 rounded overflow-hidden d-grid grid-cols-2 grid-cols-md-4">
      <div className="px-3 my-4 border-end">
        <p className="text-secondary small mb-1">Today</p>
        <h3>BDT {data?.summation?.today.toFixed(2) || 0}</h3>
      </div>
      <div className="px-3 my-4 border-end">
        <p className="text-secondary small mb-1">Month</p>
        <h3>BDT {data?.summation?.month.toFixed(2) || 0}</h3>
      </div>
      <div className="px-3 my-4 border-end">
        <p className="text-secondary small mb-1">Year</p>
        <h3>BDT {data?.summation?.year.toFixed(2) || 0}</h3>
      </div>
      <div className="px-3 my-4 border-end">
        <p className="text-secondary small mb-1">All Time</p>
        <h3>BDT {data?.summation?.all_time.toFixed(2) || 0}</h3>
      </div>
    </div>
  )
}
