import { Button, Card, FormFooter, SectionHeader } from "@/components/ui"

export const SettlementBank = ({ id, data }: any) => {
  const businessDetails = data?.business_detail || {}
  const representative = data?.business_representative || {}

  return (
    <>
      <SectionHeader title={businessDetails?.business_name} subtitle={businessDetails?.category?.name} />
      <Card>
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Bank Name:</div>
          <div className="col-span-2 p-2.5">{representative?.nid_number}</div>
          <div className="fw-semibold p-2.5">Branch Name:</div>
          <div className="col-span-2 p-2.5">{representative?.nid_number}</div>
          <div className="fw-semibold p-2.5">Transit/Routing No:</div>
          <div className="col-span-2 p-2.5">{representative?.nid_number}</div>
          <div className="fw-semibold p-2.5">Swift Code:</div>
          <div className="col-span-2 p-2.5">{representative?.nid_number}</div>
        </div>
        <hr />
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Account Name:</div>
          <div className="col-span-2 p-2.5">{representative?.nid_number}</div>
          <div className="fw-semibold p-2.5">Account Number:</div>
          <div className="col-span-2 p-2.5">{representative?.nid_number}</div>
        </div>
      </Card>
      <FormFooter>
        <Button href={`store?id=${id}`}>Edit</Button>
      </FormFooter>
    </>
  )
}
