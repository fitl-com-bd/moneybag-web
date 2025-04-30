"use client"
import { DataTablePage, FilterField } from "@/components/shared"
import { Icon } from "@/components/ui"
import { useEligibleItemsQuery, useSettlementMerchantsQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { formatPrice, getOptions } from "@/utils"
import { CButton, CTooltip } from "@coreui/react"
import moment from "moment"
import Link from "next/link"

const columns: DataTableColumn = [
  {
    name: "ORDER ID",
    selector: row => row.order_id,
    sortable: true,
  },
  {
    name: "TRANSACTION DATE",
    selector: row => moment(row.transaction_date).format("lll"),
    width: "170px",
  },
  {
    name: "MERCHANT ID",
    selector: row => row.merchant_id,
  },
  {
    name: "ORDER AMOUNT",
    selector: row => formatPrice(row.order_amount),
  },
  {
    name: "BANK SETTLEMENT AMOUNT",
    selector: row => formatPrice(row.bank_settlement_amount),
  },
  {
    name: "TRANSACTION STATUS",
    selector: row => row.transaction_status,
  },
  {
    name: "Action",
    width: "94px",
    cell: row => (
      <div className="d-flex justify-content-center">
        <CTooltip content="Update">
          <Link href={`/dashboard/banks/${row.id}`}>
            <CButton color="light" size="sm" className="btn-icon">
              <Icon name="edit" size={24} />
            </CButton>
          </Link>
        </CTooltip>
      </div>
    ),
  },
]

const Settlements = () => {
  const { data: merchants, isLoading: isMerchantsLoading } = useSettlementMerchantsQuery({})

  const filterFields: FilterField[] = [
    {
      name: "merchant_id",
      label: "Merchant Name",
      type: "select",
      placeholder: "Select Merchant Name",
      options: getOptions(merchants, "merchant_name", "merchant_id"),
      isLoading: isMerchantsLoading,
    },
    { name: "last_settlement_date", label: "Last Settlement Date", type: "text", placeholder: "Enter Date" },
    { name: "last_settlement", label: "Last Settlement", type: "text", placeholder: "Enter Last Settlement" },
    { name: "settlement_amount", label: "Settlement Amount", type: "text", placeholder: "Enter Amount" },
  ]

  return (
    <DataTablePage
      apiFunction={useEligibleItemsQuery}
      title="Settlement"
      columns={columns}
      filter
      fields={filterFields}
      actionsProps={{
        href: "/dashboard/banks/create",
      }}
    />
  )
}

export default Settlements
