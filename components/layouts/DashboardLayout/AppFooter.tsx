"use client"
import { CFooter } from "@coreui/react"

const AppFooter = () => {
  return (
    <CFooter className="text-sm flex-col flex-md-row">
      <>
        <div className="mx-auto ms-md-0 text-center">&copy; Fingerprint Information Technology Limited</div>
        <div className="ms-md-auto mx-auto me-md-0">
          <span className="me-1">Powered by</span>
          <a target="_blank" rel="noopener noreferrer">
            Moneybag
          </a>
        </div>
      </>
    </CFooter>
  )
}

export default AppFooter
