import { Button, Card, FormFooter, SectionHeader } from "@/components/ui"
import { toNormalCase } from "@/utils"

export const BusinessDetails = ({ id, data }: any) => {
  const businessDetails = data?.business_detail || {}

  return (
    <>
      <SectionHeader title={businessDetails?.business_name} subtitle={businessDetails?.category?.name} />
      <Card>
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Business Name:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.business_name}</div>
          <div className="fw-semibold p-2.5">Business Short Name:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.business_short_name}</div>
          <div className="fw-semibold p-2.5">BIN No:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.bin_no}</div>
        </div>
        <hr />
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Address Line:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.street}</div>
          <div className="fw-semibold p-2.5">District:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.district?.name}</div>
          <div className="fw-semibold p-2.5">City:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.city?.name}</div>
          <div className="fw-semibold p-2.5">Postal Code:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.postal_code}</div>
        </div>
        <hr />
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Phone Number:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.business_phone}</div>
          <div className="fw-semibold p-2.5">Email:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.business_email}</div>
          <div className="fw-semibold p-2.5">Business Website:</div>
          <div className="col-span-2 p-2.5">{businessDetails?.business_website}</div>
        </div>
        <hr />
        <div className="d-grid grid-cols-3">
          <div className="fw-semibold p-2.5">Status:</div>
          <div className="col-span-2 p-2.5">{toNormalCase(businessDetails?.merchant_status)}</div>
        </div>
      </Card>
      <FormFooter>
        <Button href={`${id}/edit`}>Edit</Button>
      </FormFooter>
    </>
  )
}
