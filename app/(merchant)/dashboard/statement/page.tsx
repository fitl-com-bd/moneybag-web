"use client"
import { Icon, LoadingTable } from "@/components/ui"
import { useStatementsQuery } from "@/store"
import { getStatusColor } from "@/utils"
import { CBadge, CButton, CTooltip } from "@coreui/react"
import moment from "moment"
import { useState } from "react"
import DataTable from "react-data-table-component"
import { TransactionActions } from "./_components/TransactionActions"
import { TransactionDetails } from "./_components/TransactionDetails"
import { TransactionFilterForm } from "./_components/TransactionFilterForm"
import { column } from "./_components/column"

const TransactionList = () => {
  const [showFilter, setShowFilter] = useState(false)
  const [filter, setFilter] = useState<any>({})
  const [details, setDetails] = useState<any>(false)
  const { data: statements, isLoading } = useStatementsQuery(filter)

  const openDetails = (data: any) => setDetails(data)

  return (
    <div className="data-table-wrapper shadow-sm bg-white border-0 rounded overflow-hidden p-3">
      <DataTable
        title="Transaction List"
        columns={column({ openDetails })}
        data={statements}
        pagination={50 as any}
        progressPending={isLoading}
        progressComponent={<LoadingTable className="w-100" />}
        actions={<TransactionActions transactions={statements} filter={showFilter} setFilter={setShowFilter} />}
        subHeader
        subHeaderWrap={false}
        subHeaderComponent={<TransactionFilterForm show={showFilter} filter={filter} setFilter={setFilter} />}
      />
      <TransactionDetails visible={details} setVisible={setDetails} />
    </div>
  )
}

export default TransactionList
