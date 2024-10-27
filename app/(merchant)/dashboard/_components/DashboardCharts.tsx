import Chart from "react-apexcharts"

const getChartData = (data: any) => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.labels,
    },
  }

  const series = [
    {
      name: data.title,
      data: data.values,
    },
  ]
  return { options, series, title: data.title }
}

export const DashboardCharts = ({ data }: { data: any }) => {
  if (!data) return null
  const daily = getChartData(data.daily)
  const monthly = getChartData(data.one_year_monthly_data)

  return (
    <div className="d-grid grid-cols-md-2 gap-3">
      <div className="shadow-sm bg-white border-0 rounded overflow-hidden px-3 py-4">
        <h5 className="mb-0">{daily.title}</h5>
        <Chart options={daily.options} series={daily.series} type="line" height={350} />
      </div>
      <div className="shadow-sm bg-white border-0 rounded overflow-hidden px-3 py-4">
        <h5 className="mb-0">{monthly.title}</h5>
        <Chart options={monthly.options} series={monthly.series} type="bar" height={350} />
      </div>
    </div>
  )
}
