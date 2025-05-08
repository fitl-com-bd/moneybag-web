"use client"
import { CopyToClipboard } from "@/components/ui"
import config from "@/config"
import { useIntegrationDetailsQuery } from "@/store"
import { CNav, CNavItem, CNavLink, CTabContent, CTable, CTableBody, CTableRow, CTabPane } from "@coreui/react"
import { useState } from "react"

const IntegrationDetails = () => {
  const { data: integrationDetails, isFetching, isLoading } = useIntegrationDetailsQuery({})
  console.log(`🔥 | integrationDetails:`, integrationDetails)

  const [activeKey, setActiveKey] = useState(1)
  return (
    <div className="shadow-sm bg-white border-0 rounded overflow-hidden p-3">
      <CNav variant={"underline" as any} role="tablist" className="mb-3">
        <CNavItem role="presentation">
          <CNavLink
            active={activeKey === 1}
            component="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected={activeKey === 1}
            onClick={() => setActiveKey(1)}>
            Integration Details
          </CNavLink>
        </CNavItem>
        <CNavItem role="presentation">
          <CNavLink
            active={activeKey === 2}
            component="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected={activeKey === 2}
            onClick={() => setActiveKey(2)}>
            Bank Details
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
          <div className="d-grid grid-cols-3">
            <div className="fw-bold p-2.5 border-bottom">Merchant Id</div>
            <div className="col-span-2 p-2.5 border-bottom">
              <CopyToClipboard textToCopy={integrationDetails?.merchant_details?.mr_id} />
            </div>
            {/* <div className="fw-bold p-2.5 border-bottom">Merchant Auth Key</div>
            <div className="col-span-2 p-2.5 border-bottom">
              <CopyToClipboard
                textToCopy={
                  integrationDetails?.merchant_details?.merchant_Auth_key
                }
              />
            </div> */}
            <div className="fw-bold p-2.5 border-bottom">Manual Payment Link</div>
            <div className="col-span-2 p-2.5 border-bottom">
              <CopyToClipboard
                textToCopy={`${config.MANUAL_PAYMENT_LINK}${integrationDetails?.merchant_details?.mr_id}`}
              />
            </div>
          </div>
          <CTable>
            <CTableBody>
              <CTableRow></CTableRow>
              <CTableRow></CTableRow>
            </CTableBody>
          </CTable>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2}>
          <div className="d-grid grid-cols-3">
            <div className="fw-bold p-2.5 border-bottom">Bank Name</div>
            <div className="col-span-2 p-2.5 border-bottom">{integrationDetails?.banks_details?.bank_name}</div>
            <div className="fw-bold p-2.5 border-bottom">Branch Name</div>
            <div className="col-span-2 p-2.5 border-bottom">{integrationDetails?.banks_details?.branch_name}</div>
            <div className="fw-bold p-2.5 border-bottom">Transit/ Routing No</div>
            <div className="col-span-2 p-2.5 border-bottom">{integrationDetails?.banks_details?.routing_no}</div>
            <div className="fw-bold p-2.5 border-bottom">Swift Code</div>
            <div className="col-span-2 p-2.5 border-bottom">{integrationDetails?.banks_details?.swift_code}</div>
            <div className="fw-bold p-2.5 border-bottom">Account Name</div>
            <div className="col-span-2 p-2.5 border-bottom">{integrationDetails?.banks_details?.account_name}</div>
            <div className="fw-bold p-2.5 border-bottom">Account Number</div>
            <div className="col-span-2 p-2.5 border-bottom">{integrationDetails?.banks_details?.account_no}</div>
          </div>
        </CTabPane>
      </CTabContent>
    </div>
  )
}
export default IntegrationDetails
