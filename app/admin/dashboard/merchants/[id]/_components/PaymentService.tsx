import { DataTablePage } from "@/components/shared"
import { Icon, SectionHeader } from "@/components/ui"
import { useMerchantPaymentServiceQuery } from "@/store"
import { DataTableColumn } from "@/types"
import { CButton, CTooltip } from "@coreui/react"
import Link from "next/link"

const columns: DataTableColumn = [
  {
    name: "Service",
    sortable: true,
    selector: row => row.payment_provider.name,
  },
  {
    name: "Financial Org",
    selector: row => row.financial_organization || "-",
  },
  {
    name: "Bank Rate",
    sortable: true,
    selector: row => row.bank_rate,
  },
  {
    name: "Moneybag Rate",
    selector: row => row.moneybag_rate,
  },
  {
    name: "Rate Type",
    selector: row => (row.rate_type === "P" ? "Percentage" : "Fixed"),
  },
  {
    name: "Status",
    selector: row => (row.is_active ? "Active" : "Inactive"),
  },
  {
    name: "Action",
    width: "106px",
    cell: row => (
      <div className="d-flex justify-content-center gap-2">
        <CTooltip content="Update">
          <Link href={`merchants/${row.id}/edit`}>
            <CButton color="light" size="sm" className="btn-icon">
              <Icon name="edit" size={24} />
            </CButton>
          </Link>
        </CTooltip>
      </div>
    ),
  },
]

export const PaymentService = ({ id, data }: any) => {
  const businessDetails = data?.business_detail || {}

  return (
    <>
      <SectionHeader title={businessDetails?.business_name} subtitle={businessDetails?.category?.name} />
      <DataTablePage
        apiFunction={useMerchantPaymentServiceQuery}
        defaultParams={{ id: id }}
        title="Merchant Service"
        columns={columns}
        actionsProps={{
          href: `store?id=${id}`,
          name: "Add New Service",
        }}
      />
    </>
  )
}
