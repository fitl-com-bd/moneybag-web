"use client"
import { DataTablePage } from "@/components/shared"
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
  const [details, setDetails] = useState<any>(false)

  const openDetails = (data: any) => setDetails(data)

  return (
    <>
      <DataTablePage
        apiFunction={useStatementsQuery}
        title="Transaction List"
        columns={column({ openDetails })}
        actionsProps={{
          href: "statement/create",
        }}
      />
      <TransactionDetails visible={details} setVisible={setDetails} />
    </>
  )
}

export default TransactionList
