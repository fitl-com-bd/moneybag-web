"use client"
import { DataTablePage } from "@/components/shared"
import { useMerchantTransactionsQuery } from "@/store"
import { columns } from "./_components/column"

const TransactionList = () => {
  // const [details, setDetails] = useState<any>(false)

  // const openDetails = (data: any) => setDetails(data)

  return (
    <>
      <DataTablePage
        apiFunction={useMerchantTransactionsQuery}
        title="Transaction List"
        columns={columns}
        actionsProps={{}}
      />
      {/* <TransactionDetails visible={details} setVisible={setDetails} /> */}
    </>
  )
}

export default TransactionList
