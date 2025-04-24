"use client"
import { LoadingTable } from "@/components/ui"
import { useStatementsQuery } from "@/store"
import DataTable from "react-data-table-component"
import { column } from "../statement/_components/column"

export const LastStatement = () => {
  const { data, isLoading } = useStatementsQuery({
    status: "APPROVED",
  })

  return (
    <div className="shadow-sm bg-white border-0 rounded overflow-hidden d-flex flex-column">
      <DataTable
        className=""
        title="Recent Transactions"
        columns={column({}).splice(0, 7)}
        data={data?.slice(0, 10)}
        pagination={false}
        progressPending={isLoading}
        // style={{ height: "588px" }}
        progressComponent={<LoadingTable className="w-100 mx-3 mb-2" />}
      />
    </div>
  )
}
