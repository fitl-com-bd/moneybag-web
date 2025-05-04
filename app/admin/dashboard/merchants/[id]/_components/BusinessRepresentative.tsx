import { Button, Card, FormFooter, SectionHeader } from "@/components/ui"
import { formatCurrency } from "@/utils"
import moment from "moment"

export const BusinessRepresentative = ({ id, data }: any) => {
  const representative = data?.business_representative || {}

  return (
    <>
      <SectionHeader title={representative?.business_name} subtitle={representative?.category?.name} />
      <Card>
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">NID:</div>
          <div className="col-span-2 p-2.5">{representative?.nid_number}</div>
          <div className="fw-semibold p-2.5">Date of Birth:</div>
          <div className="col-span-2 p-2.5">{moment(representative?.birthdate).format("ll")}</div>
        </div>
        <hr />
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Full Name:</div>
          <div className="col-span-2 p-2.5">{representative?.first_name + " " + representative?.last_name}</div>
          <div className="fw-semibold p-2.5">Phone Number:</div>
          <div className="col-span-2 p-2.5">{representative?.phone}</div>
          <div className="fw-semibold p-2.5">Email Address:</div>
          <div className="col-span-2 p-2.5">{representative?.email}</div>
        </div>
        <hr />
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Present Address:</div>
          <div className="col-span-2 p-2.5">{representative?.street}</div>
          <div className="fw-semibold p-2.5">District:</div>
          <div className="col-span-2 p-2.5">{representative?.district?.name}</div>
          <div className="fw-semibold p-2.5">City:</div>
          <div className="col-span-2 p-2.5">{representative?.city?.name}</div>
          <div className="fw-semibold p-2.5">Postal Code:</div>
          <div className="col-span-2 p-2.5">{representative?.postal_code}</div>
        </div>
        <hr />
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Permanent Address:</div>
          <div className="col-span-2 p-2.5">{representative?.street}</div>
        </div>
      </Card>
      <FormFooter>
        <Button href={`${id}/edit`}>Edit</Button>
      </FormFooter>
    </>
  )
}
