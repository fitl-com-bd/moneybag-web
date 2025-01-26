import { LayoutProps } from "@/types"
import { CCard, CCardBody } from "@coreui/react"
import { FC } from "react"

export const Card: FC<LayoutProps> = ({ children }) => (
  <CCard className="card-theme">
    <CCardBody>{children}</CCardBody>
  </CCard>
)
