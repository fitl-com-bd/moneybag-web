import { Button, Card, FormFooter, SectionHeader } from "@/components/ui"
import { formatCurrency } from "@/utils"

export const BusinessStructure = ({ id, data }: any) => {
  const businessDetails = data?.business_detail || {}

  return (
    <>
      <SectionHeader title={businessDetails?.business_name} subtitle={businessDetails?.category?.name} />
      <Card>
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Legal Identity of Company:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.legal_identity}</div>
          <div className="fw-semibold p-2.5">Industry/Business Type:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.category?.name}</div>
          <div className="fw-semibold p-2.5">Merchant Category Code:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.category?.value}</div>
        </div>
        <hr />
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Business Description:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.business_desc}</div>
        </div>
        <hr />
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Max Ticket Size:</div>
          <div className="col-span-2 p-2.5">{formatCurrency(businessDetails?.max_ticket_size)}</div>
          <div className="fw-semibold p-2.5">Service Charge by Marchant:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.bleeding ? "Active" : "Inactive"}</div>
        </div>
      </Card>
      <FormFooter>
        <Button href={`store?id=${id}`}>Edit</Button>
      </FormFooter>
    </>
  )
}
