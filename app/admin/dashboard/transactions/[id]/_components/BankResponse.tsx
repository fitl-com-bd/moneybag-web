import { Button, Card, FormFooter, SectionHeader } from "@/components/ui"

export const BankResponse = ({ id, data }: any) => {
  return (
    <>
      <SectionHeader title="Bank response" subtitle="Comprehensive breakdown of bank response data." />
      <Card>
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Dispute Initiate Date:</div>
          <div className="col-span-2 p-2.5">{data?.dispute_initiate_date}</div>
          <div className="fw-semibold p-2.5">Dispute Resolve Date:</div>
          <div className="col-span-2 p-2.5">{data?.dispute_resolve_date}</div>
          <div className="fw-semibold p-2.5">Dispute Status:</div>
          <div className="col-span-2 p-2.5">{data?.dispute_status}</div>
          <div className="fw-semibold p-2.5">Employee ID:</div>
          <div className="col-span-2 p-2.5">{data?.employee_id}</div>
        </div>
      </Card>
      <FormFooter>
        <Button href={`store?id=${id}`}>Edit</Button>
      </FormFooter>
    </>
  )
}
