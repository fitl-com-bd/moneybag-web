"use client"
import { Icon, LoadingTable } from "@/components/ui"
import { useMerchantSettlementsQuery } from "@/store"
import { CButton, CTooltip } from "@coreui/react"
import moment from "moment"
import { useState } from "react"
import DataTable from "react-data-table-component"
import SettlementReportActions from "./_components/SettlementReportActions"
import { SettlementReportDetails } from "./_components/SettlementReportDetails"
import SettlementReportFilterForm, { defaultSettlementReportValues } from "./_components/SettlementReportFilterForm"

const column = ({ openDetails }: any) => [
  {
    name: "Settlement From",
    selector: (row: any) => moment(row.settlement_from).format("lll"),
  },
  {
    name: "Settlement to",
    selector: (row: any) => moment(row.settlement_to).format("lll"),
  },
  {
    name: "Collection Amount",
    selector: (row: any) => row.gttl_order_amount,
  },
  {
    name: "MSF Fee",
    selector: (row: any) => (row.gttl_pgw_fee + row.gttl_bank_fee).toFixed(2),
  },
  {
    name: "Settlement Amount",
    selector: (row: any) => row.gttl_total_settlement_amount,
  },
  {
    name: "Settlement Date",
    grow: 2,
    selector: (row: any) => moment(row.settlement_date).format("lll"),
  },
  {
    name: "Action",
    selector: (row: any) => (
      <div className="d-flex justify-content-center">
        <CTooltip content="Details">
          <CButton
            color="light"
            size="sm"
            className="btn-icon"
            onClick={() => {
              openDetails(row)
            }}>
            <Icon name="details" size={24} />
          </CButton>
        </CTooltip>
      </div>
    ),
  },
]

const SettlementReport = () => {
  const [showFilter, setShowFilter] = useState(true)
  const [filter, setFilter] = useState<any>(defaultSettlementReportValues)
  const [details, setDetails] = useState<any>(false)
  const { data: statements, isLoading } = useMerchantSettlementsQuery(filter)

  const openDetails = (row: any) => setDetails(row.settlement_details)

  return (
    <div className="data-table-wrapper shadow bg-white border-0 rounded overflow-hidden p-3">
      <DataTable
        title="Settlement Report"
        columns={column({ openDetails })}
        data={statements}
        pagination={50 as any}
        progressPending={isLoading}
        progressComponent={<LoadingTable className="w-100" />}
        actions={<SettlementReportActions transactions={statements} filter={showFilter} setFilter={setShowFilter} />}
        subHeader
        subHeaderWrap={false}
        subHeaderComponent={<SettlementReportFilterForm show={showFilter} filter={filter} setFilter={setFilter} />}
      />
      <SettlementReportDetails visible={details} setVisible={setDetails} />
    </div>
  )
}

export default SettlementReport
