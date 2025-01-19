"use client"
import { Nav } from "@/components/ui"
import { CCard, CCardBody, CNav, CNavItem, CNavLink } from "@coreui/react"
import { useState } from "react"

const MerchantDetails = () => {
  const [tab, setTab] = useState("business_structure")
  return (
    <div className="d-flex">
      <div className="">
        <h5 className="text-lg mb-6">Add New Merchant</h5>
        <Nav
          items={[
            { label: "Business Structure", value: "business_structure" },
            {
              label: "Business Details",
              value: "business_details",
            },
            {
              label: "Business Representative",
              value: "business_representative",
            },
            {
              label: "Settlement Bank",
              value: "settlement_bank",
            },
            {
              label: "Merchant Service",
              value: "merchant_service",
            },
          ]}
          value={tab}
          setValue={setTab}
        />
      </div>
      <div className="flex-1">
        <h5 className="text-lg mb-0">Define Your Business Structure</h5>
        <p className="text-muted">
          Provide details about the type and category of your business to help us understand your operations better.
        </p>

        {tab === "business_structure" && (
          <CCard className="bg-white shadow-sm mb-3">
            <CCardBody>
              <div className="d-grid grid-cols-3">
                <div className="fw-semibold p-2.5">Business Name:</div>
                <div className="col-span-2 p-2.5">Full business Name Here</div>
                <div className="fw-semibold p-2.5">Business Short Name:</div>
                <div className="col-span-2 p-2.5">Sort Name (Business)</div>
                <div className="fw-semibold p-2.5">BIN No:</div>
                <div className="col-span-2 p-2.5">1234</div>
              </div>
              <hr />
              <div className="d-grid grid-cols-3">
                <div className="fw-semibold p-2.5">Business Name:</div>
                <div className="col-span-2 p-2.5">Full business Name Here</div>
                <div className="fw-semibold p-2.5">Business Short Name:</div>
                <div className="col-span-2 p-2.5">Sort Name (Business)</div>
                <div className="fw-semibold p-2.5">BIN No:</div>
                <div className="col-span-2 p-2.5">1234</div>
              </div>
            </CCardBody>
          </CCard>
        )}

        {tab === "business_details" && <div>Business Details</div>}
        {tab === "business_representative" && <div>Business Representative</div>}
        {tab === "settlement_bank" && <div>Settlement Bank</div>}
        {tab === "merchant_service" && <div>Merchant Service</div>}
      </div>
    </div>
  )
}

export default MerchantDetails
